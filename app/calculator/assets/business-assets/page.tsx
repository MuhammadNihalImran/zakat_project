"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";
import { validateNumericString, getValidationErrorMessage, ValidationErrorKey } from "@/lib/validation";

export default function BusinessAssetsFormPage() {
  const router = useRouter();
  const { state, updateBusinessAssets } = useCalculator();
  const { lang, t: allT } = useLanguage();

  const t = allT.calculator.forms.businessAssets;
  const commonT = allT.calculator.forms;

  const [tradeStock, setTradeStock] = useState(state.businessAssets.tradeStock);
  const [cashReserves, setCashReserves] = useState(state.businessAssets.cashReserves);

  const [errorKeys, setErrorKeys] = useState<{ tradeStock?: ValidationErrorKey; cashReserves?: ValidationErrorKey }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(tradeStock);
    const check2 = validateNumericString(cashReserves);

    const newErrors: { tradeStock?: ValidationErrorKey; cashReserves?: ValidationErrorKey } = {};

    if (!check1.isValid && check1.errorKey) {
      newErrors.tradeStock = check1.errorKey;
    }
    if (!check2.isValid && check2.errorKey) {
      newErrors.cashReserves = check2.errorKey;
    }

    setErrorKeys(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    updateBusinessAssets({ tradeStock, cashReserves });
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
          <CardTitle className="text-lg">🏬 {t.title}</CardTitle>
          <CardDescription>
            {t.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label={t.tradeStockLabel}
              placeholder="e.g. 500000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={tradeStock}
              error={errorKeys.tradeStock ? getValidationErrorMessage(errorKeys.tradeStock, lang) : undefined}
              onChange={(e) => {
                setTradeStock(e.target.value);
                if (errorKeys.tradeStock) setErrorKeys((prev) => ({ ...prev, tradeStock: undefined }));
              }}
            />

            <Input
              label={t.cashReservesLabel}
              placeholder="e.g. 100000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={cashReserves}
              error={errorKeys.cashReserves ? getValidationErrorMessage(errorKeys.cashReserves, lang) : undefined}
              onChange={(e) => {
                setCashReserves(e.target.value);
                if (errorKeys.cashReserves) setErrorKeys((prev) => ({ ...prev, cashReserves: undefined }));
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
