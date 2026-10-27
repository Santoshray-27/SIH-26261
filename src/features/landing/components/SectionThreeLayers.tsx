import React, { useState } from 'react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionThreeLayers: React.FC = () => {
  const { language } = useI18n();
  const [separated, setSeparated] = useState(false);

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">04 —</span>
          <span>Architectural Safeguard · Three Layers</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase">
              {language === 'hi'
                ? 'तीन पृथक स्तर: कभी एक में नहीं मिलाए जाते'
                : 'Three layers, visibly separated.'}
            </h2>
            <p className="font-mono text-xs text-slate mt-2 max-w-xl">
              An aggregate algorithm must never decide approval. Check results, evidence readiness,
              and officer regulatory decisions remain strictly decoupled.
            </p>
          </div>

          <button
            onClick={() => setSeparated(!separated)}
            className="px-4 py-2 border border-ink text-xs font-mono uppercase bg-bone hover:bg-ink hover:text-paper transition-colors shrink-0"
          >
            {separated ? 'Stack Layers (Collapse)' : 'Explode 3 Planes (Inspect)'}
          </button>
        </div>

        {/* 3 Stacked / Exploded Isometric Planes */}
        <div className="relative py-12 flex flex-col gap-6 items-center">
          {/* Layer 3: Officer Decision */}
          <div
            className={`w-full max-w-3xl border border-hairline bg-paper p-6 shadow-lifted transition-all duration-500 ease-out border-l-4 border-l-ink ${
              separated ? 'translate-y-0 opacity-100' : 'md:translate-y-4'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-hairline mb-3">
              <span className="font-bold text-ink uppercase">Layer 03 · Officer Regulatory Decision</span>
              <span className="px-2 py-0.5 bg-ink text-paper text-[10px]">HUMAN STATUTORY AUTHORITY</span>
            </div>
            <p className="font-sans text-sm text-slate leading-relaxed">
              Only an authorized regulatory officer records the statutory disposition. Automated systems
              cannot approve or reject; they produce evidence-backed findings and recommendations. Overrides
              require recorded rationale.
            </p>
          </div>

          {/* Layer 2: Evidence Sufficiency Gate */}
          <div
            className={`w-full max-w-3xl border border-hairline bg-bone/30 p-6 shadow-lifted transition-all duration-500 ease-out border-l-4 border-l-ochre ${
              separated ? 'translate-y-0 opacity-100' : 'md:-translate-y-2'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-hairline mb-3">
              <span className="font-bold text-ochre uppercase">Layer 02 · Evidence Sufficiency Gate</span>
              <span className="px-2 py-0.5 bg-ochre text-text text-[10px]">WEAKEST-SIGNAL ROUTING</span>
            </div>
            <p className="font-sans text-sm text-slate leading-relaxed">
              Workflow gate evaluating whether mandatory checks executed, critical fields meet confidence floors,
              and external issuers responded. It halts cases if critical evidence is unresolved—never averaging
              unresolved issues away.
            </p>
          </div>

          {/* Layer 1: Check Result */}
          <div
            className={`w-full max-w-3xl border border-hairline bg-paper p-6 shadow-lifted transition-all duration-500 ease-out border-l-4 border-l-verdigris ${
              separated ? 'translate-y-0 opacity-100' : 'md:-translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-hairline mb-3">
              <span className="font-bold text-verdigris uppercase">Layer 01 · Check Result Engine</span>
              <span className="px-2 py-0.5 bg-verdigris text-text text-[10px]">DETERMINISTIC & UNIT-TESTED</span>
            </div>
            <p className="font-sans text-sm text-slate leading-relaxed">
              What specific rules, comparisons, signature validators, or issuer adapters returned (PASS,
              DEFICIENCY_FOUND, SOURCE_UNAVAILABLE). No predictive extrapolation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
