import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PrototypeBanner } from './PrototypeBanner';
import { LangToggle } from './LangToggle';
import { RoleSwitcher } from './RoleSwitcher';
import { ToastContainer } from './ui/Toast';
import { useI18n } from '../i18n/useI18n';
import {
  Inbox,
  FileCheck2,
  Sliders,
  History,
  LayoutGrid,
  ExternalLink,
  Wrench,
  Network,
  FileText,
  Compass,
} from 'lucide-react';
import { DemoTourModal } from './DemoTourModal';
import { DevSimulationPanel } from './DevSimulationPanel';
import { ThemeToggle } from './ThemeToggle';
import { useAppStore } from '../store/useAppStore';

export const OfficerShell: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
  const { theme } = useAppStore();
  const [showTour, setShowTour] = React.useState<boolean>(false);

  const navItems = [
    { to: '/officer', label: t.nav.dashboard, icon: Inbox, exact: true },
    { to: '/officer/queue', label: 'Triage Queue', icon: FileCheck2 },
    { to: '/officer/tools', label: 'Evidence Tools', icon: Wrench },
    { to: '/officer/network', label: 'Network Graph', icon: Network },
    { to: '/officer/reports', label: 'Reports & CSV', icon: FileText },
    { to: '/officer/rules', label: t.nav.rules, icon: Sliders },
    { to: '/officer/audit', label: t.nav.audit, icon: History },
    { to: '/ui-kit', label: t.nav.uiKit, icon: LayoutGrid },
  ];

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDark ? 'dark bg-ink-dark text-ink-text' : 'bg-paper text-ink'
      }`}
    >
      <div className="editorial-grain" />
      <PrototypeBanner />

      {/* Officer Top Bar */}
      <header
        className={`border-b border-hairline px-6 py-3 flex items-center justify-between transition-colors ${
          isDark ? 'bg-ink-surface' : 'bg-bone/40'
        }`}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 border flex items-center justify-center font-serif font-black text-sm ${
                isDark ? 'border-paper bg-ink-dark text-paper' : 'border-ink bg-paper text-ink'
              }`}
            >
              प्र
            </div>
            <span
              className={`font-display font-bold text-lg tracking-tight uppercase ${
                isDark ? 'text-paper' : 'text-ink'
              }`}
            >
              {t.common.appName}
            </span>
          </Link>
          <span className="text-slate text-xs font-mono hidden sm:inline">
            / Officer Review Console ({isDark ? 'Dark Theme' : 'Light Paper'})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTour(true)}
            className="px-3 py-1 bg-ochre/20 hover:bg-ochre/30 text-ochre border border-ochre/40 rounded font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Guided Demo (17 Steps)</span>
          </button>
          <RoleSwitcher />
          <ThemeToggle />
          <LangToggle />
          <Link
            to="/"
            className="p-1.5 text-slate hover:text-ink dark:hover:text-paper"
            title="Return to Public Overview"
          >
            <ExternalLink size={15} />
          </Link>
        </div>
      </header>

      {/* Main Layout: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Officer Left Navigation */}
        <aside
          className={`w-64 border-r border-hairline p-4 flex flex-col gap-1 shrink-0 transition-colors ${
            isDark ? 'bg-ink-surface/50' : 'bg-bone/25'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate tracking-widest px-3 py-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider rounded-xs transition-colors ${
                  isActive
                    ? isDark
                      ? 'bg-paper text-ink font-semibold'
                      : 'bg-ink text-paper font-semibold'
                    : isDark
                      ? 'text-slate hover:text-paper hover:bg-ink-surface'
                      : 'text-slate hover:text-ink hover:bg-bone/50'
                }`}
              >
                <Icon size={15} strokeWidth={1.25} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div
            className={`mt-auto p-3 border border-hairline rounded-xs font-mono text-[11px] text-slate ${
              isDark ? 'bg-ink-dark' : 'bg-paper'
            }`}
          >
            <div
              className={`text-[10px] font-semibold uppercase mb-1 ${
                isDark ? 'text-paper' : 'text-ink'
              }`}
            >
              Readiness Gate
            </div>
            <p className="leading-tight">
              Weakest-signal evaluation active. Mandatory checks un-run block terminal decision.
            </p>
          </div>
        </aside>

        {/* Content Pane */}
        <main
          className={`flex-1 overflow-y-auto p-6 md:p-8 transition-colors ${
            isDark ? 'bg-ink-dark' : 'bg-paper'
          }`}
        >
          <Outlet />
        </main>
      </div>

      <ToastContainer />
      <DemoTourModal isOpen={showTour} onClose={() => setShowTour(false)} />
      <DevSimulationPanel />
    </div>
  );
};
