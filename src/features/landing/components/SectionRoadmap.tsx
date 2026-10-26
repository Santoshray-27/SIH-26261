import React from 'react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionRoadmap: React.FC = () => {
  const { language } = useI18n();

  const phases = [
    {
      phase: 'Phase 1',
      tag: 'Core Workflow & Governance',
      status: 'Current Prototype (Demonstrable)',
      items: [
        'Deterministic validation engine & upload hardening',
        'Evidence Sufficiency Gate with configurable readiness profile',
        'Bilingual English/Hindi editorial interface scaffold',
        'Supersede-only actions & database-level audit safeguards',
      ],
    },
    {
      phase: 'Phase 2',
      tag: 'Authentication & Rule Governance',
      status: 'National Finale Target',
      items: [
        'Exact SHA-256 duplicate detection & PDF structure inspection',
        'Supported PKCS#7 digital signature validation with trust anchors',
        'Versioned rule pack lifecycle & formula rule engine',
        'Decision Replay sandbox for reproducible audits',
      ],
    },
    {
      phase: 'Phase 3',
      tag: 'Infrastructure Evidence Workflow',
      status: 'Planned Implementation',
      items: [
        'Deterministic geotag-distance rule with campus boundary buffer',
        'Officer-assisted floor-plan scale calibration & polygon area tracing',
        'Sampled video keyframe analysis with true timestamps',
        'Land registry mock adapter integration',
      ],
    },
    {
      phase: 'Phase 4',
      tag: 'Cross-Application Analytics (Proposed)',
      status: 'Designed now · built in Phase 4',
      items: [
        'Longitudinal document reuse analysis across institutions & years',
        'Faculty identity-overlap detection without biometrics',
        'External chain-head checkpoint publication sink',
        'Differential re-check on institutional resubmission',
      ],
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">11 —</span>
          <span>Engineering Phasing · 4-Phase Roadmap</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'विकास योजना: चरणबद्ध एवं सत्यापित क्रियान्वयन'
            : 'Phased rollout plan.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-16">
          Cross-application fraud detection is strictly labelled <em>“Designed now · built in Phase 4”</em>.
          Every phase follows a measure-first delivery discipline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 border flex flex-col justify-between ${
                idx === 3
                  ? 'border-ochre/60 bg-ochre-light/20'
                  : 'border-hairline bg-paper'
              }`}
            >
              <div>
                <div className="text-[10px] text-slate uppercase font-bold tracking-wider">
                  {p.phase}
                </div>
                <h3 className="font-display font-bold text-lg text-ink mt-1">
                  {p.tag}
                </h3>
                <span className="inline-block my-2 text-[10px] px-2 py-0.5 border border-hairline bg-bone/40 text-slate uppercase">
                  {p.status}
                </span>

                <ul className="space-y-2 mt-4 text-[11px] font-sans text-slate">
                  {p.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-ink font-mono">▪</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-hairline text-[10px] text-slate uppercase">
                Phase 0{idx + 1} Target
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
