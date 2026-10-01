"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Header,
  Hero,
  UserInsights,
  Problems,
  SolutionValue,
  Features,
  HowItWorks,
  PrivacyTrust,
  FAQs,
  FinalCTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  const router = useRouter();
  const { lang, toggleLanguage, t } = useLanguage();

  const handleCalculateClick = () => {
    router.push("/calculator/eligibility");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Header */}
      <Header
        t={t.nav}
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onCalculateClick={handleCalculateClick}
      />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero t={t.hero} onCalculateClick={handleCalculateClick} />

        {/* 3. Trust / User Insights */}
        <UserInsights t={t.insights} />

        {/* 4. Problems */}
        <Problems t={t.problems} />

        {/* 5. Solution / Value */}
        <SolutionValue t={t.solution} />

        {/* 6. Features */}
        <Features t={t.features} />

        {/* 7. How It Works */}
        <HowItWorks t={t.howItWorks} />

        {/* 8. Privacy / Trust */}
        <PrivacyTrust t={t.privacy} />

        {/* 9. FAQs */}
        <FAQs t={t.faqs} />

        {/* 10. Final CTA */}
        <FinalCTA t={t.finalCta} onCalculateClick={handleCalculateClick} />
      </main>

      {/* 11. Footer */}
      <Footer t={t.footer} navT={t.nav} lang={lang} />
    </div>
  );
}
