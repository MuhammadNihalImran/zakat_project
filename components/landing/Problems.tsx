import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface ProblemsProps {
  t: TranslationDictionary["problems"];
}

export const Problems: React.FC<ProblemsProps> = ({ t }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.items.map((item, idx) => (
            <Card key={idx} className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="p-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg mb-2">
                  ?
                </div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed">
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
