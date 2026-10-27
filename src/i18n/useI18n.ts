import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export type Language = 'en' | 'hi';

export function useI18n(ns?: string) {
  const { t, i18n } = useTranslation(ns);

  const language = (i18n.language && i18n.language.startsWith('hi')) ? 'hi' : 'en';

  const setLanguage = useCallback((lng: Language) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('sakshya-i5:lang', lng);
      // Legacy compatibility key if needed
      localStorage.setItem('pramana_lang', lng);
    } catch (e) {}
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  }, [language, setLanguage]);

  return {
    t,
    i18n,
    language,
    setLanguage,
    toggleLanguage,
  };
}

export default useI18n;
