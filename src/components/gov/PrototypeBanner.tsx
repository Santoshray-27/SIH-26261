import React from 'react';
import { useTranslation } from 'react-i18next';
import BRAND from '../../config/brand';

export const PrototypeBanner: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  return (
    <aside
      aria-label="Prototype Notice Banner"
      className="bg-tint-ochre text-text border-b border-border px-3 sm:px-6 py-1.5 text-xs font-mono flex flex-wrap items-center justify-between gap-2 z-50 select-none shrink-0"
    >
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
        <span className="font-semibold">
          {t('prototypeBanner', 'Prototype — synthetic data; external issuer response is simulated. · Proposed solution for AICTE · Not an official website.')}
        </span>
      </div>
      <div className="hidden md:flex items-center gap-3 text-[11px] text-text-muted">
        <span>{isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN}</span>
        <span className="border-l border-border pl-3">{BRAND.CONTEXT}</span>
      </div>
    </aside>
  );
};
