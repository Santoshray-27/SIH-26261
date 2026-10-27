import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PrototypeBanner } from './PrototypeBanner';
import { LangToggle } from './LangToggle';
import { ToastContainer } from './ui/Toast';
import { useI18n } from '../i18n/useI18n';
import { ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';
import { DemoTourModal } from './DemoTourModal';

export const PublicShell: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
  const [showTour, setShowTour] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-sans selection:bg-tint-ochre selection:text-text transition-colors">
      <div className="editorial-grain" />
      <PrototypeBanner />

      {/* Editorial Header */}
      <header className="border-b border-border py-3.5 px-4 sm:px-6 md:px-12 flex items-center justify-between bg-bg-elevated sticky top-0 z-40 shadow-subtle">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-border-strong flex items-center justify-center font-serif font-black text-lg bg-surface-2 group-hover:bg-accent-2 group-hover:text-accent-2-contrast transition-colors rounded-xs">
            प्र
          </div>
          <div>
            <h1 className="font-display font-black text-xl sm:text-2xl tracking-tighter leading-none text-text">
              {t.common.appName}
            </h1>
            <p className="font-mono text-[11px] tracking-wider text-text-muted mt-0.5">
              AICTE Compliance Engine
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/precheck"
            className={`font-sans text-sm tracking-normal transition-colors ${
              location.pathname === '/precheck' ? 'font-bold text-accent-2 border-b-2 border-accent-2' : 'text-text-muted hover:text-text'
            }`}
          >
            {t.nav.precheck}
          </Link>
          <button
            onClick={() => setShowTour(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-tint-ochre text-st-review hover:opacity-90 border border-border-strong font-mono text-xs font-bold rounded-xs transition-colors"
          >
            <span>Guided Demo (17 Steps)</span>
          </button>
          <LangToggle />
          <Link
            to="/officer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent-2 text-accent-2-contrast font-sans text-sm font-semibold rounded-xs hover:opacity-90 transition-opacity"
          >
            <span>Officer Console</span>
            <ArrowRight size={14} />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-border text-text rounded-xs hover:bg-surface-2"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface p-4 space-y-4 font-sans text-sm shadow-lifted animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <Link
              to="/precheck"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 border border-border rounded-xs text-text hover:bg-surface-2"
            >
              {t.nav.precheck}
            </Link>
            <Link
              to="/officer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-accent-2 text-accent-2-contrast rounded-xs font-bold flex items-center justify-between"
            >
              <span>Officer Console</span>
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowTour(true);
              }}
              className="px-3 py-1 bg-tint-ochre text-st-review border border-border-strong rounded-xs font-bold text-xs font-mono"
            >
              Guided Demo
            </button>
            <LangToggle />
          </div>
        </div>
      )}

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Editorial Colophon Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 md:px-12 bg-surface-2 mt-auto font-sans text-xs text-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-text font-medium">
            <ShieldCheck size={16} strokeWidth={1.5} className="text-accent-2" />
            <span>Pramāṇa Evidence Ledger · SIH-26261</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-[12px] text-text-muted font-mono">
            <span>Tamper-Evident SHA-256 Audit</span>
            <span>Versioned AICTE APH 2026-27</span>
            <span>Deterministic First Architecture</span>
          </div>
        </div>
      </footer>

      <ToastContainer />
      <DemoTourModal isOpen={showTour} onClose={() => setShowTour(false)} />
    </div>
  );
};
