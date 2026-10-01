import React from "react";
import Link from "next/link";
import { Language, TranslationDictionary } from "@/lib/i18n/translations";

interface FooterProps {
  t: TranslationDictionary["footer"];
  navT?: TranslationDictionary["nav"];
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ t, navT, lang = "en" }) => {
  const isUrdu = lang === "ur";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 sm:pt-20 sm:pb-16 border-t border-slate-800/80 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-14 border-b border-slate-800/80 text-left rtl:text-right">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-base shadow-sm ring-1 ring-emerald-500/20 shrink-0 group-hover:from-emerald-400 group-hover:to-emerald-600 transition-all">
                ز
              </div>
              <span className="font-bold text-white text-lg sm:text-xl tracking-tight">
                {navT?.title || (isUrdu ? "زکوٰۃ کمپینین" : "Zakat Companion")}
              </span>
            </Link>

            <div>
              <span className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/60 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                {t.notice}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-2xl text-xs sm:text-sm font-normal">
              {t.disclaimer}
            </p>
          </div>

          {/* Quick Links & Information Columns */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                {isUrdu ? "نیویگیشن" : "Navigation"}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#how-it-works"
                    className="text-slate-400 hover:text-emerald-400 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    {navT?.howItWorks || "How It Works"}
                  </a>
                </li>
                <li>
                  <a
                    href="#faqs"
                    className="text-slate-400 hover:text-emerald-400 transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    {navT?.faqs || "FAQs"}
                  </a>
                </li>
                <li>
                  <Link
                    href="/calculator/eligibility"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors py-1 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    <span>{navT?.calculateCta || (isUrdu ? "زکوٰۃ کا حساب لگائیں" : "Calculate Zakat")}</span>
                    <span className="rtl:rotate-180 inline-block">&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Standards & Guidelines */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                {isUrdu ? "شرعی معیارات" : "Standards"}
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{isUrdu ? "نصاب سونا: 87.48 گرام" : "Gold Nisab: 87.48g"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{isUrdu ? "نصاب چاندی: 612.36 گرام" : "Silver Nisab: 612.36g"}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{isUrdu ? "شرح زکوٰۃ: 2.5% (قمری سال)" : "Rate: 2.5% (Lunar Year)"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left rtl:sm:text-right">
          <span>{t.rights}</span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <span>{isUrdu ? "اوپر جائیں" : "Back to top"}</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
