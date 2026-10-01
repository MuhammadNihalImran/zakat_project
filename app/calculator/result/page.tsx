"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Alert,
} from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { calculateZakat, DEFAULT_ZAKAT_METHODOLOGY } from "@/lib/zakat";

export default function ResultPage() {
  const router = useRouter();
  const { state, resetCalculator } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.result;
  const assetsT = allT.calculator.assets;
  const reviewT = allT.calculator.review;

  const [metalPrices, setMetalPrices] = useState<{
    goldPricePerGram: number;
    silverPricePerGram: number;
    currency: string;
  } | undefined>(undefined);

  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPrices() {
      try {
        const res = await fetch("/api/metals");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setMetalPrices({
            goldPricePerGram: json.data.gold.price,
            silverPricePerGram: json.data.silver.price,
            currency: json.data.gold.currency || "PKR",
          });
        }
      } catch {
        // Safe fallback if price API fails or offline
      }
    }
    loadPrices();
    return () => {
      isMounted = false;
    };
  }, []);

  const result = calculateZakat(state, DEFAULT_ZAKAT_METHODOLOGY, metalPrices);

  const handleStartNew = () => {
    resetCalculator();
    router.push("/calculator/eligibility");
  };

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    setPdfError(null);

    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calculationResult: result,
          lang,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(
          json?.error || (lang === "ur" ? "پی ڈی ایف رپورٹ بنانے میں ناکامی ہوئی۔" : "Failed to generate PDF summary report.")
        );
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zakat-summary-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : (lang === "ur" ? "پی ڈی ایف رپورٹ ڈاؤن لوڈ کرنے میں خرابی پیش آئی۔" : "Failed to download PDF summary report.");
      setPdfError(msg);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          {result.methodologyStatus === "DEVELOPMENT_DEFAULTS_PENDING_REVIEW"
            ? (lang === "ur" ? "ترقیاتی طریقۂ کار کے مطابق تخمینہ" : "Development Methodology Assessment")
            : t.statusBadge}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
      </div>

      {/* Mandatory Disclaimer Alert */}
      <Alert variant="warning" title={lang === "ur" ? "طریقۂ کار سے متعلق نوٹس" : "Methodology Notice"}>
        {result.disclaimer}
      </Alert>

      {/* PDF Download Error Alert */}
      {pdfError && (
        <Alert variant="error" title={lang === "ur" ? "پی ڈی ایف رپورٹ کی خرابی" : "PDF Generation Error"}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>{pdfError}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPdf}
              className="w-fit"
            >
              🔄 {lang === "ur" ? "دوبارہ ڈاؤن لوڈ کریں" : "Retry Download"}
            </Button>
          </div>
        </Alert>
      )}

      {/* Main Result Display Card */}
      <Card
        variant="bordered"
        className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl"
      >
        <CardHeader className="text-center sm:text-left rtl:sm:text-right border-b border-slate-800 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <CardTitle className="text-slate-300 text-sm font-semibold uppercase tracking-wider">
              {lang === "ur" ? "قابلِ ادا زکوٰۃ" : "Zakat Payable"}
            </CardTitle>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                result.isEligible
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {result.isEligible
                ? (lang === "ur" ? "صاحبِ نصاب / زکوٰۃ واجب ہے" : "Eligible for Zakat")
                : (lang === "ur" ? "نصاب کی حد سے کم" : "Below Nisab Threshold")}
            </span>
          </div>

          <div className="text-4xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight pt-3">
            PKR {result.zakatPayable.toLocaleString()}
          </div>

          <CardDescription className="text-slate-400 text-xs pt-2">
            {lang === "ur" ? "استعمال شدہ نصاب کا معیار: " : "Nisab Standard Used: "}
            <span className="capitalize text-slate-200 font-semibold">
              {result.nisabStandardUsed === "silver"
                ? (lang === "ur" ? "چاندی کا نصاب" : "Silver Nisab")
                : (lang === "ur" ? "سونے کا نصاب" : "Gold Nisab")}{" "}
              ({result.nisabThresholdGrams}g)
            </span>{" "}
            {result.nisabValue > 0 && (
              <span>— {lang === "ur" ? "حدِ نصاب:" : "Threshold:"} PKR {result.nisabValue.toLocaleString()}</span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            {t.breakdownTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between">
              <span className="text-slate-400">{reviewT.totalAssetsLabel}</span>
              <span className="font-mono font-bold text-white">
                PKR {result.totalAssets.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between">
              <span className="text-slate-400">{reviewT.totalLiabilitiesLabel}</span>
              <span className="font-mono font-bold text-amber-400">
                - PKR {result.allowedLiabilities.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between">
              <span className="text-slate-400">{reviewT.netZakatableLabel}</span>
              <span className="font-mono font-bold text-emerald-400">
                PKR {result.netZakatableWealth.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between">
              <span className="text-slate-400">{lang === "ur" ? "شرحِ زکوٰۃ" : "Zakat Rate Applied"}</span>
              <span className="font-mono font-bold text-white">
                {result.zakatRatePercentage}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Itemized Asset Category Breakdown Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{lang === "ur" ? "درج کردہ اثاثوں کی تفصیل" : "Entered Asset Breakdown"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600">{assetsT.categories.cashSavings.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.cashSavings.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600">{assetsT.categories.gold.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.gold.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600">{assetsT.categories.silver.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.silver.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600">{assetsT.categories.investments.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.investments.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600">{assetsT.categories.businessAssets.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.businessAssets.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600">{assetsT.categories.receivables.name}</span>
            <span className="font-mono font-semibold">
              PKR {result.categoryBreakdown.receivables.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Methodology Scope & Valuation Notes */}
      <Card variant="default" className="bg-slate-50 border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            {lang === "ur" ? "طریقۂ کار اور اہم نکات" : "Methodology & Scope Metadata"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-xs text-slate-600">
          {result.limitations.map((note, index) => (
            <div key={index} className="flex items-start gap-1.5">
              <span className="text-slate-400">•</span>
              <span>{note}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Result Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          size="md"
          onClick={handleDownloadPdf}
          disabled={pdfLoading}
          className="w-full sm:w-auto font-semibold"
        >
          {pdfLoading
            ? (lang === "ur" ? "⏳ رپورٹ تیار کی جا رہی ہے..." : "⏳ Generating PDF...")
            : (lang === "ur" ? "📄 پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں" : "📄 Download PDF Summary")}
        </Button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="ghost" size="md" className="w-full">
              {lang === "ur" ? "ہوم پیج پر واپس" : "Back to Home"}
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            onClick={handleStartNew}
            className="w-full sm:w-auto"
          >
            🔄 {t.startNewBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
