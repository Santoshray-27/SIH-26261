import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Globe, Eye, Type } from 'lucide-react';
import { SkipLink } from './SkipLink';

export const UtilityBar: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const [textSize, setTextSize] = useState<number>(100);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedSize = localStorage.getItem('sakshya-i5:text-size');
      if (savedSize) {
        const parsed = parseInt(savedSize, 10);
        if ([87.5, 100, 112.5, 125].includes(parsed)) {
          setTextSize(parsed);
          document.documentElement.style.fontSize = `${parsed}%`;
        }
      }
      const savedContrast = localStorage.getItem('sakshya-i5:contrast');
      if (savedContrast === 'high') {
        setHighContrast(true);
        document.documentElement.setAttribute('data-contrast', 'high');
      }
    } catch (e) {}
  }, []);

  const changeTextSize = (pct: number) => {
    setTextSize(pct);
    document.documentElement.style.fontSize = `${pct}%`;
    try {
      localStorage.setItem('sakshya-i5:text-size', pct.toString());
    } catch (e) {}
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.setAttribute('data-contrast', 'high');
      try {
        localStorage.setItem('sakshya-i5:contrast', 'high');
      } catch (e) {}
    } else {
      document.documentElement.removeAttribute('data-contrast');
      try {
        localStorage.setItem('sakshya-i5:contrast', 'normal');
      } catch (e) {}
    }
  };

  const isHindi = Boolean(i18n.language && i18n.language.startsWith('hi'));

  const handleLanguageChange = (lng: 'en' | 'hi') => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('sakshya-i5:lang', lng);
      localStorage.setItem('pramana_lang', lng);
    } catch (e) {}
  };

  return (
    <nav aria-label="Utility Toolbar" className="bg-surface-2 border-b border-border py-1 px-3 sm:px-6 text-xs text-text-muted flex items-center justify-between transition-colors z-40 select-none">
      <SkipLink />

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Skip to Main Link visible inline for accessibility reviewers */}
        <a
          href="#main-content"
          className="hover:text-accent-2 hover:underline focus:outline-none focus:ring-1 focus:ring-accent-2 py-0.5 rounded-xs"
        >
          {t('skipToMain', 'Skip to main content')}
        </a>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Text Size Scale: A- A A+ */}
        <div className="flex items-center gap-1 border border-border bg-surface px-1.5 py-0.5 rounded-xs">
          <Type size={12} className="text-text-muted mr-0.5 hidden xs:inline" aria-hidden="true" />
          <button
            type="button"
            onClick={() => changeTextSize(87.5)}
            className={`px-1.5 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${textSize === 87.5 ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            title="Decrease font size (A-)"
            aria-label="Decrease text size to 87.5%"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => changeTextSize(100)}
            className={`px-1.5 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${textSize === 100 ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            title="Reset font size to default (A)"
            aria-label="Reset text size to 100%"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => changeTextSize(112.5)}
            className={`px-1.5 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${textSize === 112.5 ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            title="Increase font size (A+)"
            aria-label="Increase text size to 112.5%"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => changeTextSize(125)}
            className={`px-1.5 py-0.5 text-[11px] font-mono rounded-xs transition-colors ${textSize === 125 ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            title="Large font size (A++)"
            aria-label="Increase text size to 125%"
          >
            A++
          </button>
        </div>

        {/* High Contrast Toggle */}
        <button
          type="button"
          onClick={toggleHighContrast}
          className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono border rounded-xs transition-colors ${highContrast ? 'bg-accent-2 text-surface border-accent-2 font-bold' : 'bg-surface border-border text-text hover:bg-surface-2'}`}
          title="Toggle high contrast accessibility view"
          aria-pressed={highContrast}
        >
          <Eye size={12} aria-hidden="true" />
          <span className="hidden sm:inline">{t('contrast', 'Contrast')}</span>
        </button>

        {/* Accessibility Statement Link */}
        <Link
          to="/accessibility"
          className="hover:text-accent-2 hover:underline hidden md:inline text-[11px]"
        >
          {t('accessibility', 'Accessibility')}
        </Link>

        {/* Accessible Language Switcher: English | हिन्दी */}
        <div className="flex items-center gap-1 border border-border bg-surface px-1.5 py-0.5 rounded-xs" role="group" aria-label="Language selection">
          <Globe size={12} className="text-text-muted mr-0.5" aria-hidden="true" />
          <button
            type="button"
            lang="en"
            onClick={() => handleLanguageChange('en')}
            className={`px-1.5 py-0.5 text-[11px] rounded-xs font-sans transition-colors ${!isHindi ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            aria-pressed={!isHindi}
          >
            English
          </button>
          <span className="text-border" aria-hidden="true">|</span>
          <button
            type="button"
            lang="hi"
            onClick={() => handleLanguageChange('hi')}
            className={`px-1.5 py-0.5 text-[11px] rounded-xs font-sans transition-colors ${isHindi ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface-2 text-text'}`}
            aria-pressed={isHindi}
          >
            हिन्दी
          </button>
        </div>
      </div>
    </nav>
  );
};
