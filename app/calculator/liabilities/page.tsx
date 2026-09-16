"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Alert } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function LiabilitiesPage() {
  const router = useRouter();
  const { state, updateLiabilities, getLiabilitiesTotal } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.liabilities;

  const [shortTermDebts, setShortTermDebts] = useState(
    state.liabilities.shortTermDebts
  );
  const [immediateExpenses, setImmediateExpenses] = useState(
    state.liabilities.immediateExpenses
  );
  const [errors, setErrors] = useState<{ shortTermDebts?: string; immediateExpenses?: string }>({});

  const liabilitiesTotal = getLiabilitiesTotal();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(shortTermDebts);
    const check2 = validateNumericString(immediateExpenses);

    const newErrors: { shortTermDebts?: string; immediateExpenses?: string } = {};

    if (!check1.isValid) {
      newErrors.shortTermDebts = getValidationErrorMessage(check1.errorKey, lang);
    }
    if (!check2.isValid) {
      newErrors.immediateExpenses = getValidationErrorMessage(check2.errorKey, lang);
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    updateLiabilities({ shortTermDebts, immediateExpenses });
    router.push("/calculator/review");
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        {/* Total Liabilities Summary Badge */}
        <div className="p-3 sm:px-5 rounded-xl bg-amber-50 border border-amber-200 text-right rtl:text-left shrink-0">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            {t.totalLiabilitiesLabel}
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-950">
            PKR {liabilitiesTotal.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Methodology Confirmation Notice */}
      <Alert variant="warning" title="Methodology Notice">
        {t.methodologyNotice}
      </Alert>

      {/* Form Card */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-lg">📉 Deductible Liabilities & Debts</CardTitle>
          <CardDescription>
            Enter eligible immediate debts due within the year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
            <Input
              label={t.shortTermDebtsLabel}
              placeholder="e.g. 100000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={shortTermDebts}
              error={errors.shortTermDebts}
              onChange={(e) => {
                const val = e.target.value;
                setShortTermDebts(val);
                updateLiabilities({ shortTermDebts: val });
                if (errors.shortTermDebts) setErrors((prev) => ({ ...prev, shortTermDebts: undefined }));
              }}
            />

            <Input
              label={t.immediateExpensesLabel}
              placeholder="e.g. 25000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={immediateExpenses}
              error={errors.immediateExpenses}
              onChange={(e) => {
                const val = e.target.value;
                setImmediateExpenses(val);
                updateLiabilities({ immediateExpenses: val });
                if (errors.immediateExpenses) setErrors((prev) => ({ ...prev, immediateExpenses: undefined }));
              }}
            />

            {/* Navigation Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200">
              <Link href="/calculator/assets" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  ← {t.backBtn}
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                {t.continueToReviewBtn} →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
