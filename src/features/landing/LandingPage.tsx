import React from 'react';
import { PortalLandingHero } from './components/PortalLandingHero';
import { LandingMarquee } from './components/LandingMarquee';
import { QuickServicesGrid } from './components/QuickServicesGrid';
import { PortalWorkflowStepper } from './components/PortalWorkflowStepper';
import { SectionEvidenceFinding } from './components/SectionEvidenceFinding';
import { SectionThreeLayers } from './components/SectionThreeLayers';
import { SectionCoverageStatement } from './components/SectionCoverageStatement';
import { SectionModuleMap } from './components/SectionModuleMap';
import { PortalNoticesTabs } from './components/PortalNoticesTabs';
import { SectionNonClaims } from './components/SectionNonClaims';
import { SectionRoadmap } from './components/SectionRoadmap';
import { PortalFaqAccordion } from './components/PortalFaqAccordion';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative bg-bg text-text selection:bg-tint-ochre selection:text-text">
      {/* 1. Hero Section (Government-Portal Header with Quick Services Search) */}
      <PortalLandingHero />

      {/* Highlights Continuous Marquee */}
      <LandingMarquee />

      {/* 2. Quick Services Grid (8 icon cards) */}
      <QuickServicesGrid />

      {/* 3. How It Works (5-step interactive horizontal/stacked stepper) */}
      <PortalWorkflowStepper />

      {/* 4. Every Finding Is Evidence-Linked (Non-pinned evidence inspector) */}
      <div id="section-finding">
        <SectionEvidenceFinding />
      </div>

      {/* 5. Three Separate Architecture Layers + Coverage Statement */}
      <div id="section-layers">
        <SectionThreeLayers />
        <SectionCoverageStatement />
      </div>

      {/* 6. Modules A–F + Infrastructure Breakdown */}
      <div id="section-modules">
        <SectionModuleMap />
      </div>

      {/* 7. Notices & Updates (Tabs: Prototype updates | Documentation | Help) */}
      <PortalNoticesTabs />

      {/* 8. What Sakshya‑I5 Will NOT Claim (§14 Honesty Section) */}
      <div id="section-non-claims">
        <SectionNonClaims />
      </div>

      {/* 9. Development Roadmap (Phase 4 Cross-Application Pattern Detection) */}
      <div id="section-roadmap">
        <SectionRoadmap />
      </div>

      {/* 10. Frequently Asked Questions (8 questions accordion) */}
      <div id="section-faq">
        <PortalFaqAccordion />
      </div>
    </div>
  );
};
