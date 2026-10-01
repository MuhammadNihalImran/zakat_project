"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateNumericString, getValidationErrorMessage, ValidationErrorKey } from "@/lib/validation";

export default function ReceivablesFormPage() {
  const router = useRouter();
  const { state, updateReceivables } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.forms.receivables;
  const commonT = allT.calculator.forms;

  const [expectedRepayments, setExpectedRepayments] = useState(
    state.receivables.expectedRepayments
  );
  const [errorKey, setErrorKey] = useState<ValidationErrorKey | undefined>(undefined);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validateNumericString(expectedRepayments);
    if (!check.isValid && check.errorKey) {
      setErrorKey(check.errorKey);
      return;
    }

    setErrorKey(undefined);
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
          <CardTitle className="text-lg">📜 {t.title}</CardTitle>
          <CardDescription>
            {t.subtitle}
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
              error={errorKey ? getValidationErrorMessage(errorKey, lang) : undefined}
              onChange={(e) => {
                setExpectedRepayments(e.target.value);
                if (errorKey) setErrorKey(undefined);
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
