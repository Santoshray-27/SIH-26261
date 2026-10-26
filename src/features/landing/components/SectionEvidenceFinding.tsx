import React, { useState } from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { useI18n } from '../../../i18n/useI18n';

export const SectionEvidenceFinding: React.FC = () => {
  const { language } = useI18n();
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-bone/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">03 —</span>
          <span>Pinned Scene · Evidence-Linked Finding</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'साक्ष्य से बंधा हुआ निष्कर्ष'
            : 'Every finding anchored in raw evidence.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Bounding box coordinates extract source text with confidence scores. Findings link
          directly to the governing clause and rule version used at processing time.
        </p>

        {/* Interactive Step Switcher */}
        <div className="flex gap-2 mb-8 font-mono text-xs">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`px-4 py-2 border transition-colors ${
                activeStep === step
                  ? 'bg-ink text-paper border-ink font-semibold'
                  : 'bg-paper text-slate border-hairline hover:text-ink'
              }`}
            >
              Step 0{step} {step === 1 ? '— Raw Document' : step === 2 ? '— Bounding Box' : '— Rule Clause & Status'}
            </button>
          ))}
        </div>

        {/* Visual Synthetic Affidavit & Leader Lines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Document Canvas Column */}
          <div className="lg:col-span-7 bg-paper border border-hairline p-8 shadow-lifted relative font-serif text-ink text-xs leading-relaxed select-none">
            <div className="text-center font-bold uppercase tracking-widest border-b border-hairline pb-4 mb-6 font-mono text-xs">
              AFFIDAVIT ON NON-JUDICIAL STAMP PAPER (SYNTHETIC)
            </div>

            <p className="mb-4">
              I, the Chairman of the sponsoring trust, solemnly affirm that the institutional
              premises situated at Sy No. 42/A complies with AICTE Approval Process Handbook norms.
            </p>

            {/* Bounding Box 1: Institution Title */}
            <div
              className={`relative p-2.5 my-3 border-2 transition-all duration-300 ${
                activeStep >= 2
                  ? 'border-vermilion bg-vermilion-light/20'
                  : 'border-transparent'
              }`}
            >
              {activeStep >= 2 && (
                <span className="absolute -top-3 left-2 bg-vermilion text-white font-mono text-[9px] px-1.5 py-0.2 uppercase font-semibold">
                  OCR: Conf 0.94 · Page 1 · [120, 45, 140, 310]
                </span>
              )}
              <span className="font-mono font-bold text-sm block">
                Name of Institution: Sri Vidya Inst of Technology
              </span>
            </div>

            <p className="mb-4">
              The said institution holds valid accreditation certificate under the National Board of
              Accreditation with registration reference NBA-2023-UG-ENG.
            </p>

            {/* Bounding Box 2: Expiry Date */}
            <div
              className={`relative p-2.5 my-3 border-2 transition-all duration-300 ${
                activeStep >= 2
                  ? 'border-ochre bg-ochre-light/20'
                  : 'border-transparent'
              }`}
            >
              {activeStep >= 2 && (
                <span className="absolute -top-3 left-2 bg-ochre text-white font-mono text-[9px] px-1.5 py-0.2 uppercase font-semibold">
                  OCR: Conf 0.98 · Page 1 · [240, 45, 260, 220]
                </span>
              )}
              <span className="font-mono font-bold text-sm block">
                Accreditation Expiry Date: 31-12-2025
              </span>
            </div>

            <div className="mt-8 pt-4 border-t border-hairline flex justify-between font-mono text-[10px] text-slate">
              <span>SHA-256: 9f86d081884c7d65...</span>
              <span>PKCS#7 DIGITAL SIGNATURE: VALID</span>
            </div>
          </div>

          {/* Linked Clause Card Column */}
          <div className="lg:col-span-5 space-y-4">
            {activeStep >= 2 ? (
              <div className="border-l-4 border-l-vermilion bg-paper border border-hairline p-6 shadow-subtle space-y-4 font-mono text-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-hairline">
                  <span className="font-bold uppercase tracking-wider text-slate">
                    Linked Finding FIND-8801-02
                  </span>
                  <StatusPill status="MISMATCH_FOUND" size="sm" />
                </div>

                <div>
                  <span className="text-[10px] text-slate uppercase block">Governing Rule</span>
                  <h4 className="font-sans font-bold text-base text-ink mt-0.5">
                    Institutional Identity Concordance
                  </h4>
                  <p className="text-slate text-[11px] mt-1 font-sans leading-relaxed">
                    APH Chapter I, Clause 1.2.4 mandates exact legal title identity across Affidavit,
                    State NOC, and Affiliating University NOC.
                  </p>
                </div>

                <div className="bg-bone/40 p-3 border border-hairline space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate">Rule Version:</span>
                    <span className="font-semibold text-ink">AICTE APH 2026.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Effective Date:</span>
                    <span className="font-semibold text-ink">2026-01-01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Finding Class:</span>
                    <span className="font-bold text-vermilion uppercase">Integrity Concern</span>
                  </div>
                </div>

                <div className="border border-dashed border-hairline p-3 font-sans text-xs text-slate">
                  <strong>Officer Review Guidance:</strong> Verify with state government register
                  or require a gazette notification for institutional name modification.
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-hairline text-center text-slate font-mono text-xs bg-paper/50">
                Click <strong>Step 02</strong> or <strong>Step 03</strong> above to view how leader lines
                link OCR bounding coordinates directly to regulatory clauses.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
