import React from "react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FooterProps {
  t: TranslationDictionary["footer"];
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 text-center sm:text-left rtl:sm:text-right">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              ز
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              Zakat Companion
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {t.notice}
          </span>
        </div>

        <p className="text-slate-400 leading-relaxed max-w-3xl text-xs sm:text-xs">
          {t.disclaimer}
        </p>

        <div className="pt-4 border-t border-slate-900 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.rights}</span>
          <div className="flex gap-4">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#faqs" className="hover:text-white transition-colors">
              FAQs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
