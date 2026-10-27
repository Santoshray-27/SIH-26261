import React, { useState } from 'react';
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
  Cpu,
  Menu,
  X,
} from 'lucide-react';
import { DemoTourModal } from './DemoTourModal';
import { DevSimulationPanel } from './DevSimulationPanel';
import { useAppStore } from '../store/useAppStore';

export const OfficerShell: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
  const { toggleDevOverrides } = useAppStore();
  const [showTour, setShowTour] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

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

  return (
    <div className="h-dvh flex flex-col font-sans bg-bg text-text overflow-hidden selection:bg-tint-ochre selection:text-text">
      <div className="editorial-grain" />

      {/* Chrome Block (Sticky Banner + Sticky Header) */}
      <div className="sticky top-0 z-40 bg-bg shrink-0 shadow-subtle border-b border-border">
        <PrototypeBanner />

        <header className="px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between bg-bg-elevated transition-colors">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-1.5 border border-border text-text rounded-xs hover:bg-surface-2 transition-colors"
              aria-label="Open officer navigation"
            >
              <Menu size={18} />
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 border border-border-strong flex items-center justify-center font-serif font-black text-sm bg-accent-2 text-accent-2-contrast rounded-xs">
                प्र
              </div>
              <div>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase text-text block leading-none">
                  {t.common.appName}
                </span>
                <span className="text-text-muted text-[11px] font-mono tracking-wider">
                  Officer Review Console
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowTour(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-tint-ochre hover:opacity-90 text-st-review border border-border-strong rounded font-mono text-xs font-bold transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Guided Demo (17 Steps)</span>
            </button>

            {/* Dev Overrides Drawer Button */}
            <button
              onClick={toggleDevOverrides}
              className="p-1.5 border border-border text-text-muted hover:text-accent hover:border-accent rounded-xs transition-colors"
              title="Dev Simulation Overrides (Shift+D)"
              aria-label="Open Simulation Overrides"
            >
              <Cpu size={16} />
            </button>

            <RoleSwitcher />
            <LangToggle />
            <Link
              to="/"
              className="p-1.5 text-text-muted hover:text-text transition-colors"
              title="Return to Public Overview"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </header>
      </div>

      {/* Main Layout Frame: Sticky Independent Sidebar + Scrolling Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Officer Left Navigation - Desktop */}
        <aside className="hidden lg:flex w-64 border-r border-border p-4 flex-col gap-1 shrink-0 bg-surface transition-colors overflow-y-auto">
          <div className="text-[11px] font-mono uppercase text-text-muted tracking-wider px-3 py-2">
            Workspace
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
                className={`flex items-center gap-3 px-3 py-2.5 font-sans text-sm rounded-xs transition-colors border-l-2 ${
                  isActive
                    ? 'bg-tint-teal text-accent-2 font-bold border-accent-2 shadow-subtle'
                    : 'text-text-muted hover:text-text hover:bg-surface-2 border-transparent'
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-auto p-3.5 border border-border rounded-xs font-sans text-xs text-text-muted bg-surface-2">
            <div className="font-bold uppercase text-[11px] text-text mb-1 flex items-center justify-between">
              <span>Readiness Gate</span>
              <span className="font-mono text-[10px] text-accent-2">§6.2</span>
            </div>
            <p className="leading-snug">
              Weakest-signal rule active. Mandatory checks un-run block terminal decision.
            </p>
          </div>
        </aside>

        {/* Mobile Off-canvas Navigation Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-text/30 backdrop-blur-xs"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-72 max-w-xs bg-surface border-r border-border p-5 flex flex-col gap-2 shadow-floating z-10 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-sans text-sm font-bold tracking-tight text-text">
                  Console Navigation
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 border border-border text-text rounded-xs"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1 py-2 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = item.exact
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 font-sans text-sm rounded-xs border-l-2 ${
                        isActive
                          ? 'bg-tint-teal text-accent-2 font-bold border-accent-2'
                          : 'text-text-muted hover:text-text hover:bg-surface-2 border-transparent'
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  setShowTour(true);
                }}
                className="w-full py-2 bg-tint-ochre text-st-review border border-border-strong font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-1.5"
              >
                <Compass size={14} />
                <span>Guided Demo (17 Steps)</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-bg transition-colors">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
      <DemoTourModal isOpen={showTour} onClose={() => setShowTour(false)} />
      <DevSimulationPanel />
    </div>
  );
};
