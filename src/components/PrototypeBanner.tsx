import React from 'react';
import { useI18n } from '../i18n/useI18n';

export const PrototypeBanner: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      role="banner"
      className="bg-tint-ochre text-text border-b border-border px-4 py-1.5 text-xs font-mono flex items-center justify-between tracking-tight z-50 select-none shrink-0"
    >
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-st-deficiency animate-pulse" />
        <span className="font-semibold">{t.common.prototypeBanner}</span>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-[12px] text-text-muted">
        <span>{t.common.designedNow}</span>
        <span className="border-l border-border pl-4">{t.common.phaseTag}</span>
      </div>
    </div>
  );
};
