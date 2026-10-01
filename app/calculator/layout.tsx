"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalculatorProvider } from "@/context/CalculatorContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Determine current active step
  const getStepIndex = () => {
    if (pathname.includes("/eligibility")) return 0;
    if (pathname.includes("/assets")) return 1;
    if (pathname.includes("/liabilities")) return 2;
    if (pathname.includes("/review")) return 3;
    if (pathname.includes("/result")) return 4;
    return 0;
  };

  const currentStep = getStepIndex();

  const steps = [
    { name: t.calculator.steps.eligibility, path: "/calculator/eligibility" },
    { name: t.calculator.steps.assets, path: "/calculator/assets" },
    { name: t.calculator.steps.liabilities, path: "/calculator/liabilities" },
    { name: t.calculator.steps.review, path: "/calculator/review" },
    { name: t.calculator.steps.result, path: "/calculator/result" },
  ];

  return (
    <CalculatorProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Calculator Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-emerald-700 transition-colors">
                ز
              </div>
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                {t.nav.title}
              </span>
            </Link>

            {/* Language switch */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors focus-ring cursor-pointer"
            >
              {t.nav.langSwitch}
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="bg-slate-100/80 border-t border-slate-200/60 overflow-x-auto no-scrollbar">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between min-w-[340px] py-2">
              {steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                return (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-emerald-700 font-semibold"
                          : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {step.name}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className="text-slate-300 mx-1">/</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {children}
        </main>
      </div>
    </CalculatorProvider>
  );
}
