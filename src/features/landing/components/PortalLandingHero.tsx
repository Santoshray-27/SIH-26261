import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Shield,
  FileCheck2,
  Copy,
  MapPin,
  Ruler,
  History,
  ArrowRight,
} from 'lucide-react';
import BRAND from '../../../config/brand';

export const PortalLandingHero: React.FC = () => {
  const { t, i18n } = useTranslation(['landing', 'common', 'nav']);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  const searchableItems = [
    { name: 'Applicant Pre-Check Dossier Scan', to: '/embed/precheck' },
    { name: 'Officer Review Console', to: '/officer' },
    { name: 'Case APP-2026-8801 (Sri Vidya Inst of Technology)', to: '/officer/case/APP-2026-8801' },
    { name: 'Case APP-2026-8802 (Karpagam Academy)', to: '/officer/case/APP-2026-8802' },
    { name: 'Case APP-2026-8803 (Vardhaman College of Engineering)', to: '/officer/case/APP-2026-8803' },
    { name: 'SHA-256 Duplicate Check Tool', to: '/officer/tools?tool=duplicate' },
    { name: 'PDF Byte Structure Inspector', to: '/officer/tools?tool=structure' },
    { name: 'Geotag & Haversine Distance Audit', to: '/officer/tools?tool=geotag' },
    { name: 'Floor-Plan Area Shoelace Measure', to: '/officer/tools?tool=floorplan' },
    { name: 'Rulepack Governance (APH 2026-27)', to: '/officer/rules' },
    { name: 'Cryptographic Audit Proof Ledger', to: '/officer/audit' },
    { name: 'Verification Gazette & Neutralized CSV Export', to: '/officer/reports' },
  ];

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    const q = val.toLowerCase();
    const matches = searchableItems
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 5)
      .map((item) => item.name);
    setSuggestions(matches);
  };

  const handleSelectSuggestion = (name: string) => {
    const item = searchableItems.find((s) => s.name === name);
    if (item) {
      navigate(item.to);
    }
  };

  return (
    <section className="bg-tint-teal/40 border-b border-border py-12 sm:py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Decorative SVG of document with evidence bounding boxes in token colors */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 opacity-15 pointer-events-none -mr-10 -mt-10"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="160" height="160" rx="8" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2" />
        <rect x="35" y="35" width="70" height="8" rx="2" fill="var(--accent-2)" />
        <rect x="35" y="52" width="130" height="4" rx="2" fill="var(--control-border)" />
        <rect x="35" y="62" width="110" height="4" rx="2" fill="var(--control-border)" />
        {/* Cited bounding box 1 */}
        <rect x="35" y="76" width="120" height="24" rx="2" fill="var(--status-pass-bg)" stroke="var(--status-pass)" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="40" y="91" fill="var(--status-pass)" fontSize="8" fontFamily="monospace">MATCH VERIFIED</text>
        {/* Cited bounding box 2 */}
        <rect x="35" y="110" width="90" height="24" rx="2" fill="var(--status-deficiency-bg)" stroke="var(--status-deficiency)" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="40" y="125" fill="var(--status-deficiency)" fontSize="8" fontFamily="monospace">DEFICIENCY CITED</text>
      </svg>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Headline, Description, CTAs, Trust Chips (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface border border-border rounded-xs shadow-subtle text-xs font-mono text-text">
            <span className="w-2 h-2 rounded-full bg-accent-2" />
            <span className="font-semibold text-accent-2">{isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.65rem] tracking-tight leading-[1.15] text-text">
            {t('landing:heroTitle', `${BRAND.NAME_EN} — evidence-first application validation for AICTE`)}
          </h1>

          <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
            {t(
              'landing:heroDesc',
              'A tamper-evident compliance assessment platform connecting AICTE Approval Process Handbook criteria to verifiable cryptographic proof, deterministic calculations, and officer-first adjudication.'
            )}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/embed/precheck"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-contrast font-sans text-sm font-semibold rounded-xs shadow-subtle hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <FileCheck2 size={16} />
              <span>{t('landing:openPrecheck', 'Open Applicant Pre-Check')}</span>
            </Link>

            <Link
              to="/officer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:bg-surface-2 text-text border border-border-strong font-sans text-sm font-semibold rounded-xs shadow-subtle transition-all focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <Shield size={16} className="text-accent-2" />
              <span>{t('landing:officerConsole', 'Officer Console')}</span>
              <ArrowRight size={14} className="text-text-muted" />
            </Link>
          </div>

          {/* 3 Trust Chips */}
          <div className="pt-4 border-t border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans text-text">
            <div className="flex items-center gap-2 p-2 bg-surface/80 border border-border rounded-xs">
              <CheckCircle2 size={15} className="text-verdigris shrink-0" />
              <span className="font-medium">{t('landing:trustChip1', 'Rule-linked findings')}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-surface/80 border border-border rounded-xs">
              <Shield size={15} className="text-accent-2 shrink-0" />
              <span className="font-medium">{t('landing:trustChip2', 'Human decision stays with officer')}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-surface/80 border border-border rounded-xs">
              <History size={15} className="text-ochre shrink-0" />
              <span className="font-medium">{t('landing:trustChip3', 'Tamper-evident audit chain')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Services Search & Quick Action Cards (5 cols) */}
        <div className="lg:col-span-5 bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
          <div>
            <h2 className="font-serif font-bold text-base text-text flex items-center justify-between">
              <span>{t('common:quickServices', 'Quick Services')}</span>
              <span className="font-mono text-[10px] text-text-muted uppercase">Fast Access</span>
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Instant search across forensic tools, cases, and rules
            </p>
          </div>

          {/* Search Box with Autocomplete Suggestions */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search size={15} className="absolute left-3 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('landing:searchPlaceholder', 'Search a service or case ID (e.g. APP-2026-8801)...')}
                aria-label="Search compliance services or case ID"
                className="w-full pl-9 pr-3 py-2.5 bg-bg-elevated border border-control-border text-xs text-text rounded-xs focus:outline-none focus:ring-2 focus:ring-focus-ring placeholder:text-text-muted"
              />
            </div>

            {suggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 top-full mt-1 bg-surface border border-border rounded-xs shadow-lifted list-none p-1 m-0 z-50 animate-fadeIn"
                role="listbox"
              >
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectSuggestion(s)}
                    className="p-2 text-xs text-text hover:bg-surface-2 cursor-pointer rounded-xs flex items-center justify-between"
                  >
                    <span>{s}</span>
                    <ArrowRight size={11} className="text-text-muted" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 4 Quick Tiles */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              to="/embed/precheck"
              className="p-3 bg-surface-2 hover:bg-tint-teal border border-border rounded-xs transition-colors group flex flex-col justify-between h-20"
            >
              <div className="flex items-center justify-between">
                <FileCheck2 size={16} className="text-accent-2" />
                <ArrowRight size={12} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold text-xs text-text">Self-Check Dossier</span>
            </Link>

            <Link
              to="/officer/tools?tool=duplicate"
              className="p-3 bg-surface-2 hover:bg-tint-teal border border-border rounded-xs transition-colors group flex flex-col justify-between h-20"
            >
              <div className="flex items-center justify-between">
                <Copy size={16} className="text-accent-2" />
                <ArrowRight size={12} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold text-xs text-text">SHA-256 Duplication</span>
            </Link>

            <Link
              to="/officer/tools?tool=geotag"
              className="p-3 bg-surface-2 hover:bg-tint-teal border border-border rounded-xs transition-colors group flex flex-col justify-between h-20"
            >
              <div className="flex items-center justify-between">
                <MapPin size={16} className="text-accent-2" />
                <ArrowRight size={12} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold text-xs text-text">Campus Geotag Audit</span>
            </Link>

            <Link
              to="/officer/tools?tool=floorplan"
              className="p-3 bg-surface-2 hover:bg-tint-teal border border-border rounded-xs transition-colors group flex flex-col justify-between h-20"
            >
              <div className="flex items-center justify-between">
                <Ruler size={16} className="text-accent-2" />
                <ArrowRight size={12} className="text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-semibold text-xs text-text">Shoelace Area Measure</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
