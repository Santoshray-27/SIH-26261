import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StatusPill } from '../components/ui/StatusPill';
import {
  Mail,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  GitCompare,
  RefreshCw,
} from 'lucide-react';

interface CheckDiff {
  id: string;
  name: string;
  isAffected: boolean;
  v1Status: 'DEFICIENCY_FOUND' | 'PASS' | 'SOURCE_UNAVAILABLE';
  v2Status?: 'PASS' | 'DEFICIENCY_FOUND' | 'SOURCE_UNAVAILABLE';
  reCheckReason: string;
}

export const ApplicantRectificationPage: React.FC = () => {
  const { id = 'APP-2026-8801' } = useParams<{ id: string }>();

  // State machine: NOTICE_VIEW -> UPLOAD_PENDING -> RECHECKING -> RESOLVED
  const [stage, setStage] = useState<'NOTICE_VIEW' | 'UPLOAD_PENDING' | 'RECHECKING' | 'RESOLVED'>('NOTICE_VIEW');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recheckProgress, setRecheckProgress] = useState<number>(0);

  // Mock approved statutory notice
  const notice = {
    id: 'NOT-8801-01',
    applicationId: id,
    versionId: 'VER-8801-1',
    sentDate: '2026-03-14',
    deadlineDate: '2026-03-21',
    responsePeriodDays: 7,
    approver: 'Dr. R. K. Sharma (Reviewer)',
    subject: 'Statutory Deficiency Notice: Expired NBA Accreditation Certificate (RULE-APH-2.4-EXPIRY)',
    bodyContent: `Reference is made to your Extension of Approval application ${id} for AY 2026-27.
During automated compliance verification, your NBA Tier-II Accreditation Certificate was determined to have expired on 31-12-2025, prior to the council cutoff date of 30-06-2026.

Under Chapter II, Clause 2.8 of the AICTE Approval Process Handbook, you are granted 7 working days to upload a valid NBA renewal acknowledgment receipt or valid accreditation letter.`,
  };

  // Re-check rule definitions demonstrating differential execution
  const [checks, setChecks] = useState<CheckDiff[]>([
    {
      id: 'CR-8801-03',
      name: 'Accreditation Validity Threshold (RULE-APH-2.4-EXPIRY)',
      isAffected: true,
      v1Status: 'DEFICIENCY_FOUND',
      reCheckReason: 'INPUT DEPENDENT: Re-running against newly submitted renewal acknowledgment receipt.',
    },
    {
      id: 'CR-8801-04',
      name: 'Institutional Identity Concordance (RULE-APH-1.2-NAME-MATCH)',
      isAffected: false,
      v1Status: 'DEFICIENCY_FOUND',
      reCheckReason: 'SKIPPED: Affidavit unchanged in this submission package.',
    },
    {
      id: 'CR-8801-05',
      name: 'Cross-Application SHA-256 Check (RULE-AUTH-EXACT-HASH-DUP)',
      isAffected: false,
      v1Status: 'PASS',
      reCheckReason: 'SKIPPED: Land deed document unchanged.',
    },
    {
      id: 'CR-8801-06',
      name: 'Digital Signature Structure (RULE-AUTH-DIGITAL-SIGNATURE)',
      isAffected: true,
      v1Status: 'PASS',
      reCheckReason: 'INPUT DEPENDENT: Validating cryptographic signature on newly uploaded PDF.',
    },
    {
      id: 'CR-8801-07',
      name: 'State Land Registry Adapter Call',
      isAffected: false,
      v1Status: 'SOURCE_UNAVAILABLE',
      reCheckReason: 'SKIPPED: Independent external registry endpoint.',
    },
  ]);

  const handleSimulateUpload = () => {
    setStage('RECHECKING');
    setRecheckProgress(15);

    // Progressive animation of differential re-check
    setTimeout(() => setRecheckProgress(45), 600);
    setTimeout(() => setRecheckProgress(75), 1200);

    setTimeout(() => {
      setRecheckProgress(100);
      setChecks((prev) =>
        prev.map((c) =>
          c.id === 'CR-8801-03'
            ? { ...c, v2Status: 'PASS' }
            : c.id === 'CR-8801-06'
            ? { ...c, v2Status: 'PASS' }
            : c
        )
      );
      setStage('RESOLVED');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb & Header */}
        <div className="border-b border-border pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest mb-1">
              <span>Applicant Portal</span>
              <span>·</span>
              <span className="font-bold text-text">{id}</span>
              <span>·</span>
              <span className="text-st-deficiency font-bold">Rectification Flow</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-text">
              Statutory Rectification & Resubmission
            </h1>
            <p className="text-xs font-mono text-text-muted mt-1">
              Resolution of Rectifiable Gap · Prior Submission Preserved as Version 1
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-surface-2 text-text font-mono text-xs font-bold rounded">
              Dossier: Sri Vidya Institute of Technology
            </span>
          </div>
        </div>

        {/* Stage 1: Official Rectification Notice */}
        <div className="p-6 bg-white border border-border rounded shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-st-review" />
              <div>
                <span className="text-[10px] font-mono uppercase text-text-muted">
                  Approved Official Notice
                </span>
                <h3 className="text-base font-serif font-bold text-text">
                  {notice.id}
                </h3>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-text-muted block text-[10px]">Response Deadline:</span>
              <span className="font-bold text-st-deficiency">
                {notice.deadlineDate} ({notice.responsePeriodDays} Days Window)
              </span>
            </div>
          </div>

          <div className="p-4 bg-surface-2 border border-border rounded font-serif text-xs text-text leading-relaxed whitespace-pre-line">
            <div className="font-sans font-bold text-sm text-text mb-2">
              {notice.subject}
            </div>
            {notice.bodyContent}
            <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-text-muted flex justify-between">
              <span>Dispatched by: {notice.approver}</span>
              <span>Approved & Tamper-Evident</span>
            </div>
          </div>
        </div>

        {/* Stage 2: Upload Corrected Document */}
        {stage !== 'RESOLVED' && (
          <div className="p-6 bg-white border border-border rounded shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-text">
                  Upload Rectification Evidence
                </h3>
                <p className="text-xs font-mono text-text-muted">
                  Submitting a replacement file generates <strong className="text-text">Version 2</strong>.
                  Prior version (v1) remains immutably recorded in the audit ledger.
                </p>
              </div>

              <span className="px-2.5 py-1 bg-st-review-bg text-st-review border border-st-review/30 font-mono text-xs rounded font-bold">
                Awaiting Upload
              </span>
            </div>

            <div
              onClick={() => {
                setSelectedFile(
                  new File(['mock content'], 'NBA_Renewal_Acknowledgment_2026.pdf', {
                    type: 'application/pdf',
                  })
                );
              }}
              className="p-8 border-2 border-dashed border-border hover:border-border bg-surface-2 rounded cursor-pointer text-center transition-colors"
            >
              <UploadCloud className="w-10 h-10 text-text-muted mx-auto mb-2" />
              {selectedFile ? (
                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-st-pass">
                    Ready to Submit: {selectedFile.name}
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    Size: 420 KB · Type: PDF · Contains validity acknowledgment through 2027-06-30
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-text">
                    Click to select NBA Renewal Acknowledgment / Certificate
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    PDF format (Max 25MB)
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSimulateUpload}
                disabled={stage === 'RECHECKING'}
                className="px-6 py-2.5 bg-text hover:bg-surface-2 text-text font-mono text-xs rounded transition-colors flex items-center gap-2 shadow"
              >
                {stage === 'RECHECKING' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Differential Re-Check ({recheckProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Submit Rectification & Trigger Differential Re-Check</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stage 3: Differential Re-Check Animation & Findings Diff */}
        {(stage === 'RECHECKING' || stage === 'RESOLVED') && (
          <div className="p-6 bg-white border border-border rounded shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <GitCompare className="w-5 h-5 text-st-pass" />
                <div>
                  <h3 className="text-base font-serif font-bold text-text">
                    Differential Re-Check Execution Engine
                  </h3>
                  <p className="text-xs font-mono text-text-muted">
                    Solution §6: Only checks depending on newly uploaded document re-run. Unaffected checks are skipped.
                  </p>
                </div>
              </div>

              {stage === 'RESOLVED' ? (
                <StatusPill status="PASS" label="RE-CHECK COMPLETE (v2 GENERATED)" />
              ) : (
                <span className="font-mono text-xs text-st-review font-bold">
                  Evaluating {recheckProgress}%...
                </span>
              )}
            </div>

            {/* Recheck Progress Bar */}
            <div className="w-full bg-surface-2 h-2 rounded overflow-hidden">
              <div
                style={{ width: `${recheckProgress}%` }}
                className="h-full bg-st-pass transition-all duration-300"
              />
            </div>

            {/* Check Runs Matrix */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase text-text-muted tracking-wider">
                Differential Dependency Matrix
              </div>

              <div className="space-y-2">
                {checks.map((chk) => (
                  <div
                    key={chk.id}
                    className={`p-3.5 rounded border text-xs font-mono transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      chk.isAffected
                        ? 'bg-emerald-50/40 border-st-pass/30'
                        : 'bg-surface-2 border-border opacity-70'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text font-serif text-sm">
                          {chk.name}
                        </span>
                        {chk.isAffected ? (
                          <span className="px-1.5 py-0.5 bg-st-pass text-text font-mono text-[9px] rounded font-bold">
                            RE-EXECUTED
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-surface-2 text-text-muted font-mono text-[9px] rounded font-bold">
                            SKIPPED (PRISTINE)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {chk.reCheckReason}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-text-muted block">v1 Status</span>
                        <StatusPill status={chk.v1Status} size="sm" />
                      </div>

                      {chk.isAffected && chk.v2Status && (
                        <>
                          <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                          <div className="text-right">
                            <span className="text-[10px] text-st-pass font-bold block">v2 Status</span>
                            <StatusPill status={chk.v2Status} size="sm" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Diff Resolution Banner */}
            {stage === 'RESOLVED' && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded space-y-2">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-st-pass">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Rectification Confirmed: Version 2 Created Successfully</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Deficiency under <code className="font-mono text-text">RULE-APH-2.4-EXPIRY</code> resolved.
                  NBA accreditation validity extended to 2027-06-30. Your dossier has advanced to the officer triage queue
                  under Version 2.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">
                    Audit Fingerprint: <span className="text-text font-bold">SHA-256 (b72a...f910)</span>
                  </span>
                  <Link
                    to={`/officer/cases/${id}`}
                    className="text-st-pass font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Version 2 in Officer Console</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
