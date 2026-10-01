"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationDictionary, translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "zakat_companion_lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync initial language from document element or localStorage
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Language) : null;
    const docLang = typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
    const initialLang: Language = stored === "ur" || stored === "en" ? stored : docLang;
    setLangState(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    }
    if (typeof window !== "undefined" && mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Safe fallback if storage disabled
      }
    }
  }, [lang, mounted]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLanguage = () => {
    setLangState((prev) => (prev === "en" ? "ur" : "en"));
  };

  const t = translations[lang];
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Safe fallback if used outside of LanguageProvider
    const fallbackLang: Language =
      typeof document !== "undefined" && document.documentElement.lang === "ur" ? "ur" : "en";
    return {
      lang: fallbackLang,
      setLang: () => {},
      toggleLanguage: () => {},
      t: translations[fallbackLang],
      dir: fallbackLang === "ur" ? "rtl" : "ltr",
    };
  }
  return context;
};
