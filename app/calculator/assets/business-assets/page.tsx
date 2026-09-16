"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { translations, Language } from "@/lib/i18n/translations";
import { validateNumericString, getValidationErrorMessage } from "@/lib/validation";

export default function BusinessAssetsFormPage() {
  const router = useRouter();
  const { state, updateBusinessAssets } = useCalculator();

  const lang: Language = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
  const t = translations[lang].calculator.forms.businessAssets;
  const commonT = translations[lang].calculator.forms;

  const [tradeStock, setTradeStock] = useState(state.businessAssets.tradeStock);
  const [cashReserves, setCashReserves] = useState(state.businessAssets.cashReserves);

  const [errors, setErrors] = useState<{ tradeStock?: string; cashReserves?: string }>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const check1 = validateNumericString(tradeStock);
    const check2 = validateNumericString(cashReserves);

    const newErrors: { tradeStock?: string; cashReserves?: string } = {};

    if (!check1.isValid) {
      newErrors.tradeStock = getValidationErrorMessage(check1.errorKey, lang);
    }
    if (!check2.isValid) {
      newErrors.cashReserves = getValidationErrorMessage(check2.errorKey, lang);
    }

    setErrors(newErrors);

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
          <CardTitle className="text-lg">🏬 Business Wealth & Stock</CardTitle>
          <CardDescription>
            Enter commercial trade inventory for sale and business liquid capital.
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
              error={errors.tradeStock}
              onChange={(e) => {
                setTradeStock(e.target.value);
                if (errors.tradeStock) setErrors((prev) => ({ ...prev, tradeStock: undefined }));
              }}
            />

            <Input
              label={t.cashReservesLabel}
              placeholder="e.g. 100000"
              prefixSymbol="PKR"
              type="number"
              min="0"
              value={cashReserves}
              error={errors.cashReserves}
              onChange={(e) => {
                setCashReserves(e.target.value);
                if (errors.cashReserves) setErrors((prev) => ({ ...prev, cashReserves: undefined }));
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
