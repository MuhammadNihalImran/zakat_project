"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Alert } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateNumericString, getValidationErrorMessage, ValidationErrorKey } from "@/lib/validation";

export default function GoldFormPage() {
  const router = useRouter();
  const { state, updateGold } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.forms.gold;
  const commonT = allT.calculator.forms;

  const [weightGrams, setWeightGrams] = useState(state.gold.weightGrams);
  const [purityCarat, setPurityCarat] = useState(state.gold.purityCarat);
  const [estimatedValue, setEstimatedValue] = useState(state.gold.estimatedValue);

  const [errorKeys, setErrorKeys] = useState<{ weightGrams?: ValidationErrorKey; estimatedValue?: ValidationErrorKey }>({});

  const [goldPrice, setGoldPrice] = useState<{ price: number; currency: string; unit: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGoldPrice = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/metals");
      const json = await res.json();
      if (json.success && json.data?.gold) {
        setGoldPrice(json.data.gold);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoldPrice();
  }, [fetchGoldPrice]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(weightGrams);
    const check2 = validateNumericString(estimatedValue);

    const newErrors: { weightGrams?: ValidationErrorKey; estimatedValue?: ValidationErrorKey } = {};

    if (!check1.isValid && check1.errorKey) {
      newErrors.weightGrams = check1.errorKey;
    }
    if (!check2.isValid && check2.errorKey) {
      newErrors.estimatedValue = check2.errorKey;
    }

    setErrorKeys(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    let finalEstValue = estimatedValue;
    const numericWeight = parseFloat(weightGrams);
    if ((!finalEstValue || parseFloat(finalEstValue) === 0) && !isNaN(numericWeight) && numericWeight > 0 && goldPrice) {
      const caratVal = parseFloat(purityCarat) || 24;
      const purityRatio = caratVal > 0 ? caratVal / 24 : 1;
      finalEstValue = Math.round(numericWeight * purityRatio * goldPrice.price).toString();
    }

    updateGold({ weightGrams, purityCarat, estimatedValue: finalEstValue });
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

      <Alert variant="warning" title={lang === "ur" ? "طریقۂ کار سے متعلق نوٹس" : "Methodology Notice"}>
        {t.methodologyNotice}
      </Alert>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-lg">🥇 {t.title}</CardTitle>
          <CardDescription>
            {t.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium">
              {loading ? (
                <span className="animate-pulse">⏳ {lang === "ur" ? "مارکیٹ ریٹ حاصل کیا جا رہا ہے..." : "Fetching live market price..."}</span>
              ) : goldPrice ? (
                <span>
                  📊 {t.liveRateLabel || "Live Market Rate"}: <strong>{goldPrice.currency} {goldPrice.price.toLocaleString(lang === "ur" ? "ur-PK" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {goldPrice.unit}</strong>
                </span>
              ) : (
                <span>📍 {t.pricePlaceholder}</span>
              )}
            </div>

            <Input
              label={t.weightLabel}
              placeholder="e.g. 50"
              unit={lang === "ur" ? "گرام" : "grams"}
              type="number"
              min="0"
              step="any"
              value={weightGrams}
              error={errorKeys.weightGrams ? getValidationErrorMessage(errorKeys.weightGrams, lang) : undefined}
              onChange={(e) => {
                setWeightGrams(e.target.value);
                if (errorKeys.weightGrams) setErrorKeys((prev) => ({ ...prev, weightGrams: undefined }));
              }}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">{t.purityLabel}</label>
              <select
                value={purityCarat}
                onChange={(e) => setPurityCarat(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus-ring"
              >
                <option value="24">{lang === "ur" ? "24 قیراط (خالص سونا)" : "24 Carat (Pure Gold)"}</option>
                <option value="22">{lang === "ur" ? "22 قیراط (معیاری زیورات)" : "22 Carat (Standard Jewelry)"}</option>
                <option value="21">{lang === "ur" ? "21 قیراط" : "21 Carat"}</option>
                <option value="18">{lang === "ur" ? "18 قیراط" : "18 Carat"}</option>
              </select>
            </div>

            <Input
              label={t.estimatedValueLabel}
              placeholder="e.g. 1200000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={estimatedValue}
              error={errorKeys.estimatedValue ? getValidationErrorMessage(errorKeys.estimatedValue, lang) : undefined}
              onChange={(e) => {
                setEstimatedValue(e.target.value);
                if (errorKeys.estimatedValue) setErrorKeys((prev) => ({ ...prev, estimatedValue: undefined }));
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
