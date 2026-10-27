import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  ChevronDown,
  FileCheck2,
  Shield,
  Layers,
  Sliders,
  History,
  FileSpreadsheet,
  Network,
  HelpCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';

export const MainNav: React.FC = () => {
  const { t, i18n } = useTranslation(['nav', 'common']);
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState<boolean>(false);
  const [resourcesOpen, setResourcesOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<number>(100);

  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const servicesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setResourcesOpen(false);
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setServicesOpen(false);
    setResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    resourcesTimerRef.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 150);
  };

  useEffect(() => {
    try {
      const savedSize = localStorage.getItem('sakshya-i5:text-size');
      if (savedSize) {
        const parsed = parseFloat(savedSize);
        if ([87.5, 100, 112.5, 125].includes(parsed)) {
          setTextSize(parsed);
          document.documentElement.style.fontSize = `${parsed}%`;
        }
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

  const isHindi = Boolean(i18n.language && i18n.language.startsWith('hi'));

  const handleLanguageChange = (lng: 'en' | 'hi') => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('sakshya-i5:lang', lng);
      localStorage.setItem('pramana_lang', lng);
    } catch (e) {}
  };

  // Close menus on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setResourcesOpen(false);
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on route navigation
  useEffect(() => {
    setServicesOpen(false);
    setResourcesOpen(false);
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const serviceItems = [
    {
      to: '/embed/precheck',
      title: t('nav:precheck', 'Applicant Pre-Check'),
      desc: 'Self-check compliance dossier before formal submission',
      icon: FileCheck2,
    },
    {
      to: '/officer',
      title: t('nav:officer', 'Officer Console'),
      desc: 'Institutional verification queue & triage dashboard',
      icon: Shield,
    },
    {
      to: '/officer/tools',
      title: t('nav:evidenceTools', 'Evidence Tools'),
      desc: 'SHA-256 duplicate check, PDF structure, Geotag, Floorplan',
      icon: Layers,
    },
    {
      to: '/officer/rules',
      title: t('nav:rules', 'Rule Governance'),
      desc: 'APH 2026-27 rulepacks & sufficiency readiness profiles',
      icon: Sliders,
    },
    {
      to: '/officer/audit',
      title: t('nav:audit', 'Audit Ledger'),
      desc: 'Linked cryptographic event hash-chain & tamper simulation',
      icon: History,
    },
    {
      to: '/officer/reports',
      title: t('nav:reports', 'Reports & CSV'),
      desc: 'Formal verification gazette & formula-neutralized exports',
      icon: FileSpreadsheet,
    },
    {
      to: '/officer/network',
      title: t('nav:network', 'Network Graph'),
      desc: 'Cross-application entity relationship graph',
      badge: 'Designed now · built in Phase 4',
      icon: Network,
    },
  ];

  const resourceItems = [
    {
      to: '/faq',
      title: t('nav:faq', 'Frequently Asked Questions'),
      desc: 'Clarifications on scope, synthetic data, and governance',
      icon: HelpCircle,
    },
    {
      to: '/accessibility',
      title: t('nav:accessibility', 'Accessibility Statement'),
      desc: 'WCAG 2.1 AA conformance, contrast, and font scale details',
      icon: Eye,
    },
    {
      to: '/ui-kit',
      title: t('nav:uiKit', 'UI Kit & Status Vocabulary'),
      desc: 'Forensic editorial color tokens & 13 status indicators',
      icon: CheckCircle,
    },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="bg-accent-2 text-surface border-b border-border shadow-md sticky top-0 z-30 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-12">
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 font-sans text-sm">
          <Link
            to="/"
            className={`px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
              location.pathname === '/' ? 'bg-nav-hover font-semibold' : ''
            }`}
          >
            {t('nav:home', 'Home')}
          </Link>

          <Link
            to="/about"
            className={`px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
              location.pathname === '/about' ? 'bg-nav-hover font-semibold' : ''
            }`}
          >
            {t('nav:about', 'About')}
          </Link>

          {/* Services Mega-Menu Trigger */}
          <div
            className="relative"
            ref={servicesRef}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              type="button"
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setResourcesOpen(false);
              }}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
                servicesOpen || location.pathname.startsWith('/officer') ? 'bg-nav-hover font-semibold' : ''
              }`}
            >
              <span>{t('nav:services', 'Services')}</span>
              <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Services Dropdown Panel */}
            {servicesOpen && (
              <div
                className="absolute left-0 mt-0 pt-1 w-[380px] z-50 animate-fadeIn"
                role="menu"
              >
                <div className="bg-bg-elevated text-text border border-border shadow-lifted rounded-xs p-3 grid grid-cols-1 gap-1">
                  <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-text-muted px-2 py-1 border-b border-border mb-1">
                    Compliance & Verification Services
                  </div>
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3 p-2 rounded-xs hover:bg-surface-2 transition-colors group"
                        role="menuitem"
                      >
                        <Icon size={16} className="text-accent-2 mt-0.5 shrink-0 group-hover:text-accent" />
                        <div className="flex-1">
                          <div className="font-semibold text-xs text-text flex items-center justify-between">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1 py-0.2 bg-tint-ochre text-ochre border border-ochre/30 rounded-xs">
                                Phase 4
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-muted leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/how-it-works"
            className={`px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
              location.pathname === '/how-it-works' ? 'bg-nav-hover font-semibold' : ''
            }`}
          >
            {t('nav:howItWorks', 'How It Works')}
          </Link>

          {/* Resources Dropdown Trigger */}
          <div
            className="relative"
            ref={resourcesRef}
            onMouseEnter={handleResourcesMouseEnter}
            onMouseLeave={handleResourcesMouseLeave}
          >
            <button
              type="button"
              onClick={() => {
                setResourcesOpen(!resourcesOpen);
                setServicesOpen(false);
              }}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
                resourcesOpen ? 'bg-nav-hover font-semibold' : ''
              }`}
            >
              <span>{t('nav:resources', 'Resources')}</span>
              <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesOpen && (
              <div
                className="absolute left-0 mt-0 pt-1 w-72 z-50 animate-fadeIn"
                role="menu"
              >
                <div className="bg-bg-elevated text-text border border-border shadow-lifted rounded-xs p-3 grid grid-cols-1 gap-1">
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-start gap-3 p-2 rounded-xs hover:bg-surface-2 transition-colors group"
                        role="menuitem"
                      >
                        <Icon size={16} className="text-accent-2 mt-0.5 shrink-0 group-hover:text-accent" />
                        <div className="flex-1">
                          <div className="font-semibold text-xs text-text">{item.title}</div>
                          <p className="text-[11px] text-text-muted leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/help"
            className={`px-3 py-2 rounded-xs transition-colors hover:bg-nav-hover ${
              location.pathname === '/help' ? 'bg-nav-hover font-semibold' : ''
            }`}
          >
            {t('nav:help', 'Help')}
          </Link>
        </div>

        {/* Right Side: Text Size Controls & Hindi/English Language Switcher */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Text Size: A- A A+ A++ */}
          <div
            className="flex items-center gap-0.5 bg-black/10 dark:bg-white/10 p-0.5 rounded-xs border border-white/20 text-xs font-mono"
            role="group"
            aria-label="Text sizing controls"
          >
            {[
              { label: 'A-', pct: 87.5 },
              { label: 'A', pct: 100 },
              { label: 'A+', pct: 112.5 },
              { label: 'A++', pct: 125 },
            ].map(({ label, pct }) => (
              <button
                key={label}
                type="button"
                onClick={() => changeTextSize(pct)}
                className={`px-1.5 py-0.5 rounded-xs transition-colors ${
                  textSize === pct
                    ? 'bg-surface text-accent-2 font-bold shadow-xs'
                    : 'text-surface/80 hover:text-surface hover:bg-white/10'
                }`}
                title={`Text size ${label} (${pct}%)`}
                aria-pressed={textSize === pct}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Language Toggle: English | हिन्दी */}
          <div
            className="flex items-center gap-1 bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded-xs border border-white/20 text-xs font-sans"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              lang="en"
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                !isHindi
                  ? 'bg-surface text-accent-2 font-bold shadow-xs'
                  : 'text-surface/80 hover:text-surface hover:bg-white/10'
              }`}
              aria-pressed={!isHindi}
            >
              English
            </button>
            <span className="text-surface/40" aria-hidden="true">|</span>
            <button
              type="button"
              lang="hi"
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                isHindi
                  ? 'bg-surface text-accent-2 font-bold shadow-xs'
                  : 'text-surface/80 hover:text-surface hover:bg-white/10'
              }`}
              aria-pressed={isHindi}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <span className="font-bold text-xs uppercase tracking-wider">
            {t('nav:services', 'Navigation')}
          </span>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-1.5 hover:bg-nav-hover rounded-xs text-surface focus:outline-none focus:ring-1 focus:ring-surface"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileDrawerOpen}
          >
            {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Accordion Sheet) */}
      {mobileDrawerOpen && (
        <div className="md:hidden bg-bg-elevated text-text border-b border-border p-4 space-y-3 animate-fadeIn">
          <div className="space-y-1 font-sans text-sm">
            <Link
              to="/"
              className="block p-2 rounded-xs hover:bg-surface-2 font-medium"
              onClick={() => setMobileDrawerOpen(false)}
            >
              {t('nav:home', 'Home')}
            </Link>
            <Link
              to="/about"
              className="block p-2 rounded-xs hover:bg-surface-2 font-medium"
              onClick={() => setMobileDrawerOpen(false)}
            >
              {t('nav:about', 'About')}
            </Link>

            <div className="border-t border-border pt-2 pb-1 font-sans text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t('nav:services', 'Services')}
            </div>
            {serviceItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between p-2 rounded-xs hover:bg-surface-2 text-xs"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <span>{item.title}</span>
                {item.badge && <span className="text-[10px] font-sans px-1.5 py-0.2 bg-tint-ochre text-ochre border border-ochre/30 rounded-xs">Phase 4</span>}
              </Link>
            ))}

            <div className="border-t border-border pt-2 pb-1 font-sans text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t('nav:resources', 'Resources')}
            </div>
            {resourceItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block p-2 rounded-xs hover:bg-surface-2 text-xs"
                onClick={() => setMobileDrawerOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <Link
              to="/help"
              className="block p-2 rounded-xs hover:bg-surface-2 font-medium border-t border-border mt-2"
              onClick={() => setMobileDrawerOpen(false)}
            >
              {t('nav:help', 'Help')}
            </Link>
          </div>

          {/* Mobile Text Sizing & Language Controls */}
          <div className="border-t border-border pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Text Size */}
            <div className="flex items-center gap-1 font-mono">
              <span className="text-[10px] text-text-muted mr-1">Text:</span>
              {[
                { label: 'A-', pct: 87.5 },
                { label: 'A', pct: 100 },
                { label: 'A+', pct: 112.5 },
                { label: 'A++', pct: 125 },
              ].map(({ label, pct }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => changeTextSize(pct)}
                  className={`px-2 py-1 rounded-xs border border-border ${
                    textSize === pct
                      ? 'bg-accent-2 text-surface font-bold'
                      : 'bg-surface text-text hover:bg-surface-2'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Language */}
            <div className="flex items-center gap-1 font-sans">
              <button
                type="button"
                lang="en"
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 rounded-xs border border-border ${
                  !isHindi
                    ? 'bg-accent-2 text-surface font-bold'
                    : 'bg-surface text-text hover:bg-surface-2'
                }`}
              >
                English
              </button>
              <button
                type="button"
                lang="hi"
                onClick={() => handleLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-xs border border-border ${
                  isHindi
                    ? 'bg-accent-2 text-surface font-bold'
                    : 'bg-surface text-text hover:bg-surface-2'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
