import React, { useState } from 'react';
import { useI18n } from '../../../i18n/useI18n';

interface ModuleDetail {
  code: string;
  name: string;
  whatItChecks: string;
  evidenceReturned: string;
  officerAction: string;
}

export const SectionModuleMap: React.FC = () => {
  const { language } = useI18n();

  const modules: ModuleDetail[] = [
    {
      code: 'Module A',
      name: 'Application Completeness & Document Intelligence',
      whatItChecks: 'Mandatory file checklist, format validation, OCR confidence, institutional field concordance, and normalization.',
      evidenceReturned: 'Extracted key-value fields with page/region bounding boxes, confidence score, raw vs normalized text.',
      officerAction: 'Inspect low-confidence fields, correct errors with audit record, verify institutional concordance.',
    },
    {
      code: 'Module B',
      name: 'Document Authentication & Integrity',
      whatItChecks: 'SHA-256 exact-byte duplicates, PKCS#7 digital signature validity, PDF structure anomalies, and external issuer responses.',
      evidenceReturned: 'Cryptographic certificate chain validation, duplicate document references, PDF revision indicators.',
      officerAction: 'Escalate duplicate documents to vigilance review; evaluate PDF structure indicators.',
    },
    {
      code: 'Module C',
      name: 'Regulatory Compliance & Formula Rules',
      whatItChecks: 'Versioned AICTE Approval Process Handbook clauses, expiry dates against reference date, and area formula norms.',
      evidenceReturned: 'Clause citations, handbook page reference, formula computation breakdown (inputs, norm multiplier, delta).',
      officerAction: 'Draft bilingual rectification notice for rectifiable gaps; request clarification for borderline scores.',
    },
    {
      code: 'Module D',
      name: 'Infrastructure Evidence Review',
      whatItChecks: 'EXIF coordinates vs campus boundary tolerance, officer-assisted floor-plan scale tracing, video frame timestamps.',
      evidenceReturned: 'Computed polygon area vs declared area, geotag distance delta (meters), sampled video keyframes.',
      officerAction: 'Verify floor-plan polygon trace, flag missing geotags, request physical inspection if area shortfall exceeds tolerance.',
    },
    {
      code: 'Module E',
      name: 'Centralized Officer Workstation & Audit',
      whatItChecks: 'Role-based access permissions, supersede-only records, idempotency keys, append-only tamper-evident hash chain.',
      evidenceReturned: 'Full chronological audit event trail with SHA-256 chain-head digests, externally published checkpoint reference.',
      officerAction: 'Record final regulatory statutory decision with mandatory rationale, export injection-safe CSV/PDF report.',
    },
    {
      code: 'Module F',
      name: 'Cross-Application Pattern Detection (Phase 4)',
      whatItChecks: 'Longitudinal document reuse across unrelated institutions, faculty identity overlap over academic cycles.',
      evidenceReturned: 'Entity relationship correlation graph, shared document hashes, overlapping tenure dates.',
      officerAction: 'Review prioritized fraud risk candidates with explainable match features before granting approval.',
    },
  ];

  const [selectedModule, setSelectedModule] = useState<ModuleDetail>(modules[0]);

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">06 —</span>
          <span>Functional Architecture · Module Map A–F</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'मॉड्यूल मानचित्र: समस्या विवरण का संपूर्ण कवरेज'
            : 'Six core modules spanning the full SIH scope.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Click any module to inspect what was checked, the evidence returned, and the guided officer action.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {modules.map((m) => {
              const isSelected = selectedModule.code === m.code;
              return (
                <button
                  key={m.code}
                  onClick={() => setSelectedModule(m)}
                  className={`w-full text-left p-4 border transition-colors flex items-center justify-between font-mono text-xs ${
                    isSelected
                      ? 'border-ink bg-bone/40 font-bold text-ink'
                      : 'border-hairline hover:bg-bone/20 text-slate hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="block text-[10px] uppercase text-slate">{m.code}</span>
                    <span className="text-sm font-sans font-semibold mt-0.5">{m.name}</span>
                  </div>
                  <span className="text-slate font-mono text-sm">→</span>
                </button>
              );
            })}
          </div>

          {/* Module Drilldown Detail Card */}
          <div className="lg:col-span-7 bg-paper border border-hairline p-8 shadow-lifted font-mono text-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="font-bold text-base text-ink uppercase">
                {selectedModule.code} · Deep Dive
              </span>
              <span className="px-2 py-0.5 bg-bone border border-hairline text-[10px] text-slate">
                Traceable to SIH 26261
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate uppercase block mb-1">
                01 — What It Checks
              </span>
              <p className="font-sans text-sm text-ink leading-relaxed">
                {selectedModule.whatItChecks}
              </p>
            </div>

            <div className="p-4 bg-bone/20 border border-hairline">
              <span className="text-[10px] text-slate uppercase block mb-1">
                02 — Evidence Returned To Ledger
              </span>
              <p className="font-sans text-xs text-slate leading-relaxed">
                {selectedModule.evidenceReturned}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate uppercase block mb-1">
                03 — How The Officer Uses It
              </span>
              <p className="font-sans text-xs text-ink leading-relaxed">
                {selectedModule.officerAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
