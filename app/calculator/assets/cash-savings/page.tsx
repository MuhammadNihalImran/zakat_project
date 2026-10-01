"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateNumericString, getValidationErrorMessage, ValidationErrorKey } from "@/lib/validation";

export default function CashSavingsFormPage() {
  const router = useRouter();
  const { state, updateCashSavings } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.forms.cashSavings;
  const commonT = allT.calculator.forms;

  const [cashInHand, setCashInHand] = useState(state.cashSavings.cashInHand);
  const [bankSavings, setBankSavings] = useState(state.cashSavings.bankSavings);
  const [otherCash, setOtherCash] = useState(state.cashSavings.otherCash);

  const [errorKeys, setErrorKeys] = useState<{ cashInHand?: ValidationErrorKey; bankSavings?: ValidationErrorKey; otherCash?: ValidationErrorKey }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(cashInHand);
    const check2 = validateNumericString(bankSavings);
    const check3 = validateNumericString(otherCash);

    const newErrors: { cashInHand?: ValidationErrorKey; bankSavings?: ValidationErrorKey; otherCash?: ValidationErrorKey } = {};

    if (!check1.isValid && check1.errorKey) {
      newErrors.cashInHand = check1.errorKey;
    }
    if (!check2.isValid && check2.errorKey) {
      newErrors.bankSavings = check2.errorKey;
    }
    if (!check3.isValid && check3.errorKey) {
      newErrors.otherCash = check3.errorKey;
    }

    setErrorKeys(newErrors);

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
          <CardTitle className="text-lg">💵 {t.title}</CardTitle>
          <CardDescription>
            {t.subtitle}
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
              error={errorKeys.cashInHand ? getValidationErrorMessage(errorKeys.cashInHand, lang) : undefined}
              onChange={(e) => {
                setCashInHand(e.target.value);
                if (errorKeys.cashInHand) setErrorKeys((prev) => ({ ...prev, cashInHand: undefined }));
              }}
            />

            <Input
              label={t.bankSavingsLabel}
              placeholder="e.g. 250000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={bankSavings}
              error={errorKeys.bankSavings ? getValidationErrorMessage(errorKeys.bankSavings, lang) : undefined}
              onChange={(e) => {
                setBankSavings(e.target.value);
                if (errorKeys.bankSavings) setErrorKeys((prev) => ({ ...prev, bankSavings: undefined }));
              }}
            />

            <Input
              label={t.otherCashLabel}
              placeholder="e.g. 10000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={otherCash}
              error={errorKeys.otherCash ? getValidationErrorMessage(errorKeys.otherCash, lang) : undefined}
              onChange={(e) => {
                setOtherCash(e.target.value);
                if (errorKeys.otherCash) setErrorKeys((prev) => ({ ...prev, otherCash: undefined }));
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
