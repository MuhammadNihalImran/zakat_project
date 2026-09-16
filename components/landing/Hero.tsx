import React from "react";
import { Button } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface HeroProps {
  t: TranslationDictionary["hero"];
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ t, onCalculateClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50 py-12 sm:py-20 lg:py-24 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs sm:text-sm font-medium border border-emerald-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>{t.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
          {t.heading}
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
          {t.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onCalculateClick}
            className="w-full sm:w-auto shadow-md"
          >
            {t.primaryCta}
          </Button>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              {t.secondaryCta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
