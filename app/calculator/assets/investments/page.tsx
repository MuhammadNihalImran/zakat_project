"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateNumericString, getValidationErrorMessage, ValidationErrorKey } from "@/lib/validation";

export default function InvestmentsFormPage() {
  const router = useRouter();
  const { state, updateInvestments } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.forms.investments;
  const commonT = allT.calculator.forms;

  const [stocks, setStocks] = useState(state.investments.stocks);
  const [mutualFunds, setMutualFunds] = useState(state.investments.mutualFunds);
  const [otherInvestments, setOtherInvestments] = useState(state.investments.otherInvestments);

  const [errorKeys, setErrorKeys] = useState<{ stocks?: ValidationErrorKey; mutualFunds?: ValidationErrorKey; otherInvestments?: ValidationErrorKey }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(stocks);
    const check2 = validateNumericString(mutualFunds);
    const check3 = validateNumericString(otherInvestments);

    const newErrors: { stocks?: ValidationErrorKey; mutualFunds?: ValidationErrorKey; otherInvestments?: ValidationErrorKey } = {};

    if (!check1.isValid && check1.errorKey) {
      newErrors.stocks = check1.errorKey;
    }
    if (!check2.isValid && check2.errorKey) {
      newErrors.mutualFunds = check2.errorKey;
    }
    if (!check3.isValid && check3.errorKey) {
      newErrors.otherInvestments = check3.errorKey;
    }

    setErrorKeys(newErrors);

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
          <CardTitle className="text-lg">📈 {t.title}</CardTitle>
          <CardDescription>
            {t.subtitle}
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
              error={errorKeys.stocks ? getValidationErrorMessage(errorKeys.stocks, lang) : undefined}
              onChange={(e) => {
                setStocks(e.target.value);
                if (errorKeys.stocks) setErrorKeys((prev) => ({ ...prev, stocks: undefined }));
              }}
            />

            <Input
              label={t.mutualFundsLabel}
              placeholder="e.g. 100000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={mutualFunds}
              error={errorKeys.mutualFunds ? getValidationErrorMessage(errorKeys.mutualFunds, lang) : undefined}
              onChange={(e) => {
                setMutualFunds(e.target.value);
                if (errorKeys.mutualFunds) setErrorKeys((prev) => ({ ...prev, mutualFunds: undefined }));
              }}
            />

            <Input
              label={t.otherInvestmentsLabel}
              placeholder="e.g. 50000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={otherInvestments}
              error={errorKeys.otherInvestments ? getValidationErrorMessage(errorKeys.otherInvestments, lang) : undefined}
              onChange={(e) => {
                setOtherInvestments(e.target.value);
                if (errorKeys.otherInvestments) setErrorKeys((prev) => ({ ...prev, otherInvestments: undefined }));
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
