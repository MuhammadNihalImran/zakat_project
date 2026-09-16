"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { Language, TranslationDictionary } from "@/lib/i18n/translations";

interface HeaderProps {
  t: TranslationDictionary["nav"];
  lang: Language;
  onLanguageToggle: () => void;
  onCalculateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  t,
  lang,
  onLanguageToggle,
  onCalculateClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
            ز
          </div>
          <span className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
            {t.title}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a
            href="#how-it-works"
            className="hover:text-emerald-600 transition-colors"
          >
            {t.howItWorks}
          </a>
          <a
            href="#faqs"
            className="hover:text-emerald-600 transition-colors"
          >
            {t.faqs}
          </a>
        </nav>

        {/* Actions: Language Switch & Primary CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-medium transition-colors focus-ring"
            aria-label={`Switch language to ${lang === "en" ? "Urdu" : "English"}`}
          >
            {t.langSwitch}
          </button>

          <Button variant="primary" size="md" onClick={onCalculateClick}>
            {t.calculateCta}
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 text-xs font-medium"
          >
            {t.langSwitch}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus-ring"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            {t.howItWorks}
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            {t.faqs}
          </a>
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onCalculateClick();
              }}
            >
              {t.calculateCta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
