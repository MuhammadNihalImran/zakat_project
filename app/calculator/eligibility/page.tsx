"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Alert } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { MetalPricesResponse } from "@/lib/api/metals";

export default function EligibilityPage() {
  const router = useRouter();
  const { state, setNisabStandard } = useCalculator();
  const { lang, t: allT } = useLanguage();
  const t = allT.calculator.eligibility;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [metalPrices, setMetalPrices] = useState<MetalPricesResponse | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/metals");
      const json = await res.json();
      if (json.success && json.data) {
        setMetalPrices(json.data);
      } else {
        setError(json.error || t.priceApiError);
      }
    } catch {
      setError(t.priceApiError);
    } finally {
      setLoading(false);
    }
  }, [t.priceApiError]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const handleContinue = () => {
    router.push("/calculator/assets");
  };

  const formatPrice = (price: number, currency: string, unit: string) => {
    const formatted = price.toLocaleString(lang === "ur" ? "ur-PK" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${currency} ${formatted} / ${unit}`;
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Explanation Banner */}
      <Alert variant="info" title={lang === "ur" ? "نصاب کیا ہے؟" : "What is Nisab?"}>
        {t.nisabExplanation}
      </Alert>

      {/* Methodology Confirmation Warning */}
      <Alert variant="warning" title={lang === "ur" ? "طریقۂ کار سے متعلق نوٹس" : "Methodology Notice"}>
        {t.methodologyNotice}
      </Alert>

      {/* API Failure Alert */}
      {error && (
        <Alert variant="error" title={lang === "ur" ? "قیمتوں کا فیڈ نوٹس" : "Price Feed Notice"}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchPrices} className="w-fit">
              🔄 {t.retryBtn}
            </Button>
          </div>
        </Alert>
      )}

      {/* Nisab Cards Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gold Nisab */}
        <Card
          variant={state.nisabStandard === "gold" ? "bordered" : "default"}
          className={`cursor-pointer transition-all ${
            state.nisabStandard === "gold"
              ? "border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/20"
              : "hover:border-slate-300"
          }`}
          onClick={() => setNisabStandard("gold")}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-2xl">🥇</span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  state.nisabStandard === "gold"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                87.48g (7.5 Tola)
              </span>
            </div>
            <CardTitle className="text-base sm:text-lg pt-2">{t.goldCardTitle}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{t.goldCardDesc}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/60 text-xs font-medium text-amber-900">
              {loading ? (
                <div className="flex items-center gap-2 text-amber-700 animate-pulse">
                  <span>⏳</span> {t.fetchingPrices}
                </div>
              ) : metalPrices?.gold ? (
                <div className="space-y-0.5">
                  <div className="text-slate-500 text-[11px] font-normal">{t.goldPriceLabel}</div>
                  <div className="text-sm font-bold text-amber-900">
                    {formatPrice(metalPrices.gold.price, metalPrices.gold.currency, metalPrices.gold.unit)}
                  </div>
                </div>
              ) : (
                <div className="text-slate-500">📍 {t.priceApiError}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Silver Nisab */}
        <Card
          variant={state.nisabStandard === "silver" ? "bordered" : "default"}
          className={`cursor-pointer transition-all ${
            state.nisabStandard === "silver"
              ? "border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/20"
              : "hover:border-slate-300"
          }`}
          onClick={() => setNisabStandard("silver")}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-2xl">🥈</span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  state.nisabStandard === "silver"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                612.36g (52.5 Tola)
              </span>
            </div>
            <CardTitle className="text-base sm:text-lg pt-2">{t.silverCardTitle}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{t.silverCardDesc}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-xs font-medium text-slate-800">
              {loading ? (
                <div className="flex items-center gap-2 text-slate-600 animate-pulse">
                  <span>⏳</span> {t.fetchingPrices}
                </div>
              ) : metalPrices?.silver ? (
                <div className="space-y-0.5">
                  <div className="text-slate-500 text-[11px] font-normal">{t.silverPriceLabel}</div>
                  <div className="text-sm font-bold text-slate-900">
                    {formatPrice(metalPrices.silver.price, metalPrices.silver.currency, metalPrices.silver.unit)}
                  </div>
                </div>
              ) : (
                <div className="text-slate-500">📍 {t.priceApiError}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timestamp info if available */}
      {metalPrices?.timestamp && (
        <p className="text-center text-xs text-slate-500">
          ℹ️ {t.lastUpdated}: {new Date(metalPrices.timestamp).toLocaleString(lang === "ur" ? "ur-PK" : "en-US")}
        </p>
      )}

      {/* Bottom Navigation Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full">
            {t.backBtn}
          </Button>
        </Link>
        <Button variant="primary" size="md" onClick={handleContinue} className="w-full sm:w-auto">
          {t.continueBtn} →
        </Button>
      </div>
    </div>
  );
}
