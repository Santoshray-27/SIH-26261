import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PrototypeBanner } from './PrototypeBanner';
import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';
import { ToastContainer } from './ui/Toast';
import { useI18n } from '../i18n/useI18n';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { DemoTourModal } from './DemoTourModal';

export const PublicShell: React.FC = () => {
  const { t } = useI18n();
  const location = useLocation();
  const [showTour, setShowTour] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-ochre selection:text-ink">
      <div className="editorial-grain" />
      <PrototypeBanner />

      {/* Editorial Header */}
      <header className="border-b border-hairline py-4 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-none border border-ink flex items-center justify-center font-serif font-black text-lg bg-bone group-hover:bg-ink group-hover:text-paper transition-colors">
            प्र
          </div>
          <div>
            <h1 className="font-display font-black text-2xl tracking-tighter uppercase leading-none">
              {t.common.appName}
            </h1>
            <p className="font-mono text-[10px] tracking-widest text-slate uppercase mt-0.5">
              AICTE Compliance Engine
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/precheck"
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              location.pathname === '/precheck' ? 'font-bold border-b border-ink' : 'text-slate hover:text-ink'
            }`}
          >
            {t.nav.precheck}
          </Link>
          <Link
            to="/ui-kit"
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              location.pathname === '/ui-kit' ? 'font-bold border-b border-ink' : 'text-slate hover:text-ink'
            }`}
          >
          </Link>
          <button
            onClick={() => setShowTour(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-ochre/15 text-[#926405] hover:bg-ochre/25 border border-ochre/30 font-mono text-xs font-bold rounded-xs transition-colors"
          >
            <span>Guided Demo (17 Steps)</span>
          </button>
          <ThemeToggle />
          <LangToggle />
          <Link
            to="/officer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper font-mono text-xs uppercase hover:bg-black transition-colors"
          >
            <span>Officer Console</span>
            <ArrowRight size={13} />
          </Link>
        </nav>
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Editorial Colophon Footer */}
      <footer className="border-t border-hairline py-8 px-6 md:px-12 bg-bone/30 mt-auto font-mono text-xs text-slate">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} strokeWidth={1.25} />
            <span>Pramāṇa Evidence Ledger · SIH-26261</span>
          </div>
          <div className="flex gap-6 text-[11px]">
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
