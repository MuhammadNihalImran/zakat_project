import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface SolutionValueProps {
  t: TranslationDictionary["solution"];
}

export const SolutionValue: React.FC<SolutionValueProps> = ({ t }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {t.points.map((point, idx) => (
            <Card key={idx} variant="bordered" className="hover:border-emerald-400">
              <CardHeader>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-1">
                  ✓
                </div>
                <CardTitle className="text-base font-semibold">{point.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm pt-1 leading-relaxed">
                  {point.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
