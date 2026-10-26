import React from 'react';
import { useI18n } from '../i18n/useI18n';
import { Globe } from 'lucide-react';

export const LangToggle: React.FC = () => {
  const { language, toggleLanguage } = useI18n();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-hairline hover:border-ink dark:hover:border-paper rounded-xs transition-colors"
      aria-label="Toggle language between English and Hindi"
      title="Switch Language / भाषा बदलें"
    >
      <Globe size={14} strokeWidth={1.25} />
      <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
    </button>
  );
};
