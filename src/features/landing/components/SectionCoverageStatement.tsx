import React from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { useI18n } from '../../../i18n/useI18n';

export const SectionCoverageStatement: React.FC = () => {
  const { language } = useI18n();

  const missingChecks = [
    {
      name: 'Central University Affiliation Registry Check',
      code: 'CHK-MAND-09',
      reason: 'Affiliating University digital API integration is Phase 4 roadmap; adapter marked pending.',
      category: 'External Issuer Registry',
    },
    {
      name: 'Municipality Occupancy Certificate Verification',
      code: 'CHK-MAND-11',
      reason: 'State Urban Development Department has not published public authenticated endpoint.',
      category: 'Municipal Authority',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-bone/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">05 —</span>
          <span>Integrity Assurance · Case Coverage Statement</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'कवरेज विवरण: अनुपस्थित साक्ष्य छिपाया नहीं जाता'
            : 'Absence of evidence is never treated as a pass.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Every case carries an explicit statement of mandatory checks executed versus un-run.
          If a check did not run, the case is barred from automatic sufficiency.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Segmented Ring Graphic & Big Counter */}
          <div className="lg:col-span-5 bg-paper border border-hairline p-8 text-center shadow-lifted">
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              {/* Segmented Ring SVG (11 segments total: 9 green/verdigris, 2 hatched/gray) */}
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(12, 12, 11, 0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--st-pass)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 9 / 11)}
                  strokeLinecap="butt"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-4xl font-black text-ink">9 / 11</span>
                <span className="text-[10px] text-slate uppercase tracking-wider mt-1">
                  Checks Ran
                </span>
              </div>
            </div>

            <div className="mt-6 font-mono text-xs text-slate">
              <span className="font-bold text-ink">81.8%</span> Mandatory Verification Coverage
            </div>
          </div>

          {/* Un-run Checks Detailed List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate mb-2">
              Un-Executed Mandatory Checks (CHECK_NOT_RUN Styling)
            </div>

            {missingChecks.map((chk) => (
              <div
                key={chk.code}
                className="border border-hairline p-5 bg-paper shadow-subtle relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-hairline mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-ink">{chk.name}</span>
                    <span className="font-mono text-[10px] text-slate">({chk.code})</span>
                  </div>
                  <StatusPill status="CHECK_NOT_RUN" size="sm" />
                </div>

                <div className="font-mono text-xs text-slate space-y-1">
                  <div>
                    <span className="text-slate">Category: </span>
                    <span className="text-ink font-medium">{chk.category}</span>
                  </div>
                  <div>
                    <span className="text-slate">Specific Reason: </span>
                    <span className="text-vermilion font-medium">{chk.reason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
