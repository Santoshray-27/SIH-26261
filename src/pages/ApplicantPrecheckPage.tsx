import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusPill } from '../components/ui/StatusPill';
import { useAppStore } from '../store/useAppStore';
import { Upload } from 'lucide-react';

export const ApplicantPrecheckPage: React.FC = () => {
  const { addToast } = useAppStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const runSimulatedPrecheck = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setHasResult(true);
      addToast('Applicant pre-check complete. 1 deficiency caught prior to submission.', 'info');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-b border-hairline pb-6 mb-8 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-slate">
          Embeddable Pre-Check Widget · §1
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight mt-2">
          Applicant Instant Pre-Submission Validation
        </h1>
        <p className="font-sans text-sm text-slate mt-2 max-w-xl mx-auto">
          Moves compliance checking to the earliest stage. Catch fixable gaps like expired certificates
          or title discrepancies before submitting to AICTE officers.
        </p>
      </div>

      <Card variant="editorial" sectionNumber="INTAKE">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-hairline p-8 text-center rounded-xs bg-bone/20 hover:border-ink transition-colors cursor-pointer">
            <Upload size={32} strokeWidth={1.25} className="mx-auto text-slate mb-3" />
            <h4 className="font-display font-bold text-lg mb-1">
              Select or Drop AICTE Compliance Dossier
            </h4>
            <p className="font-mono text-xs text-slate">
              Upload PDF Affidavit, State NOC, or NBA Accreditation Certificate (Max 25MB)
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              disabled={analyzing}
              onClick={runSimulatedPrecheck}
            >
              {analyzing ? 'Evaluating Deterministic Rules...' : 'Run Pre-Check Validation'}
            </Button>
          </div>

          {hasResult && (
            <div className="mt-8 pt-6 border-t border-hairline space-y-4 font-mono text-xs animate-in fade-in">
              <div className="flex items-center justify-between p-3 bg-bone/30 border border-hairline">
                <span className="font-bold">Accreditation Validity Check</span>
                <StatusPill status="DEFICIENCY_FOUND" size="sm" />
              </div>

              <div className="p-4 bg-vermilion-light/40 border border-vermilion text-slate">
                <span className="font-bold text-vermilion uppercase block mb-1">
                  Deficiency Caught Early (§3.6 Rectifiable Gap)
                </span>
                <p className="font-sans text-xs text-ink leading-relaxed">
                  Your uploaded NBA certificate expired on 2025-12-31. The 2026-27 Approval Process Handbook
                  mandates validity through June 30, 2026. Please attach your renewal acknowledgment receipt
                  before final submission to prevent processing delays.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-bone/30 border border-hairline">
                <span className="font-bold">Exact SHA-256 Duplicate Check</span>
                <StatusPill status="PASS" size="sm" />
              </div>

              <div className="flex items-center justify-between p-3 bg-bone/30 border border-hairline">
                <span className="font-bold">Digital Signature Cryptographic Integrity</span>
                <StatusPill status="SIGNATURE_VALID" size="sm" />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
