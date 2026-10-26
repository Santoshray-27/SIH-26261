import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressRuler } from './components/ScrollProgressRuler';
import { SectionHero } from './components/SectionHero';
import { SectionProblem } from './components/SectionProblem';
import { SectionEvidenceFinding } from './components/SectionEvidenceFinding';
import { SectionThreeLayers } from './components/SectionThreeLayers';
import { SectionCoverageStatement } from './components/SectionCoverageStatement';
import { SectionModuleMap } from './components/SectionModuleMap';
import { SectionStatusWall } from './components/SectionStatusWall';
import { SectionDecisionReplay } from './components/SectionDecisionReplay';
import { SectionPortalIndependence } from './components/SectionPortalIndependence';
import { SectionNonClaims } from './components/SectionNonClaims';
import { SectionRoadmap } from './components/SectionRoadmap';
import { SectionFooterCTA } from './components/SectionFooterCTA';

export const LandingPage: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // Honour prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Initialize smooth scroll with Lenis as per engineering.md
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-paper text-ink selection:bg-ochre selection:text-ink">
      {/* Preloader with rotating circular seal */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Editorial Custom Cursor (Landing only) */}
      <CustomCursor />

      {/* Right Edge Editorial Scroll Progress Ruler */}
      <ScrollProgressRuler />

      {/* Sections 01 to 12 */}
      <div id="section-hero">
        <SectionHero />
      </div>

      <div id="section-problem">
        <SectionProblem />
      </div>

      <div id="section-finding">
        <SectionEvidenceFinding />
      </div>

      <div id="section-layers">
        <SectionThreeLayers />
      </div>

      <div id="section-coverage">
        <SectionCoverageStatement />
      </div>

      <div id="section-modules">
        <SectionModuleMap />
      </div>

      <div id="section-statuses">
        <SectionStatusWall />
      </div>

      <div id="section-replay">
        <SectionDecisionReplay />
      </div>

      <div id="section-portals">
        <SectionPortalIndependence />
      </div>

      <div id="section-non-claims">
        <SectionNonClaims />
      </div>

      <div id="section-roadmap">
        <SectionRoadmap />
      </div>

      <div id="section-cta">
        <SectionFooterCTA />
      </div>
    </div>
  );
};
