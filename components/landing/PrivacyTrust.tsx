import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface PrivacyTrustProps {
  t: TranslationDictionary["privacy"];
}

export const PrivacyTrust: React.FC<PrivacyTrustProps> = ({ t }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {t.points.map((pt, idx) => (
            <Card key={idx} className="bg-slate-800/80 border-slate-700/80 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-400 border border-emerald-700/50 flex items-center justify-center font-bold text-sm">
                    🔒
                  </div>
                  <CardTitle className="text-base sm:text-lg text-white font-semibold">
                    {pt.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-xs sm:text-sm pt-1 leading-relaxed">
                  {pt.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
