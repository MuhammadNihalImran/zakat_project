import React from "react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface HowItWorksProps {
  t: TranslationDictionary["howItWorks"];
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 relative flex flex-col justify-between space-y-4 hover:bg-emerald-50/40 hover:border-emerald-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-600 tracking-wider">
                  {step.step}
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-100/60 flex items-center justify-center text-emerald-700 font-bold text-xs">
                  {idx + 1}
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
