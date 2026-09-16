"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function CashSavingsFormPage() {
  const router = useRouter();
  const { state, updateCashSavings } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.forms.cashSavings;
  const commonT = translations[lang].calculator.forms;

  const [cashInHand, setCashInHand] = useState(state.cashSavings.cashInHand);
  const [bankSavings, setBankSavings] = useState(state.cashSavings.bankSavings);
  const [otherCash, setOtherCash] = useState(state.cashSavings.otherCash);

  const [errors, setErrors] = useState<{ cashInHand?: string; bankSavings?: string; otherCash?: string }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(cashInHand);
    const check2 = validateNumericString(bankSavings);
    const check3 = validateNumericString(otherCash);

    const newErrors: { cashInHand?: string; bankSavings?: string; otherCash?: string } = {};

    if (!check1.isValid) {
      newErrors.cashInHand = getValidationErrorMessage(check1.errorKey, lang);
    }
    if (!check2.isValid) {
      newErrors.bankSavings = getValidationErrorMessage(check2.errorKey, lang);
    }
    if (!check3.isValid) {
      newErrors.otherCash = getValidationErrorMessage(check3.errorKey, lang);
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    updateCashSavings({ cashInHand, bankSavings, otherCash });
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

      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-lg">💵 Cash & Savings</CardTitle>
          <CardDescription>
            Enter liquid balances owned for one lunar year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label={t.cashInHandLabel}
              placeholder="e.g. 50000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={cashInHand}
              error={errors.cashInHand}
              onChange={(e) => {
                setCashInHand(e.target.value);
                if (errors.cashInHand) setErrors((prev) => ({ ...prev, cashInHand: undefined }));
              }}
            />

            <Input
              label={t.bankSavingsLabel}
              placeholder="e.g. 250000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={bankSavings}
              error={errors.bankSavings}
              onChange={(e) => {
                setBankSavings(e.target.value);
                if (errors.bankSavings) setErrors((prev) => ({ ...prev, bankSavings: undefined }));
              }}
            />

            <Input
              label={t.otherCashLabel}
              placeholder="e.g. 10000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={otherCash}
              error={errors.otherCash}
              onChange={(e) => {
                setOtherCash(e.target.value);
                if (errors.otherCash) setErrors((prev) => ({ ...prev, otherCash: undefined }));
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
