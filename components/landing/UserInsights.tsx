import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface UserInsightsProps {
  t: TranslationDictionary["insights"];
}

export const UserInsights: React.FC<UserInsightsProps> = ({ t }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {t.cards.map((item, idx) => (
            <Card variant="bordered" key={idx} className="hover:border-emerald-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-sm leading-relaxed">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
