import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, Shield } from 'lucide-react';
import BRAND from '../../config/brand';

interface SiteHeaderProps {
  onOpenDemo?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onOpenDemo }) => {
  const { t, i18n } = useTranslation('common');
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  return (
    <header className="bg-bg-elevated border-b border-border py-3 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors z-30">
      {/* Brand Identity (Logo + Brand + Tagline + Proposed Solution Label) */}
      <div className="flex items-center gap-3.5">
        <Link
          to="/"
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-xs p-0.5"
          aria-label={`${BRAND.NAME_EN} Home`}
        >
          {/* Neutral Logo Box: 'सा' */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 border border-border-strong flex items-center justify-center font-serif font-bold text-xl bg-accent-2 text-surface rounded-xs shadow-subtle group-hover:bg-accent transition-colors shrink-0 select-none">
            {BRAND.GLYPH}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-[0.01em] text-text leading-tight">
                {isHindi ? BRAND.NAME_HI : BRAND.NAME_EN}
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-sans font-semibold bg-tint-teal text-accent-2 border border-accent-2/30 rounded-xs">
                {isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN}
              </span>
            </div>
            <p className="text-xs text-text-muted font-sans mt-0.5 leading-snug">
              {isHindi ? BRAND.TAGLINE_HI : BRAND.TAGLINE_EN}
            </p>
          </div>
        </Link>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end md:self-center">
        {onOpenDemo && (
          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-text-muted hover:text-text border border-border hover:bg-surface rounded-xs transition-colors"
          >
            <Compass size={14} className="text-accent" />
            <span>{t('nav.guidedDemo', 'Guided Demo')}</span>
          </button>
        )}

        <Link
          to="/embed/precheck"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-medium text-text bg-surface hover:bg-surface-2 border border-border rounded-xs shadow-subtle transition-colors"
        >
          <CheckCircle2 size={14} className="text-verdigris" />
          <span>{t('landing.openPrecheck', 'Applicant Pre-Check')}</span>
        </Link>

        <Link
          to="/officer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-semibold text-accent-contrast bg-accent hover:opacity-90 rounded-xs shadow-subtle transition-all"
        >
          <Shield size={14} />
          <span>{t('landing.officerConsole', 'Officer Console')}</span>
        </Link>
      </div>
    </header>
  );
};
