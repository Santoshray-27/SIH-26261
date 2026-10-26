import React, { useState } from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { useI18n } from '../../../i18n/useI18n';

export const SectionPortalIndependence: React.FC = () => {
  const { language } = useI18n();
  const [activePortal, setActivePortal] = useState<'aicte' | 'state' | 'embed'>('aicte');

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-bone/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">09 —</span>
          <span>Integration Architecture · Portal Independence</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'पोर्टल स्वतंत्रता: एक कोर सत्यापन इंजन'
            : 'One validation core, multiple host portals.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Regulatory logic is never coupled to portal-specific payloads. Pramāṇa powers the official AICTE portal,
          State Technical University portals, and an embeddable applicant pre-check widget using the exact same API.
        </p>

        {/* Portal Host Frame Selector */}
        <div className="flex gap-2 mb-6 font-mono text-xs">
          <button
            onClick={() => setActivePortal('aicte')}
            className={`px-4 py-2 border transition-colors ${
              activePortal === 'aicte'
                ? 'bg-ink text-paper border-ink font-semibold'
                : 'bg-paper text-slate border-hairline hover:text-ink'
            }`}
          >
            Portal A: AICTE Central Portal
          </button>
          <button
            onClick={() => setActivePortal('state')}
            className={`px-4 py-2 border transition-colors ${
              activePortal === 'state'
                ? 'bg-ink text-paper border-ink font-semibold'
                : 'bg-paper text-slate border-hairline hover:text-ink'
            }`}
          >
            Portal B: State Higher Education Portal
          </button>
          <button
            onClick={() => setActivePortal('embed')}
            className={`px-4 py-2 border transition-colors ${
              activePortal === 'embed'
                ? 'bg-ink text-paper border-ink font-semibold'
                : 'bg-paper text-slate border-hairline hover:text-ink'
            }`}
          >
            Embeddable Applicant Pre-Check Widget
          </button>
        </div>

        {/* Mock Portal Frame Container */}
        <div className="border border-hairline bg-paper shadow-lifted overflow-hidden">
          {/* Mock Browser Title Bar */}
          <div className="bg-bone/60 border-b border-hairline px-4 py-2.5 flex items-center justify-between font-mono text-[11px] text-slate">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-vermilion/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-ochre/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-verdigris/60 inline-block" />
              <span className="ml-2 text-ink font-semibold">
                {activePortal === 'aicte' && 'https://portal.aicte-india.org/eoa/2026'}
                {activePortal === 'state' && 'https://dte.telangana.gov.in/affiliation/inspection'}
                {activePortal === 'embed' && 'https://institution.edu.in/apply/aicte-precheck'}
              </span>
            </div>
            <span>Powered by Pramāṇa Engine</span>
          </div>

          {/* Host Portal Body Content */}
          <div className="p-8 font-mono text-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div>
                <span className="text-[10px] uppercase text-slate">Host Portal Environment</span>
                <h3 className="font-display font-bold text-lg text-ink">
                  {activePortal === 'aicte' && 'AICTE Central Approval Bureau Interface'}
                  {activePortal === 'state' && 'State Directorate of Technical Education Interface'}
                  {activePortal === 'embed' && 'Institution Pre-Submission Portal (Widget View)'}
                </h3>
              </div>
              <StatusPill status="PASS" size="sm" />
            </div>

            <p className="font-sans text-sm text-slate leading-relaxed">
              {activePortal === 'aicte' &&
                'Standard national portal layout routing EoA dossiers into the central regulatory triage queue.'}
              {activePortal === 'state' &&
                'State-level inspection interface receiving state NOC and local municipal land records.'}
              {activePortal === 'embed' &&
                'Isolated iframe / Web Component giving immediate deficiency feedback to college registrars prior to submission.'}
            </p>

            <div className="p-4 bg-bone/30 border border-hairline flex flex-wrap gap-8 text-[11px] text-slate">
              <div>
                <span className="text-[10px] uppercase block">Contract Endpoint</span>
                <code className="text-ink font-semibold">POST /api/v1/validation/execute</code>
              </div>
              <div>
                <span className="text-[10px] uppercase block">Engine Latency</span>
                <span className="text-ink font-semibold">120ms (Deterministic CPU)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block">Adapter Decoupling</span>
                <span className="text-verdigris font-semibold">Zero Host Vendor Lock-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
