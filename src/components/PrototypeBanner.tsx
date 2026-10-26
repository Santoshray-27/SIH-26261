import React from 'react';
import { useI18n } from '../i18n/useI18n';

export const PrototypeBanner: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      role="banner"
      className="bg-ink text-paper dark:bg-bone dark:text-ink px-4 py-1.5 text-xs font-mono flex items-center justify-between border-b border-hairline tracking-tight z-40 select-none"
    >
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-vermilion animate-pulse" />
        <span className="font-semibold">{t.common.prototypeBanner}</span>
      </div>
      <div className="hidden md:flex items-center gap-4 text-[11px] text-paper/80 dark:text-ink/80">
        <span>{t.common.designedNow}</span>
        <span className="border-l border-hairline pl-4">{t.common.phaseTag}</span>
      </div>
    </div>
  );
};
