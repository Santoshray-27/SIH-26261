import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// Lazy-load bundled JSON namespaces locally without external network requests
i18n
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`);
    })
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: [
      'common',
      'landing',
      'nav',
      'officer',
      'evidence',
      'rules',
      'audit',
      'portals',
      'widget',
      'notices',
      'status',
      'legal',
      'faq',
    ],
    debug: false,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'sakshya-i5:lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Synchronize document direction, html lang, and font classes on language change
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    if (lng === 'hi') {
      document.documentElement.classList.add('font-hindi');
    } else {
      document.documentElement.classList.remove('font-hindi');
    }
  }
});

export default i18n;
