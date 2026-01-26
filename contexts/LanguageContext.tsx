"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "id" | "ms" | "zh";

type LanguageContextType = {
  lang: Language;
  switchLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Language>("ms"); // Default: Bahasa Malaysia

  useEffect(() => {
    const saved = localStorage.getItem("colore-language") as Language | null;
    if (saved && ["en", "id", "ms", "zh"].includes(saved)) {
      setLang(saved);
    } else {
      // Set default to Malaysia if no saved language
      setLang("ms");
      localStorage.setItem("colore-language", "ms");
    }
  }, []);

  const switchLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("colore-language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
