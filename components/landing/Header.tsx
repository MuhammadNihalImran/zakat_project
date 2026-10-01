"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 sm:gap-3.5 group rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 shrink-0 min-w-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-sm ring-1 ring-emerald-600/20 group-hover:from-emerald-700 group-hover:to-emerald-800 transition-all duration-200 shrink-0">
            ز
          </div>
          <span className="font-bold text-slate-900 text-base sm:text-lg lg:text-xl tracking-tight group-hover:text-emerald-950 transition-colors whitespace-nowrap truncate">
            {t.title}
          </span>
        </Link>

        {/* Desktop Navigation Links (>= 768px) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12 text-sm lg:text-base font-medium text-slate-600">
          <a
            href="#how-it-works"
            className="hover:text-emerald-600 transition-colors py-2 px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
          >
            {t.howItWorks}
          </a>
          <a
            href="#faqs"
            className="hover:text-emerald-600 transition-colors py-2 px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
          >
            {t.faqs}
          </a>
        </nav>

        {/* Desktop Actions: Language Switch & Primary CTA (>= 768px) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 min-h-[42px] cursor-pointer"
            aria-label={`Switch language to ${lang === "en" ? "Urdu" : "English"}`}
          >
            <svg
              className="w-4 h-4 text-slate-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span>{t.langSwitch}</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={onCalculateClick}
            className="font-semibold shadow-xs hover:shadow-md transition-all py-2.5 px-5 whitespace-nowrap"
          >
            {t.calculateCta}
          </Button>
        </div>

        {/* Mobile & Small Screen Actions (< 768px): Only Language Switch + Hamburger */}
        <div className="flex md:hidden items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 min-h-[40px] cursor-pointer"
            aria-label={`Switch language to ${lang === "en" ? "Urdu" : "English"}`}
          >
            {t.langSwitch}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
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

      {/* Mobile Drawer Navigation (< 768px) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/90 bg-white shadow-xl px-4 sm:px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-1">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-50 font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <span>{t.howItWorks}</span>
              <svg
                className="w-4 h-4 text-slate-400 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-50 font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <span>{t.faqs}</span>
              <svg
                className="w-4 h-4 text-slate-400 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onCalculateClick();
              }}
              className="py-3.5 text-base font-semibold shadow-sm"
            >
              {t.calculateCta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
