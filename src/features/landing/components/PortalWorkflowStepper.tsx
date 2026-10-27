import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortalWorkflowStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: '1. Intake & Pre-Check',
      subtitle: 'Deterministic offline compliance scan',
      details:
        'Applicants run deterministic pre-checks catching fixable deficiencies prior to statutory filing. The pre-check widget is style-isolated and suppresses vigilance flags.',
      actionLabel: 'Launch Pre-Check',
      actionTo: '/embed/precheck',
    },
    {
      id: 1,
      title: '2. Formal Submission',
      subtitle: 'Preserved SHA-256 byte registration',
      details:
        'Institutions upload sworn affidavits, land deeds, and accreditation certificates. Every byte is registered with immutable-provenance client hashes.',
      actionLabel: 'View Applications',
      actionTo: '/officer',
    },
    {
      id: 2,
      title: '3. Automated Checks',
      subtitle: 'Multi-signal forensic parsing',
      details:
        'Document layout analysis, font-mix detection, PAdES digital signature verification, Haversine geospatial math, and simulated issuer adapters execute in parallel.',
      actionLabel: 'Forensic Tools',
      actionTo: '/officer/tools',
    },
    {
      id: 3,
      title: '4. Evidence Sufficiency Gate',
      subtitle: 'Strict weakest limiting signal rule',
      details:
        'The Sufficiency Gate evaluates whether all mandatory handbook checks ran. No application proceeds to final decision if any mandatory signal is missing or unverifiable.',
      actionLabel: 'Sufficiency Rules',
      actionTo: '/officer/rules',
    },
    {
      id: 4,
      title: '5. Officer Adjudication',
      subtitle: 'Human decision with audit trail',
      details:
        'Officer reviews highlighted evidence bounding boxes, issues bilingual clarification notices, and signs off. Every correction creates a superseding audit event.',
      actionLabel: 'Open Review Workstation',
      actionTo: '/officer/cases/APP-2026-8801/review',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-surface-2 border-b border-border">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            End-To-End Procedure
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-text">
            How Sakshya‑I5 Validates Institutional Dossiers
          </h2>
          <p className="text-xs sm:text-sm text-text-muted font-sans">
            A transparent 5-stage pipeline ensuring complete evidence sufficiency before human statutory adjudication.
          </p>
        </div>

        {/* 5-Step Stepper Cards (Horizontal on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step) => {
            const isSelected = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-surface border-accent-2 shadow-md ring-2 ring-accent-2/20'
                    : 'bg-surface/80 border-border hover:bg-surface hover:border-border-strong'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-accent-2 text-surface' : 'bg-surface-2 text-text-muted'
                      }`}
                    >
                      {step.id + 1}
                    </span>
                    {isSelected && <CheckCircle2 size={15} className="text-accent-2" />}
                  </div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-text leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-text-muted font-sans leading-tight">
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-3 text-[10px] font-mono uppercase text-accent-2 font-semibold flex items-center gap-1">
                  <span>{isSelected ? 'Active Step' : 'Click to View'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Details Card for Selected Step */}
        <div className="bg-surface border border-border rounded-md p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-tint-teal text-accent-2 border border-accent-2/30 rounded-xs">
                STAGE {steps[activeStep].id + 1} SPECIFICATION
              </span>
              <h4 className="font-serif font-bold text-base text-text">
                {steps[activeStep].title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              {steps[activeStep].details}
            </p>
          </div>

          <Link
            to={steps[activeStep].actionTo}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-2 text-surface font-sans text-xs font-semibold rounded-xs shadow-subtle hover:bg-nav-hover transition-colors shrink-0 self-start md:self-center"
          >
            <span>{steps[activeStep].actionLabel}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};
