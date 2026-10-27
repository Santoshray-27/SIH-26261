import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from './ui/Toast';
import { DemoTourModal } from './DemoTourModal';
import {
  SiteHeader,
  MainNav,
  NoticeTicker,
  Breadcrumbs,
  SiteFooter,
} from './gov';

export const PublicShell: React.FC = () => {
  const [showTour, setShowTour] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-sans selection:bg-tint-ochre selection:text-text transition-colors">
      <div className="editorial-grain" />

      {/* 1. Site Header (Neutral Logo + Brand + Tagline + Actions) */}
      <SiteHeader onOpenDemo={() => setShowTour(true)} />

      {/* 2. Main Government Navigation (Teal bar with Language & Font Scaling Controls) */}
      <MainNav />

      {/* 5. What's New Notice Ticker */}
      <NoticeTicker />

      {/* 6. Breadcrumbs for sub-pages */}
      <Breadcrumbs />

      {/* Main Content Region */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* 7. Government Portal Footer */}
      <SiteFooter />

      {/* Interactive Guided Demo Tour Modal */}
      {showTour && <DemoTourModal isOpen={showTour} onClose={() => setShowTour(false)} />}

      <ToastContainer />
    </div>
  );
};
