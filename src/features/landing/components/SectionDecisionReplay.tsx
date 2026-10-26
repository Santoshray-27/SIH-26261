import React, { useState } from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { useI18n } from '../../../i18n/useI18n';

export const SectionDecisionReplay: React.FC = () => {
  const { language } = useI18n();
  const [versionIndex, setVersionIndex] = useState(0);

  const versions = [
    {
      year: '2024-25',
      version: 'v2024.2',
      norm: '15.0 sqm/student',
      status: 'PASS',
      diff: 'Baseline norm: Approved under 2024 handbook criteria.',
    },
    {
      year: '2025-26',
      version: 'v2025.1',
      norm: '16.5 sqm/student',
      status: 'PASS',
      diff: 'Minor norm revision (+1.5 sqm): Institution still compliant under buffer area.',
    },
    {
      year: '2026-27',
      version: 'v2026.1 (Current)',
      norm: '18.5 sqm/student',
      status: 'DEFICIENCY_FOUND',
      diff: 'Norm revision (+2.0 sqm): Declared carpet area 8,450 sqm falls below required 8,970 sqm threshold.',
    },
  ];

  const current = versions[versionIndex];

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">08 —</span>
          <span>Decision Replay Sandbox · §3.9</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'निर्णय पुनरावृत्ति: ऐतिहासिक नियमों पर सटीक परीक्षण'
            : 'Decision Replay: Sandboxed auditability.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Re-execute closed cases under the exact rule version, software version, and reference date
          active when submitted. Drag the time scrubber below to inspect how findings change across handbook revisions.
        </p>

        {/* Draggable Time Scrubber */}
        <div className="bg-bone/20 border border-hairline p-8 shadow-lifted">
          <div className="mb-6">
            <div className="flex justify-between font-mono text-xs text-slate mb-2">
              <span>Handbook Version 2024.2</span>
              <span>Handbook Version 2025.1</span>
              <span>Handbook Version 2026.1 (Active)</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={versionIndex}
              onChange={(e) => setVersionIndex(Number(e.target.value))}
              className="w-full cursor-pointer accent-ink h-2 bg-bone rounded-lg"
              aria-label="Handbook Rule Version Timeline Scrubber"
            />
          </div>

          {/* Replay Execution Diff View */}
          <div className="bg-paper border border-hairline p-6 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] text-slate uppercase block">Replayed Handbook Version</span>
                <span className="text-base font-bold text-ink">{current.version} (AY {current.year})</span>
              </div>
              <StatusPill status={current.status as any} size="sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
              <div className="p-3 bg-bone/30 border border-hairline">
                <span className="text-slate block text-[10px] uppercase">Formula Norm Multiplier</span>
                <span className="font-bold text-sm text-ink">{current.norm}</span>
              </div>
              <div className="p-3 bg-bone/30 border border-hairline">
                <span className="text-slate block text-[10px] uppercase">Declared Carpet Area</span>
                <span className="font-bold text-sm text-ink">8,450 sqm</span>
              </div>
              <div className="p-3 bg-bone/30 border border-hairline">
                <span className="text-slate block text-[10px] uppercase">Replay Match Ratio</span>
                <span className="font-bold text-sm text-verdigris">100% Deterministic</span>
              </div>
            </div>

            <div className="p-3 border border-dashed border-hairline font-sans text-xs text-slate">
              <strong>Differential Analysis:</strong> {current.diff}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
