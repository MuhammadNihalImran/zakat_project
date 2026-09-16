"use client";

import React, { useState } from "react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FAQsProps {
  t: TranslationDictionary["faqs"];
}

export const FAQs: React.FC<FAQsProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        <div className="space-y-3">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:bg-slate-50 focus-ring"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="text-slate-400 font-bold text-lg shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
