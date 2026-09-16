"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function ReceivablesFormPage() {
  const router = useRouter();
  const { state, updateReceivables } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.forms.receivables;
  const commonT = translations[lang].calculator.forms;

  const [expectedRepayments, setExpectedRepayments] = useState(
    state.receivables.expectedRepayments
  );
  const [errors, setErrors] = useState<{ expectedRepayments?: string }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validateNumericString(expectedRepayments);
    if (!check.isValid) {
      setErrors({ expectedRepayments: getValidationErrorMessage(check.errorKey, lang) });
      return;
    }

    setErrors({});
    updateReceivables({ expectedRepayments });
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
          <CardTitle className="text-lg">📜 Receivables & Money Owed</CardTitle>
          <CardDescription>
            Enter good debts or loans you expect to be repaid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label={t.expectedRepaymentsLabel}
              placeholder="e.g. 75000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={expectedRepayments}
              error={errors.expectedRepayments}
              onChange={(e) => {
                setExpectedRepayments(e.target.value);
                if (errors.expectedRepayments) setErrors({});
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
