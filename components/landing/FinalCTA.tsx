import React from "react";
import { Button } from "@/components/ui";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FinalCTAProps {
  t: TranslationDictionary["finalCta"];
  onCalculateClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ t, onCalculateClick }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-emerald-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          {t.heading}
        </h2>
        <p className="max-w-2xl mx-auto text-emerald-100 text-base sm:text-lg leading-relaxed font-normal">
          {t.subheading}
        </p>
        <div className="pt-2 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={onCalculateClick}
            className="bg-white text-emerald-950 hover:bg-emerald-50 active:bg-emerald-100 font-bold px-8 shadow-lg border-0"
          >
            {t.ctaButton}
          </Button>
        </div>
      </div>
    </section>
  );
};
