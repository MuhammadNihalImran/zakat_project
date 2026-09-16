"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Alert } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function SilverFormPage() {
  const router = useRouter();
  const { state, updateSilver } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.forms.silver;
  const commonT = translations[lang].calculator.forms;

  const [weightGrams, setWeightGrams] = useState(state.silver.weightGrams);
  const [purityCarat, setPurityCarat] = useState(state.silver.purityCarat);
  const [estimatedValue, setEstimatedValue] = useState(state.silver.estimatedValue);

  const [errors, setErrors] = useState<{ weightGrams?: string; estimatedValue?: string }>({});

  const [silverPrice, setSilverPrice] = useState<{ price: number; currency: string; unit: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSilverPrice = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/metals");
      const json = await res.json();
      if (json.success && json.data?.silver) {
        setSilverPrice(json.data.silver);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSilverPrice();
  }, [fetchSilverPrice]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(weightGrams);
    const check2 = validateNumericString(estimatedValue);

    const newErrors: { weightGrams?: string; estimatedValue?: string } = {};

    if (!check1.isValid) {
      newErrors.weightGrams = getValidationErrorMessage(check1.errorKey, lang);
    }
    if (!check2.isValid) {
      newErrors.estimatedValue = getValidationErrorMessage(check2.errorKey, lang);
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    updateSilver({ weightGrams, purityCarat, estimatedValue });
    router.push("/calculator/assets");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
      </div>

      <Alert variant="warning" title="Methodology Notice">
        {t.methodologyNotice}
      </Alert>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-lg">🥈 Silver Holdings</CardTitle>
          <CardDescription>
            Enter total silver weight and estimated value.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium">
              {loading ? (
                <span className="animate-pulse">⏳ Fetching live market price...</span>
              ) : silverPrice ? (
                <span>
                  📊 {t.liveRateLabel || "Live Market Rate"}: <strong>{silverPrice.currency} {silverPrice.price.toLocaleString(lang === "ur" ? "ur-PK" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {silverPrice.unit}</strong>
                </span>
              ) : (
                <span>📍 {t.pricePlaceholder}</span>
              )}
            </div>

            <Input
              label={t.weightLabel}
              placeholder="e.g. 650"
              unit="grams"
              type="number"
              min="0"
              step="any"
              value={weightGrams}
              error={errors.weightGrams}
              onChange={(e) => {
                setWeightGrams(e.target.value);
                if (errors.weightGrams) setErrors((prev) => ({ ...prev, weightGrams: undefined }));
              }}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">{t.purityLabel}</label>
              <select
                value={purityCarat}
                onChange={(e) => setPurityCarat(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus-ring"
              >
                <option value="24">99.9% Pure Silver</option>
                <option value="22">Sterling Silver (92.5%)</option>
                <option value="18">Commercial Silver</option>
              </select>
            </div>

            <Input
              label={t.estimatedValueLabel}
              placeholder="e.g. 180000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={estimatedValue}
              error={errors.estimatedValue}
              onChange={(e) => {
                setEstimatedValue(e.target.value);
                if (errors.estimatedValue) setErrors((prev) => ({ ...prev, estimatedValue: undefined }));
              }}
            />

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <Link href="/calculator/assets" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  ← {commonT.backToAssets}
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                {commonT.saveAndReturn} →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
