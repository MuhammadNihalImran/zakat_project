"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function InvestmentsFormPage() {
  const router = useRouter();
  const { state, updateInvestments } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.forms.investments;
  const commonT = translations[lang].calculator.forms;

  const [stocks, setStocks] = useState(state.investments.stocks);
  const [mutualFunds, setMutualFunds] = useState(state.investments.mutualFunds);
  const [otherInvestments, setOtherInvestments] = useState(state.investments.otherInvestments);

  const [errors, setErrors] = useState<{ stocks?: string; mutualFunds?: string; otherInvestments?: string }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(stocks);
    const check2 = validateNumericString(mutualFunds);
    const check3 = validateNumericString(otherInvestments);

    const newErrors: { stocks?: string; mutualFunds?: string; otherInvestments?: string } = {};

    if (!check1.isValid) {
      newErrors.stocks = getValidationErrorMessage(check1.errorKey, lang);
    }
    if (!check2.isValid) {
      newErrors.mutualFunds = getValidationErrorMessage(check2.errorKey, lang);
    }
    if (!check3.isValid) {
      newErrors.otherInvestments = getValidationErrorMessage(check3.errorKey, lang);
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    updateInvestments({ stocks, mutualFunds, otherInvestments });
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
          <CardTitle className="text-lg">📈 Investment Assets</CardTitle>
          <CardDescription>
            Enter marketable stocks, shares, mutual funds, and dividend wealth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label={t.stocksLabel}
              placeholder="e.g. 150000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={stocks}
              error={errors.stocks}
              onChange={(e) => {
                setStocks(e.target.value);
                if (errors.stocks) setErrors((prev) => ({ ...prev, stocks: undefined }));
              }}
            />

            <Input
              label={t.mutualFundsLabel}
              placeholder="e.g. 100000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={mutualFunds}
              error={errors.mutualFunds}
              onChange={(e) => {
                setMutualFunds(e.target.value);
                if (errors.mutualFunds) setErrors((prev) => ({ ...prev, mutualFunds: undefined }));
              }}
            />

            <Input
              label={t.otherInvestmentsLabel}
              placeholder="e.g. 50000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={otherInvestments}
              error={errors.otherInvestments}
              onChange={(e) => {
                setOtherInvestments(e.target.value);
                if (errors.otherInvestments) setErrors((prev) => ({ ...prev, otherInvestments: undefined }));
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
