"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { useCalculator } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";

export default function AssetsPage() {
  const router = useRouter();
  const {
    getCashSavingsTotal,
    getGoldTotal,
    getSilverTotal,
    getInvestmentsTotal,
    getBusinessAssetsTotal,
    getReceivablesTotal,
    getTotalAssets,
  } = useCalculator();

  const { lang, t: allT } = useLanguage();
  const t = allT.calculator.assets;

  const totalAssets = getTotalAssets();

  const categories = [
    {
      id: "cash-savings",
      icon: "💵",
      name: t.categories.cashSavings.name,
      desc: t.categories.cashSavings.desc,
      value: getCashSavingsTotal(),
      path: "/calculator/assets/cash-savings",
    },
    {
      id: "gold",
      icon: "🥇",
      name: t.categories.gold.name,
      desc: t.categories.gold.desc,
      value: getGoldTotal(),
      path: "/calculator/assets/gold",
    },
    {
      id: "silver",
      icon: "🥈",
      name: t.categories.silver.name,
      desc: t.categories.silver.desc,
      value: getSilverTotal(),
      path: "/calculator/assets/silver",
    },
    {
      id: "investments",
      icon: "📈",
      name: t.categories.investments.name,
      desc: t.categories.investments.desc,
      value: getInvestmentsTotal(),
      path: "/calculator/assets/investments",
    },
    {
      id: "business-assets",
      icon: "🏬",
      name: t.categories.businessAssets.name,
      desc: t.categories.businessAssets.desc,
      value: getBusinessAssetsTotal(),
      path: "/calculator/assets/business-assets",
    },
    {
      id: "receivables",
      icon: "📜",
      name: t.categories.receivables.name,
      desc: t.categories.receivables.desc,
      value: getReceivablesTotal(),
      path: "/calculator/assets/receivables",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Total Assets Summary Badge */}
        <div className="p-3 sm:px-5 rounded-xl bg-emerald-50 border border-emerald-200 text-right rtl:text-left shrink-0">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            {t.totalAssetsLabel}
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-950">
            PKR {totalAssets.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Asset Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.path}>
            <Card className="h-full hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group">
              <CardHeader className="p-5 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                      {cat.icon}
                    </span>
                    {cat.value > 0 ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        PKR {cat.value.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        0 PKR
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 pt-1 leading-relaxed">
                      {cat.desc}
                    </CardDescription>
                  </div>
                </div>

                <div className="pt-3 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center justify-end gap-1">
                  <span>{lang === "ur" ? "تفصیلات درج کریں" : "Enter Details"}</span>
                  <span>→</span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200">
        <Link href="/calculator/eligibility" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full">
            ← {lang === "ur" ? "اہلیت کے صفحہ پر واپس" : "Back to Eligibility"}
          </Button>
        </Link>
        <Button
          variant="primary"
          size="md"
          onClick={() => router.push("/calculator/liabilities")}
          className="w-full sm:w-auto"
        >
          {t.continueToLiabilitiesBtn} →
        </Button>
      </div>
    </div>
  );
}
