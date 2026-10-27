import React from 'react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionNonClaims: React.FC = () => {
  const { language } = useI18n();

  const nonClaims = [
    {
      title: 'No unsupported live external integrations',
      desc: 'We never claim live connections to DigiLocker, NAAC/NBA, or State land portals without explicit API documentation and legal authorization. Development runs on transparently labelled simulated adapters.',
    },
    {
      title: 'No unmeasured accuracy or time-saving statistics',
      desc: 'We publish zero speculative percentages (no "99.8% precision", no "saves 80% time"). We report only reproducible evaluation metrics on verified benchmark sets.',
    },
    {
      title: 'AI flags are indicators, never forgery verdicts',
      desc: 'Computer vision and PDF structure analysis surface review signals. An algorithm cannot independently declare a document "forged" or certify physical campus compliance.',
    },
    {
      title: 'No automated statutory decisions',
      desc: 'The Evidence Sufficiency Gate routes work and surfaces missing mandatory evidence. Statutory decision-making authority belongs exclusively to authorized human AICTE officers.',
    },
    {
      title: 'Tamper-evident, never "immutable"',
      desc: 'Cryptographic hash chains and database write protections make historical modifications detectable, reinforced by external checkpoints. We reject false claims of blockchain immutability.',
    },
    {
      title: 'No biometric profiling or restricted database lookups',
      desc: 'Identity-overlap checks operate strictly on submitted faculty record fields. We conduct zero facial matching and zero intrusive surveillance.',
    },
  ];

  return (
    <section
      data-theme="dark"
      className="py-24 px-6 md:px-12 bg-bg text-text border-b border-border select-none transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
          <span className="font-bold text-st-deficiency">10 —</span>
          <span className="text-text-muted">Institutional Integrity · Explicit Non-Claims (§14)</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-text uppercase mb-4">
          {language === 'hi'
            ? 'प्रमाण क्या दावा नहीं करता'
            : 'What Pramāṇa will NOT claim.'}
        </h2>

        <p className="font-mono text-xs text-text-muted max-w-2xl mb-16">
          Integrity begins with scientific honesty. In compliance with solution guidelines §14,
          we explicitly reject the following common tech demo exaggerations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          {nonClaims.map((item, idx) => (
            <div
              key={idx}
              className="p-6 border border-border bg-surface rounded-xs space-y-2 hover:border-st-deficiency transition-colors"
            >
              <div className="flex items-center gap-2 text-st-deficiency font-bold uppercase text-[11px]">
                <span>✕</span>
                <span>{item.title}</span>
              </div>
              <p className="font-sans text-sm text-text-muted leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
