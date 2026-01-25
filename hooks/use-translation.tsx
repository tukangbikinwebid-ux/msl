"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type Translations<T> = {
  en: T;
  id: T;
  ms?: T;
  zh?: T;
};

export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>
) {
  const { lang } = useLanguage();
  // Fallback to id if language not available
  if (lang === "ms" && translations.ms) return translations.ms;
  if (lang === "zh" && translations.zh) return translations.zh;
  return translations[lang] || translations.id;
}
