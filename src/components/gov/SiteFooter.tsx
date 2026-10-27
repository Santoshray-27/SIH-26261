import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BRAND from '../../config/brand';

export const SiteFooter: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'nav']);
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  return (
    <footer className="bg-surface-2 border-t border-border mt-auto font-sans text-xs text-text-muted transition-colors select-none">
      {/* Multi-Column Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: About Sakshya-I5 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-border-strong flex items-center justify-center font-serif font-bold text-sm bg-accent-2 text-surface rounded-xs">
              {BRAND.GLYPH}
            </div>
            <span className="font-display font-black text-base text-text">
              {isHindi ? BRAND.NAME_HI : BRAND.NAME_EN}
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {isHindi ? BRAND.TAGLINE_HI : BRAND.TAGLINE_EN}. {isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN}.
          </p>
          <div className="text-[11px] font-mono text-text-muted">
            {BRAND.CONTEXT}
          </div>
        </div>

        {/* Column 2: Key Services */}
        <div className="space-y-2.5">
          <h4 className="font-serif font-bold text-sm text-text uppercase tracking-wider">
            {t('common:quickServices', 'Services')}
          </h4>
          <ul className="space-y-1.5 list-none p-0 m-0">
            <li>
              <Link to="/embed/precheck" className="hover:text-accent-2 hover:underline">
                {t('nav:precheck', 'Applicant Pre-Check')}
              </Link>
            </li>
            <li>
              <Link to="/officer" className="hover:text-accent-2 hover:underline">
                {t('nav:officer', 'Officer Console')}
              </Link>
            </li>
            <li>
              <Link to="/officer/tools" className="hover:text-accent-2 hover:underline">
                {t('nav:evidenceTools', 'Forensic Evidence Tools')}
              </Link>
            </li>
            <li>
              <Link to="/officer/rules" className="hover:text-accent-2 hover:underline">
                {t('nav:rules', 'Rulepack Governance')}
              </Link>
            </li>
            <li>
              <Link to="/officer/audit" className="hover:text-accent-2 hover:underline">
                {t('nav:audit', 'Cryptographic Proof Ledger')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources & Documentation */}
        <div className="space-y-2.5">
          <h4 className="font-serif font-bold text-sm text-text uppercase tracking-wider">
            {t('nav:resources', 'Resources')}
          </h4>
          <ul className="space-y-1.5 list-none p-0 m-0">
            <li>
              <Link to="/faq" className="hover:text-accent-2 hover:underline">
                {t('nav:faq', 'Frequently Asked Questions')}
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="hover:text-accent-2 hover:underline">
                {t('nav:accessibility', 'Accessibility Statement')}
              </Link>
            </li>
            <li>
              <Link to="/ui-kit" className="hover:text-accent-2 hover:underline">
                {t('nav:uiKit', 'Design Tokens & Status Vocabulary')}
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-accent-2 hover:underline">
                {t('nav:howItWorks', 'Verification Workflow Stepper')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Policies & Helpdesk */}
        <div className="space-y-2.5">
          <h4 className="font-serif font-bold text-sm text-text uppercase tracking-wider">
            Policies & Contact
          </h4>
          <ul className="space-y-1.5 list-none p-0 m-0">
            <li>
              <Link to="/privacy" className="hover:text-accent-2 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent-2 hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-accent-2 hover:underline">
                Statutory Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-accent-2 hover:underline">
                Portal Sitemap
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-accent-2 hover:underline">
                Technical Helpdesk
              </Link>
            </li>
          </ul>
          <div className="pt-2 text-[11px] font-mono text-text-muted">
            <span>Helpdesk: </span>
            <span className="text-text font-bold">{BRAND.HELPDESK_PLACEHOLDER}</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="bg-bg border-t border-border py-4 px-4 sm:px-6 md:px-10 text-[11px] text-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="max-w-3xl leading-relaxed">
            {isHindi ? BRAND.DISCLAIMER_HI : BRAND.DISCLAIMER_EN}
          </div>
          <div className="font-mono shrink-0">
            <span>Build 2.1.0 · </span>
            <span>{BRAND.CONTEXT}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
