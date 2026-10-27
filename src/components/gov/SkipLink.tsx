import React from 'react';
import { useTranslation } from 'react-i18next';

export const SkipLink: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-contrast focus:rounded-xs focus:font-sans focus:text-sm focus:shadow-lifted focus:outline-none focus:ring-2 focus:ring-focus-ring"
    >
      {t('skipToMain', 'Skip to main content')}
    </a>
  );
};
