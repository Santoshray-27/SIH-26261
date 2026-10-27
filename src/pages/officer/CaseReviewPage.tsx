import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import {
  Application,
  DocumentItem,
  Finding,
  VerificationResult,
  ExtractedField,
  CheckRun,
  AuditEvent,
} from '../../types/domain';
import { defaultReadinessProfile } from '../../data/readinessProfile';
import { evaluateEvidenceSufficiency, GateEvaluationOutput } from '../../services/gate';

import { ThreeLayerPanel } from '../../features/officer/components/ThreeLayerPanel';
import { CaseCoverageStatement } from '../../features/officer/components/CaseCoverageStatement';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Drawer } from '../../components/ui/Drawer';
import { useI18n } from '../../i18n/useI18n';
import { useAppStore } from '../../store/useAppStore';

import {
  ChevronRight,
  GitCompare,
} from 'lucide-react';

export const CaseReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useI18n();
  const { addToast } = useAppStore();

  const [application, setApplication] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([]);
  const [checkRuns, setCheckRuns] = useState<CheckRun[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);

  // Version selection & diff state
  const [selectedVersion, setSelectedVersion] = useState<'VER-8801-1' | 'VER-8801-2'>('VER-8801-1');
  const [activeTab, setActiveTab] = useState('findings');
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

  // Field editing state (for officer correction)
  const [editingField, setEditingField] = useState<ExtractedField | null>(null);
  const [correctionValue, setCorrectionValue] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');

  useEffect(() => {
    if (!id) return;
    api.getApplicationById(id).then(setApplication);
    api.getDocumentsByApplicationId(id).then(setDocuments);
    api.getAllExtractedFieldsByApplicationId(id).then(setExtractedFields);
    api.getCheckRunsByApplicationId(id).then(setCheckRuns);
    api.getVerificationResults(id).then(setVerifications);
    api.getAuditTrail(id).then(setAuditEvents);
  }, [id]);

  // Load findings corresponding to version
  useEffect(() => {
    if (!id) return;
    api.getFindingsByApplicationId(id, selectedVersion).then(setFindings);
  }, [id, selectedVersion]);

  // Pure Evidence Sufficiency Gate evaluation (§3.4)
  const gateOutput: GateEvaluationOutput | null = useMemo(() => {
    if (!application) return null;
    return evaluateEvidenceSufficiency({
      applicationId: application.id,
      versionId: selectedVersion,
      categoryChecksExpectedTotal: 11,
      checkRuns,
      extractedFields,
      findings,
      verificationResults: verifications,
      readinessProfile: defaultReadinessProfile,
    });
  }, [application, selectedVersion, checkRuns, extractedFields, findings, verifications]);

  // Check result counts
  const checkSummary = useMemo(() => {
    const passed = checkRuns.filter((c) => c.status === 'PASS' || c.status === 'SIGNATURE_VALID').length;
    const failedOrDeficient = findings.filter(
      (f) => f.status === 'DEFICIENCY_FOUND' || f.status === 'MISMATCH_FOUND' || f.status === 'POSSIBLE_DUPLICATE'
    ).length;
    const unavailableOrPending = verifications.filter(
      (v) => v.status === 'SOURCE_UNAVAILABLE' || v.status === 'VERIFICATION_PENDING'
    ).length;
    return { passed, failedOrDeficient, unavailableOrPending };
  }, [checkRuns, findings, verifications]);

  // Grouped findings by class (§3.6)
  const groupedFindings = useMemo(() => {
    const rectifiable = findings.filter((f) => f.findingClass === 'rectifiable_gap');
    const integrity = findings.filter((f) => f.findingClass === 'integrity_concern');
    const unverifiable = findings.filter((f) => f.findingClass === 'unverifiable_item');
    return { rectifiable, integrity, unverifiable };
  }, [findings]);

  if (!application) {
    return (
      <div className="p-8 font-mono text-sm text-slate animate-pulse bg-ink-dark">
        {t.common.loading}
      </div>
    );
  }

  return (
    <div className="space-y-6 text-paper bg-ink-dark min-h-screen">
      {/* Editorial Header with Version Selector & Findings Diff Indicator */}
      <div className="border-b border-hairline pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-slate mb-1">
            <Link to="/officer" className="hover:underline text-paper">
              Officer Workstation
            </Link>
            <ChevronRight size={12} />
            <span>{application.id}</span>
            <span>·</span>
            <span className="text-paper font-bold">{selectedVersion === 'VER-8801-1' ? 'v1 (Initial)' : 'v2 (Resubmitted)'}</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-4xl tracking-tight text-paper">
            {language === 'hi' && application.institutionNameHi
              ? application.institutionNameHi
              : application.institutionName}
          </h1>
          <p className="font-mono text-xs text-slate mt-1">
            {application.category.replace(/_/g, ' ')} · Ref Date: {application.referenceDate} · Status: {application.currentState}
          </p>
        </div>

        {/* Version Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-hairline bg-ink-surface rounded-xs p-1 font-mono text-xs">
            <span className="text-[10px] text-slate uppercase px-2">Dossier Version:</span>
            <button
              onClick={() => setSelectedVersion('VER-8801-1')}
              className={`px-3 py-1 font-bold transition-colors ${
                selectedVersion === 'VER-8801-1'
                  ? 'bg-paper text-ink rounded-xs'
                  : 'text-slate hover:text-paper'
              }`}
            >
              v1 (Original)
            </button>
            <button
              onClick={() => setSelectedVersion('VER-8801-2')}
              className={`px-3 py-1 font-bold transition-colors flex items-center gap-1 ${
                selectedVersion === 'VER-8801-2'
                  ? 'bg-paper text-ink rounded-xs'
                  : 'text-slate hover:text-paper'
              }`}
            >
              <span>v2 (Resubmission)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-verdigris" />
            </button>
          </div>

          <Link to={`/officer/cases/${application.id}/review`}>
            <Button
              variant="outline"
              size="sm"
              className="border-ochre/40 text-ochre hover:bg-ochre/10"
            >
              Adjudicate Findings (1-by-1)
            </Button>
          </Link>

          <Link to={`/officer/cases/${application.id}/replay`}>
            <Button
              variant="outline"
              size="sm"
            >
              Run Decision Replay
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            isWritingAction
            onClick={() => addToast('Notice draft generation initiated for rectifiable findings', 'info')}
          >
            Draft Rectification Notice
          </Button>
        </div>
      </div>

      {/* Version-to-Version Diff Banner */}
      {selectedVersion === 'VER-8801-2' && (
        <div className="border border-verdigris/40 bg-verdigris/10 p-3.5 font-mono text-xs flex items-center justify-between text-paper">
          <div className="flex items-center gap-2">
            <GitCompare size={15} className="text-verdigris" />
            <span className="font-bold text-verdigris">Version-to-Version Diff (v1 → v2):</span>
            <span className="text-slate">
              Accreditation validity deficiency <strong>FIND-8801-01 resolved</strong> via verified acknowledgment receipt. Title mismatch persists.
            </span>
          </div>
          <span className="text-[10px] uppercase text-verdigris font-semibold">Differential Re-Check Active</span>
        </div>
      )}

      {/* THREE LAYER PANEL: Check Result | Evidence Sufficiency | Officer Decision */}
      <ThreeLayerPanel
        checkResultsSummary={checkSummary}
        gateOutput={gateOutput}
        officerDecision={{
          state: application.currentState,
          assignedOfficer: application.assignedReviewerName || 'Unassigned',
        }}
      />

      {/* CASE COVERAGE STATEMENT: 9 of 11 mandatory checks ran */}
      <CaseCoverageStatement checkRuns={checkRuns} totalExpected={11} />

      {/* MAIN TABS */}
      <Tabs
        tabs={[
          { id: 'findings', label: 'Findings by Class', badge: findings.length },
          { id: 'documents', label: 'Documents & Field Provenance', badge: documents.length },
          { id: 'adapters', label: 'Source Results (Live/Simulated)', badge: verifications.length },
          { id: 'timeline', label: 'Audit Timeline', badge: auditEvents.length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: FINDINGS GROUPED BY CLASS (§3.6) */}
      {activeTab === 'findings' && (
        <div className="space-y-6 font-mono text-xs">
          {/* Class 1: Rectifiable Gaps */}
          <div className="border border-hairline bg-ink-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-vermilion" />
                <span className="font-bold uppercase tracking-wider text-paper text-sm">
                  Rectifiable Gaps ({groupedFindings.rectifiable.length})
                </span>
              </div>
              <span className="text-[10px] text-slate uppercase">
                Feeds Auto-Drafted Rectification Notice (§3.6)
              </span>
            </div>

            <div className="space-y-3">
              {groupedFindings.rectifiable.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 border border-hairline bg-ink-dark/60 flex flex-col justify-between gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <StatusPill status={f.status} size="sm" />
                      <span className="font-bold text-paper">{f.id}</span>
                      <span className="text-slate text-[10px]">Rule: {f.ruleId}</span>
                    </div>
                    {f.resolvedAt && (
                      <span className="text-[10px] text-verdigris font-semibold">
                        Resolved on {f.resolvedAt} by {f.resolvedBy}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs text-paper/90 leading-relaxed">
                    {language === 'hi' && f.explanationHi ? f.explanationHi : f.explanation}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-hairline/40 text-[11px] text-slate">
                    <span>Evidence: {f.evidenceReferences.documentName || 'N/A'}</span>
                    <button
                      onClick={() => setSelectedFinding(f)}
                      className="font-bold text-paper hover:text-ochre underline"
                    >
                      Inspect Finding & Actions →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class 2: Integrity Concerns (Route to Senior Officer Review) */}
          <div className="border border-hairline bg-ink-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-vermilion animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-vermilion text-sm">
                  Integrity Concerns ({groupedFindings.integrity.length})
                </span>
              </div>
              <span className="text-[10px] text-vermilion font-bold uppercase px-2 py-0.5 border border-vermilion/40 bg-vermilion/10">
                Routes to Senior Officer Review (§3.6)
              </span>
            </div>

            <div className="space-y-3">
              {groupedFindings.integrity.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 border border-vermilion/30 bg-vermilion/5 flex flex-col justify-between gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <StatusPill status={f.status} size="sm" />
                      <span className="font-bold text-paper">{f.id}</span>
                      <span className="text-slate text-[10px]">Rule: {f.ruleId}</span>
                    </div>
                    <span className="text-[10px] text-vermilion font-semibold uppercase">
                      Integrity Signal · Requires Vigilance Audit
                    </span>
                  </div>

                  <p className="font-sans text-xs text-paper/90 leading-relaxed">
                    {language === 'hi' && f.explanationHi ? f.explanationHi : f.explanation}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-hairline/40 text-[11px] text-slate">
                    <span className="truncate max-w-md">
                      Evidence: {f.evidenceReferences.documentName} ({f.evidenceReferences.rawField})
                    </span>
                    <button
                      onClick={() => setSelectedFinding(f)}
                      className="font-bold text-vermilion hover:underline"
                    >
                      Inspect Evidence & Escalate →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class 3: Unverifiable Items */}
          <div className="border border-hairline bg-ink-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate" />
                <span className="font-bold uppercase tracking-wider text-paper text-sm">
                  Unverifiable Items ({groupedFindings.unverifiable.length})
                </span>
              </div>
              <span className="text-[10px] text-slate uppercase">
                Stay listed in Coverage Statement · Neither Pass nor Fail (§3.6)
              </span>
            </div>

            <div className="space-y-3">
              {groupedFindings.unverifiable.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 border border-hairline bg-ink-dark/60 flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusPill status={f.status} size="sm" />
                      <span className="font-bold text-paper">{f.id}</span>
                    </div>
                    <span className="text-[10px] text-slate">{f.ruleId}</span>
                  </div>

                  <p className="font-sans text-xs text-slate leading-relaxed">
                    {language === 'hi' && f.explanationHi ? f.explanationHi : f.explanation}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-hairline/40 text-[11px] text-slate">
                    <span>Evidence: {f.evidenceReferences.documentName || 'External API'}</span>
                    <button
                      onClick={() => setSelectedFinding(f)}
                      className="font-bold text-paper hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENTS & EXTRACTED FIELDS TABLE (PROVENANCE) */}
      {activeTab === 'documents' && (
        <div className="space-y-6 font-mono text-xs">
          {/* Preserved Documents Table */}
          <div className="border border-hairline bg-ink-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
              <span className="font-bold text-paper text-sm uppercase">Preserved Document Registry</span>
              <span className="text-[10px] text-slate uppercase">Original Bytes Tamper-Evident</span>
            </div>

            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-ink-dark text-slate uppercase text-[10px] border-b border-hairline">
                <tr>
                  <th className="p-3">Doc Type</th>
                  <th className="p-3">Filename</th>
                  <th className="p-3">SHA-256 Digest</th>
                  <th className="p-3">Digital Signature</th>
                  <th className="p-3">Byte Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-ink-dark/60">
                    <td className="p-3 font-semibold text-paper">{doc.documentType}</td>
                    <td className="p-3 text-slate">{doc.originalFilename}</td>
                    <td className="p-3 text-[10px] text-slate font-mono truncate max-w-xs">{doc.sha256}</td>
                    <td className="p-3">
                      {doc.digitalSignatureStatus ? (
                        <StatusPill status={doc.digitalSignatureStatus} size="sm" />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="p-3 text-slate">{(doc.byteSize / 1024).toFixed(1)} KB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Extracted Fields Table with Page/Region & Provenance Correction */}
          <div className="border border-hairline bg-ink-surface p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
              <span className="font-bold text-paper text-sm uppercase">
                Extracted Fields & OCR Provenance
              </span>
              <span className="text-[10px] text-slate uppercase">
                Reviewer Corrections Recorded as Superseding Records (§3.10)
              </span>
            </div>

            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-ink-dark text-slate uppercase text-[10px] border-b border-hairline">
                <tr>
                  <th className="p-3">Field Name</th>
                  <th className="p-3">Raw Value</th>
                  <th className="p-3">Normalized Value</th>
                  <th className="p-3">Conf</th>
                  <th className="p-3">Page / Region BBox</th>
                  <th className="p-3">Correction Provenance</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {extractedFields.map((field) => (
                  <tr key={field.id} className="hover:bg-ink-dark/60">
                    <td className="p-3 font-semibold text-paper">
                      <code>{field.fieldName}</code>
                      {field.isCritical && (
                        <span className="block text-[9px] uppercase text-ochre font-bold">Critical</span>
                      )}
                    </td>
                    <td className="p-3 text-slate font-sans">{field.rawValue}</td>
                    <td className="p-3 text-paper font-sans">
                      {field.reviewerCorrectedValue ? (
                        <span className="line-through text-slate block">{field.normalizedValue}</span>
                      ) : (
                        field.normalizedValue
                      )}
                      {field.reviewerCorrectedValue && (
                        <span className="text-verdigris font-bold block">{field.reviewerCorrectedValue}</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-bold ${
                          field.confidence >= 0.85
                            ? 'text-verdigris'
                            : field.confidence >= 0.70
                            ? 'text-ochre'
                            : 'text-vermilion'
                        }`}
                      >
                        {(field.confidence * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="p-3 text-slate text-[10px]">
                      Page {field.page || 1} [{field.regionBbox?.join(', ')}]
                    </td>
                    <td className="p-3 text-[10px] text-slate">
                      {field.correctionProvenance ? (
                        <span className="text-verdigris font-semibold">
                          Corrected by {field.correctionProvenance.officerId} ({field.correctionReason})
                        </span>
                      ) : (
                        <span>Original OCR</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        isWritingAction
                        onClick={() => {
                          setEditingField(field);
                          setCorrectionValue(field.reviewerCorrectedValue || field.rawValue);
                          setCorrectionReason('');
                        }}
                      >
                        Correct
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SOURCE RESULTS (LIVE / SANDBOX / SIMULATED) */}
      {activeTab === 'adapters' && (
        <div className="space-y-4 font-mono text-xs">
          {verifications.map((v) => (
            <div key={v.id} className="border border-hairline bg-ink-surface p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-paper text-sm">{v.sourceAdapterId}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs border ${
                      v.sourceEnvironment === 'LIVE'
                        ? 'border-verdigris text-verdigris bg-verdigris/10'
                        : v.sourceEnvironment === 'SANDBOX'
                        ? 'border-indigo text-indigo-light bg-indigo/20'
                        : 'border-ochre text-ochre bg-ochre/10'
                    }`}
                  >
                    {v.sourceEnvironment} Environment (§14)
                  </span>
                </div>
                <StatusPill status={v.status} size="sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate">
                <div>Method: <strong className="text-paper">{v.verificationMethod}</strong></div>
                <div>Timestamp: <strong className="text-paper">{v.timestamp}</strong></div>
                <div>Status: <strong className="text-paper">{v.status}</strong></div>
              </div>

              {v.limitationsNote && (
                <div className="p-2 border border-dashed border-hairline/60 bg-ink-dark/60 text-ochre text-[11px]">
                  <strong>Evidence Limitation:</strong> {v.limitationsNote}
                </div>
              )}

              <pre className="bg-ink-dark p-3 text-[11px] text-paper/80 border border-hairline/60 overflow-x-auto">
                {JSON.stringify(v.returnedFields, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: AUDIT TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="border border-hairline bg-ink-surface p-4 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
            <span className="font-bold text-paper text-sm uppercase">Tamper-Evident Chronological Audit</span>
            <span className="text-[10px] text-verdigris font-semibold">Hash Chain Linked</span>
          </div>

          <div className="space-y-4">
            {auditEvents.map((ev) => (
              <div key={ev.id} className="border-l-2 border-l-paper pl-3 py-1 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate">
                  <span className="font-bold text-paper uppercase">{ev.eventType}</span>
                  <span>{ev.timestamp}</span>
                </div>
                <div className="text-slate">
                  Actor: <strong className="text-paper">{ev.actorName}</strong> ({ev.actorRole})
                </div>
                <div className="bg-ink-dark p-2 border border-hairline/60 text-[10px] text-slate truncate">
                  Digest: <code>{ev.eventHash}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVIDENCE DETAIL / ESCALATION DRAWER */}
      {selectedFinding && (
        <Drawer
          isOpen={!!selectedFinding}
          onClose={() => setSelectedFinding(null)}
          title={`Evidence Drilldown · ${selectedFinding.id}`}
          subtitle={`Rule Reference: ${selectedFinding.ruleId}`}
        >
          <div className="space-y-6 font-mono text-xs text-paper">
            <div>
              <span className="text-[10px] uppercase text-slate block mb-1">
                Finding Status & Statutory Classification
              </span>
              <div className="flex gap-2 items-center">
                <StatusPill status={selectedFinding.status} size="md" />
                <span className="px-2 py-0.5 bg-ink-dark border border-hairline uppercase text-slate">
                  {selectedFinding.findingClass.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div className="border border-hairline p-4 bg-ink-dark/60">
              <span className="text-[10px] uppercase text-slate block mb-1">Finding Explanation</span>
              <p className="font-sans text-sm text-paper leading-relaxed">
                {language === 'hi' && selectedFinding.explanationHi
                  ? selectedFinding.explanationHi
                  : selectedFinding.explanation}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase text-slate block">Compared Fact Records</span>
              <div className="border border-hairline p-3 bg-ink-surface">
                <span className="text-[10px] text-slate block uppercase">Extracted Raw Evidence Value</span>
                <p className="font-bold text-sm mt-0.5 break-all text-paper">
                  {selectedFinding.evidenceReferences.rawValue || 'N/A'}
                </p>
              </div>

              <div className="border border-hairline p-3 bg-ink-surface">
                <span className="text-[10px] text-slate block uppercase">Regulatory Reference Target</span>
                <p className="font-bold text-sm mt-0.5 break-all text-paper">
                  {selectedFinding.evidenceReferences.comparedValue || 'N/A'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline flex flex-col gap-2">
              <Button
                variant="primary"
                isWritingAction
                onClick={() => {
                  api.recordReviewerAction({
                    applicationId: application.id,
                    versionId: selectedVersion,
                    findingId: selectedFinding.id,
                    actorId: 'REV-042',
                    actorName: 'Dr. R. K. Sharma (Reviewer)',
                    actorRole: 'officer',
                    action: 'RESOLVE_DEFICIENCY',
                    rationale: 'Reviewer confirmed rectification evidence validated against authority record.',
                  });
                  addToast(`Deficiency ${selectedFinding.id} resolved with written statutory rationale logged.`, 'success');
                  setSelectedFinding(null);
                }}
              >
                Resolve Deficiency (Officer Action)
              </Button>

              <Button
                variant="danger"
                isWritingAction
                onClick={() => {
                  api.recordReviewerAction({
                    applicationId: application.id,
                    versionId: selectedVersion,
                    findingId: selectedFinding.id,
                    actorId: 'REV-042',
                    actorName: 'Dr. R. K. Sharma (Reviewer)',
                    actorRole: 'officer',
                    action: 'ESCALATE_FRAUD',
                    rationale: 'Integrity concern escalated to Senior Regulatory Bureau & Vigilance Division.',
                  });
                  addToast(`Integrity concern ${selectedFinding.id} escalated to Senior Officer Review.`, 'error');
                  setSelectedFinding(null);
                }}
              >
                Escalate Integrity Concern
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* OFFICER EXTRACTION CORRECTION MODAL/DRAWER */}
      {editingField && (
        <Drawer
          isOpen={!!editingField}
          onClose={() => setEditingField(null)}
          title={`Correct Extracted Field · ${editingField.fieldName}`}
          subtitle="Reviewer correction creates superseding record (§3.10)"
        >
          <div className="space-y-4 font-mono text-xs text-paper">
            <div className="p-3 border border-hairline bg-ink-dark">
              <span className="text-[10px] text-slate uppercase block">Raw OCR Value</span>
              <p className="font-bold text-sm mt-0.5 text-paper">{editingField.rawValue}</p>
            </div>

            <div>
              <label className="text-[10px] text-slate uppercase block mb-1">
                Corrected Normalized Value (Officer Override)
              </label>
              <input
                type="text"
                value={correctionValue}
                onChange={(e) => setCorrectionValue(e.target.value)}
                className="w-full p-2.5 bg-ink-dark border border-hairline text-paper focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate uppercase block mb-1">
                Correction Rationale (Mandatory for Audit Trail)
              </label>
              <textarea
                value={correctionReason}
                onChange={(e) => setCorrectionReason(e.target.value)}
                rows={3}
                placeholder="State reason (e.g. OCR misread diacritical character on stamp deed)..."
                className="w-full p-2.5 bg-ink-dark border border-hairline text-paper focus:outline-none font-sans"
              />
            </div>

            <div className="pt-3 border-t border-hairline flex gap-2">
              <Button
                variant="primary"
                isWritingAction
                onClick={async () => {
                  if (!correctionReason.trim()) {
                    addToast('Correction reason is mandatory for regulatory audit compliance.', 'error');
                    return;
                  }
                  await api.correctExtractedField(
                    editingField.id,
                    correctionValue,
                    correctionReason,
                    'REV-042'
                  );
                  addToast(`Field ${editingField.fieldName} corrected. Superseding record created.`, 'success');
                  setEditingField(null);
                  api.getAllExtractedFieldsByApplicationId(application.id).then(setExtractedFields);
                }}
              >
                Save Superseding Correction
              </Button>
              <Button variant="outline" onClick={() => setEditingField(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
