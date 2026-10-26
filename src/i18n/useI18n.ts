import { create } from 'zustand';
import { en, hi } from './translations';

export type Language = 'en' | 'hi';

interface I18nStore {
  language: Language;
  t: typeof en;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem('pramana_lang');
  if (saved === 'en' || saved === 'hi') return saved;
  return 'en';
};

export const useI18n = create<I18nStore>((set, get) => ({
  language: getInitialLanguage(),
  t: getInitialLanguage() === 'hi' ? hi : en,
  setLanguage: (language: Language) => {
    localStorage.setItem('pramana_lang', language);
    set({ language, t: language === 'hi' ? hi : en });
  },
  toggleLanguage: () => {
    const next = get().language === 'en' ? 'hi' : 'en';
    localStorage.setItem('pramana_lang', next);
    set({ language: next, t: next === 'hi' ? hi : en });
  },
}));
