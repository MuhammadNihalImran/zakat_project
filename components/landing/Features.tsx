import React from "react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FeaturesProps {
  t: TranslationDictionary["features"];
}

export const Features: React.FC<FeaturesProps> = ({ t }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {t.items.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  {feat.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4 rtl:pl-0 rtl:pr-4">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
