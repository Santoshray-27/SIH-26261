import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortalNoticesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'updates' | 'docs' | 'help'>('updates');

  const updates = [
    {
      date: '2026-03-24',
      badge: 'PROTOTYPE V2.1',
      title: 'AICTE Handbook (APH 2026-27) Formula Evaluation Ruleset Deployed',
      desc: 'Added automated classroom area calculation against Appendix 4 norms with Shoelace polygon derivation.',
    },
    {
      date: '2026-03-20',
      badge: 'PROTOTYPE FIXTURE',
      title: 'Geospatial Haversine Boundary Distance Verification Synchronized',
      desc: 'EXIF latitude/longitude comparison against declared campus coordinates with configurable 250m tolerance.',
    },
    {
      date: '2026-03-16',
      badge: 'PROTOTYPE BENCHMARK',
      title: 'Cryptographic SHA-256 Audit Trail External Checkpoint Added',
      desc: 'Simulated tamper detection verifies sequential block digests against published root hashes.',
    },
  ];

  const docs = [
    {
      date: '2026-03-12',
      badge: 'SPECIFICATION',
      title: 'Evidence Sufficiency Gate & Limiting Signal Mathematical Model (§3.4)',
      desc: 'Documentation on the weakest-signal principle preventing un-run checks from being averaged out.',
    },
    {
      date: '2026-03-10',
      badge: 'ARCHITECTURE',
      title: 'Style-Isolated Multi-Portal Pre-Check Embedding Protocol',
      desc: 'Iframe cross-origin postMessage communication with suppression of internal vigilance flags.',
    },
  ];

  const helpTopics = [
    {
      date: '2026-03-01',
      badge: 'EVALUATOR GUIDE',
      title: 'Step-by-Step Evaluator Walkthrough (17 Interactive Stages)',
      desc: 'How to trigger the Guided Demo tour and test applicant pre-check and officer adjudication.',
    },
    {
      date: '2026-02-28',
      badge: 'ACCESSIBILITY',
      title: 'Screen Reader & Keyboard Shortcuts Reference Guide',
      desc: 'Use [J/K] for findings, [C] for correction, [R] for clarification notice, and [?] for shortcuts modal.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-surface-2 border-b border-border">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Information Desk
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-text mt-1">
              Notices, Documentation & Updates
            </h2>
          </div>

          {/* 3 Tabs */}
          <div className="flex items-center gap-1 bg-surface border border-border p-1 rounded-xs">
            <button
              type="button"
              onClick={() => setActiveTab('updates')}
              className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-colors ${
                activeTab === 'updates' ? 'bg-accent-2 text-surface font-semibold shadow-subtle' : 'text-text-muted hover:text-text'
              }`}
            >
              Prototype Updates
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-colors ${
                activeTab === 'docs' ? 'bg-accent-2 text-surface font-semibold shadow-subtle' : 'text-text-muted hover:text-text'
              }`}
            >
              Documentation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('help')}
              className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-colors ${
                activeTab === 'help' ? 'bg-accent-2 text-surface font-semibold shadow-subtle' : 'text-text-muted hover:text-text'
              }`}
            >
              Help & Guides
            </button>
          </div>
        </div>

        {/* Tab Content List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(activeTab === 'updates' ? updates : activeTab === 'docs' ? docs : helpTopics).map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-surface border border-border rounded-md shadow-subtle space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-1.5 py-0.5 bg-tint-clay text-accent font-bold rounded-xs">
                    {item.badge}
                  </span>
                  <span className="text-text-muted">{item.date}</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-text leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Link
                  to="/help"
                  className="text-xs font-mono text-accent-2 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Read details</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
