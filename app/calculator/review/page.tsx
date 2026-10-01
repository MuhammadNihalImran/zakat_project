"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Alert } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateCalculatorState } from "@/lib/validation";

export default function ReviewPage() {
  const router = useRouter();
  const {
    state,
    getCashSavingsTotal,
    getGoldTotal,
    getSilverTotal,
    getInvestmentsTotal,
    getBusinessAssetsTotal,
    getReceivablesTotal,
    getTotalAssets,
    getLiabilitiesTotal,
  } = useCalculator();

  const { lang, t: allT } = useLanguage();
  const t = allT.calculator.review;
  const assetsT = allT.calculator.assets;
  const valT = allT.validation;

  const [validationError, setValidationError] = useState<string | null>(null);

  const totalAssets = getTotalAssets();
  const totalLiabilities = getLiabilitiesTotal();
  const netZakatableEst = Math.max(0, totalAssets - totalLiabilities);

  const assetCategories = [
    {
      name: assetsT.categories.cashSavings.name,
      value: getCashSavingsTotal(),
      path: "/calculator/assets/cash-savings",
    },
    {
      name: assetsT.categories.gold.name,
      value: getGoldTotal(),
      path: "/calculator/assets/gold",
    },
    {
      name: assetsT.categories.silver.name,
      value: getSilverTotal(),
      path: "/calculator/assets/silver",
    },
    {
      name: assetsT.categories.investments.name,
      value: getInvestmentsTotal(),
      path: "/calculator/assets/investments",
    },
    {
      name: assetsT.categories.businessAssets.name,
      value: getBusinessAssetsTotal(),
      path: "/calculator/assets/business-assets",
    },
    {
      name: assetsT.categories.receivables.name,
      value: getReceivablesTotal(),
      path: "/calculator/assets/receivables",
    },
  ];

  const handleCalculateZakat = () => {
    const valResult = validateCalculatorState(state);
    if (!valResult.isValid) {
      setValidationError(valT.reviewStateCorrupted);
      return;
    }

    setValidationError(null);
    router.push("/calculator/result");
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <Alert variant="error" title={lang === "ur" ? "توثیق کی غلطی" : "Validation Alert"}>
          {validationError}
        </Alert>
      )}

      {/* Methodology Disclaimer Alert */}
      <Alert variant="info" title={lang === "ur" ? "طریقۂ کار سے متعلق نوٹس" : "Methodology Notice"}>
        {t.placeholderNotice}
      </Alert>

      {/* Summary Card */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-lg">📋 {t.title}</CardTitle>
          <CardDescription>
            {lang === "ur" ? "منتخب کردہ نصاب کا معیار: " : "Selected Nisab Standard: "}
            <span className="font-semibold text-slate-900 capitalize">
              {state.nisabStandard === "silver"
                ? lang === "ur"
                  ? "چاندی کا نصاب (612.36g)"
                  : "Silver Nisab (612.36g)"
                : lang === "ur"
                ? "سونے کا نصاب (87.48g)"
                : "Gold Nisab (87.48g)"}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Assets Breakdown Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-semibold text-slate-900 text-sm border-b border-slate-200 pb-2">
              <span>{lang === "ur" ? "اثاثوں کی قسم" : "Asset Category"}</span>
              <span>{lang === "ur" ? "مالیت (PKR)" : "Value (PKR)"}</span>
            </div>

            {assetCategories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm py-1 border-b border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-medium">{cat.name}</span>
                  <Link
                    href={cat.path}
                    className="text-xs text-emerald-600 hover:text-emerald-700 underline font-medium"
                  >
                    {t.editBtn}
                  </Link>
                </div>
                <span className="font-mono font-medium text-slate-900">
                  {cat.value.toLocaleString()}
                </span>
              </div>
            ))}

            {/* Total Assets Row */}
            <div className="flex items-center justify-between text-base font-bold text-slate-900 pt-2 bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
              <span>{t.totalAssetsLabel}</span>
              <span className="font-mono text-emerald-950">
                PKR {totalAssets.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between font-semibold text-slate-900 text-sm border-b border-slate-200 pb-2">
              <span>{allT.calculator.liabilities.totalLiabilitiesLabel}</span>
              <Link
                href="/calculator/liabilities"
                className="text-xs text-emerald-600 hover:text-emerald-700 underline font-medium"
              >
                {t.editBtn}
              </Link>
            </div>

            <div className="flex items-center justify-between text-base font-bold text-amber-900 bg-amber-50/60 p-3 rounded-lg border border-amber-100">
              <span>{t.totalLiabilitiesLabel}</span>
              <span className="font-mono text-amber-950">
                - PKR {totalLiabilities.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Estimated Net Zakatable Amount */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-200">
              {t.netZakatableLabel}
            </span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              PKR {netZakatableEst.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <Link href="/calculator/liabilities" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full">
            ← {t.backBtn}
          </Button>
        </Link>
        <Button
          variant="primary"
          size="lg"
          onClick={handleCalculateZakat}
          className="w-full sm:w-auto shadow-md"
        >
          {t.calculateZakatBtn} →
        </Button>
      </div>
    </div>
  );
}
