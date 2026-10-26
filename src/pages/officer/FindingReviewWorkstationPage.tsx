import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import {
  Application,
  DocumentItem,
  Finding,
  RuleDefinition,
  ExtractedField,
  RectificationNotice,
} from '../../types/domain';
import { DocViewer } from '../../features/officer/components/DocViewer';
import { ValueCompare } from '../../features/officer/components/ValueCompare';
import { ClauseCard } from '../../features/officer/components/ClauseCard';
import { NoticeDraft } from '../../features/officer/components/NoticeDraft';
import { EscalateModal } from '../../features/officer/components/EscalateModal';
import { CorrectValueDrawer } from '../../features/officer/components/CorrectValueDrawer';
import { ShortcutsModal } from '../../features/officer/components/ShortcutsModal';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  Mail,
  ShieldAlert,
  Edit3,
  Clock,
} from 'lucide-react';

export const FindingReviewWorkstationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentRole, addToast } = useAppStore();

  const isAuditor = currentRole === 'auditor';

  const [application, setApplication] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [rules, setRules] = useState<RuleDefinition[]>([]);
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Modals & Drawers state
  const [showNoticeDraft, setShowNoticeDraft] = useState<boolean>(false);
  const [showEscalateModal, setShowEscalateModal] = useState<boolean>(false);
  const [showCorrectDrawer, setShowCorrectDrawer] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);
  const [resolveRationale, setResolveRationale] = useState<string>('');

  // Load initial data
  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const [appData, docsData, findingsData, rulesData, fieldsData] = await Promise.all([
        api.getApplicationById(id),
        api.getDocumentsByApplicationId(id),
        api.getFindingsByApplicationId(id, 'VER-8801-1'),
        api.getRules(),
        api.getAllExtractedFieldsByApplicationId(id),
      ]);

      setApplication(appData);
      setDocuments(docsData);
      setFindings(findingsData);
      setRules(rulesData);
      setExtractedFields(fieldsData);
    } catch (err) {
      console.error('Failed to load review workstation data', err);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentFinding: Finding | undefined = findings[currentIndex];

  // Resolve linked entities for the active finding
  const linkedDocument = currentFinding
    ? documents.find((d) => d.id === currentFinding.evidenceReferences.documentId) || documents[0]
    : null;

  const linkedRule = currentFinding
    ? rules.find((r) => r.id === currentFinding.ruleId) || null
    : null;

  const linkedExtractedField = currentFinding
    ? extractedFields.find(
        (f) =>
          f.documentId === currentFinding.evidenceReferences.documentId ||
          f.rawValue === currentFinding.evidenceReferences.rawValue
      ) || extractedFields[0]
    : null;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < findings.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, findings.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Auditor Role 403 guard helper
  const guardAuditorAction = useCallback((): boolean => {
    if (isAuditor) {
      addToast('Read-only role (403)', 'error');
      return true;
    }
    return false;
  }, [isAuditor, addToast]);

  // Actions
  const handleOpenCorrect = useCallback(() => {
    if (guardAuditorAction()) return;
    setShowCorrectDrawer(true);
  }, [guardAuditorAction]);

  const handleOpenClarification = useCallback(() => {
    if (guardAuditorAction()) return;
    if (!currentFinding) return;

    if (currentFinding.findingClass === 'integrity_concern') {
      addToast(
        'Integrity concerns cannot generate applicant notices. Escalate to senior officer review.',
        'info'
      );
      setShowEscalateModal(true);
      return;
    }

    setShowNoticeDraft(true);
  }, [guardAuditorAction, currentFinding, addToast]);

  const handleOpenEscalate = useCallback(() => {
    if (guardAuditorAction()) return;
    setShowEscalateModal(true);
  }, [guardAuditorAction]);

  const handleOpenResolve = useCallback(() => {
    if (guardAuditorAction()) return;
    setShowResolveModal(true);
  }, [guardAuditorAction]);

  const handleToggleShortcuts = useCallback(() => {
    setShowShortcutsModal((prev) => !prev);
  }, []);

  // Keyboard navigation listener (J, K, C, R, X, E, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when typing into input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'j':
          e.preventDefault();
          handleNext();
          break;
        case 'k':
          e.preventDefault();
          handlePrev();
          break;
        case 'c':
          e.preventDefault();
          handleOpenCorrect();
          break;
        case 'r':
          e.preventDefault();
          handleOpenClarification();
          break;
        case 'x':
          e.preventDefault();
          handleOpenResolve();
          break;
        case 'e':
          e.preventDefault();
          handleOpenEscalate();
          break;
        case '?':
          e.preventDefault();
          handleToggleShortcuts();
          break;
        case 'escape':
          setShowNoticeDraft(false);
          setShowEscalateModal(false);
          setShowCorrectDrawer(false);
          setShowShortcutsModal(false);
          setShowResolveModal(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleNext,
    handlePrev,
    handleOpenCorrect,
    handleOpenClarification,
    handleOpenResolve,
    handleOpenEscalate,
    handleToggleShortcuts,
  ]);

  // Execute field correction
  const handleCorrectSubmit = async (fieldId: string, correctedValue: string, reason: string) => {
    try {
      await api.correctExtractedField(fieldId, correctedValue, reason, 'OFF-AICTE-042');
      await api.recordReviewerAction({
        applicationId: id || '',
        versionId: 'VER-8801-1',
        findingId: currentFinding?.id,
        actorId: 'OFF-AICTE-042',
        actorName: 'Dr. R. K. Sharma (Reviewer)',
        actorRole: currentRole,
        action: 'CORRECT_EXTRACTION',
        rationale: reason,
        beforeState: linkedExtractedField?.rawValue,
        afterState: correctedValue,
      });

      addToast(`Field value corrected. Superseding record written to audit ledger.`, 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to record field correction', 'error');
    }
  };

  // Execute notice dispatch
  const handleNoticeSubmit = async (noticeData: Omit<RectificationNotice, 'id' | 'sentTimestamp'>) => {
    try {
      await api.createRectificationNotice(noticeData);
      await api.recordReviewerAction({
        applicationId: id || '',
        versionId: 'VER-8801-1',
        findingId: currentFinding?.id,
        actorId: 'OFF-AICTE-042',
        actorName: 'Dr. R. K. Sharma (Reviewer)',
        actorRole: currentRole,
        action: 'REQUEST_RECTIFICATION',
        rationale: `Dispatched ${noticeData.responsePeriodDays}-day rectification notice for ${currentFinding?.ruleId}`,
      });

      addToast(`Rectification notice dispatched to applicant portal.`, 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to dispatch notice', 'error');
    }
  };

  // Execute escalation
  const handleEscalateSubmit = async (
    rationale: string,
    routingTarget: 'senior_officer' | 'vigilance_division'
  ) => {
    try {
      await api.recordReviewerAction({
        applicationId: id || '',
        versionId: 'VER-8801-1',
        findingId: currentFinding?.id,
        actorId: 'OFF-AICTE-042',
        actorName: 'Dr. R. K. Sharma (Reviewer)',
        actorRole: currentRole,
        action: 'ESCALATE_FRAUD',
        rationale: `Escalated to ${routingTarget.replace('_', ' ')}: ${rationale}`,
      });

      addToast(`Integrity concern escalated to ${routingTarget.replace('_', ' ')}. Audit event recorded.`, 'info');
      await loadData();
    } catch (err) {
      addToast('Failed to escalate finding', 'error');
    }
  };

  // Execute resolve finding
  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveRationale.trim() || !currentFinding) return;
    try {
      await api.recordReviewerAction({
        applicationId: id || '',
        versionId: 'VER-8801-1',
        findingId: currentFinding.id,
        actorId: 'OFF-AICTE-042',
        actorName: 'Dr. R. K. Sharma (Reviewer)',
        actorRole: currentRole,
        action: 'RESOLVE_DEFICIENCY',
        rationale: resolveRationale.trim(),
      });

      addToast(`Finding ${currentFinding.id} resolved. Status updated to PASS with justification.`, 'success');
      setShowResolveModal(false);
      setResolveRationale('');
      await loadData();
    } catch (err) {
      addToast('Failed to resolve finding', 'error');
    }
  };

  if (!application || findings.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F0F0E] text-[#EDE7DA] p-8 flex flex-col items-center justify-center font-mono text-xs">
        <Clock className="w-6 h-6 text-slate animate-spin mb-3" />
        <span>Loading Evidence Review Workstation...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0F0F0E] text-[#EDE7DA] overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-14 px-6 bg-[#171715] border-b border-white/10 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to={`/officer/cases/${id}`}
            className="flex items-center gap-1.5 text-xs font-mono text-slate hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Case Overview</span>
          </Link>

          <div className="h-4 w-px bg-white/15" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white">
                {application.id}
              </span>
              <span className="text-slate text-xs">·</span>
              <span className="text-xs text-[#EDE7DA] font-serif truncate max-w-sm">
                {application.institutionName}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate">
              One-Finding-at-a-Time Adjudication Workstation
            </div>
          </div>
        </div>

        {/* Center Progress Stepper */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1.5 rounded hover:bg-white/10 text-slate hover:text-white disabled:opacity-30 transition-colors"
            title="Previous finding (K)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-white font-bold">{currentIndex + 1}</span>
            <span className="text-slate">of</span>
            <span className="text-slate">{findings.length}</span>
            <span className="text-[10px] text-slate ml-1">FINDINGS</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === findings.length - 1}
            className="p-1.5 rounded hover:bg-white/10 text-slate hover:text-white disabled:opacity-30 transition-colors"
            title="Next finding (J)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Shortcuts & Help */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate">
            <span>[J/K] Next/Prev</span>
            <span>·</span>
            <span>[C] Correct</span>
            <span>·</span>
            <span>[R] Notice</span>
            <span>·</span>
            <span>[E] Escalate</span>
          </div>

          <button
            onClick={handleToggleShortcuts}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-mono text-xs text-slate hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Shortcuts (?)</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <main className="flex-1 grid grid-cols-12 gap-3 p-3 overflow-hidden">
        {/* Left 4 Cols: Document Viewer with Bounding Box Overlay */}
        <div className="col-span-12 lg:col-span-4 h-full overflow-hidden">
          <DocViewer
            document={linkedDocument}
            page={currentFinding?.evidenceReferences.page || 1}
            bbox={linkedExtractedField?.regionBbox}
            fieldName={linkedExtractedField?.fieldName}
            rawValue={currentFinding?.evidenceReferences.rawValue}
          />
        </div>

        {/* Center 4 Cols: Value Triangulation & Comparison */}
        <div className="col-span-12 lg:col-span-4 h-full overflow-hidden">
          {currentFinding && (
            <ValueCompare
              finding={currentFinding}
              extractedField={linkedExtractedField}
              onOpenCorrectDrawer={handleOpenCorrect}
              readOnly={isAuditor}
            />
          )}
        </div>

        {/* Right 4 Cols: Statutory Clause Card & Evidentiary Limitations */}
        <div className="col-span-12 lg:col-span-4 h-full overflow-hidden">
          {currentFinding && (
            <ClauseCard
              rule={linkedRule}
              finding={currentFinding}
            />
          )}
        </div>
      </main>

      {/* Bottom Sticky Action Control Bar */}
      <footer className="h-16 px-6 bg-[#171715] border-t border-white/10 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate">Active Finding:</span>
            <span className="font-mono text-xs text-ochre font-bold">
              {currentFinding?.id}
            </span>
          </div>

          <div className="h-4 w-px bg-white/15" />

          {currentFinding && (
            <span className="font-mono text-[11px] text-slate uppercase">
              Class: <span className="text-[#EDE7DA]">{currentFinding.findingClass.replace(/_/g, ' ')}</span>
            </span>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Correct Value Button */}
          <Button
            onClick={handleOpenCorrect}
            disabled={isAuditor}
            variant="outline"
            className="flex items-center gap-1.5 text-xs font-mono"
            title="Keyboard shortcut: C"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Correct Value (C)</span>
          </Button>

          {/* Request Clarification / NoticeDraft button (Rectifiable gap only) */}
          <Button
            onClick={handleOpenClarification}
            disabled={isAuditor}
            variant="outline"
            className={`flex items-center gap-1.5 text-xs font-mono ${
              currentFinding?.findingClass === 'integrity_concern' ? 'opacity-40' : ''
            }`}
            title={
              currentFinding?.findingClass === 'integrity_concern'
                ? 'Integrity concerns route to senior review, not applicant notices'
                : 'Keyboard shortcut: R'
            }
          >
            <Mail className="w-3.5 h-3.5 text-ochre" />
            <span>Request Clarification (R)</span>
          </Button>

          {/* Escalate Button */}
          <Button
            onClick={handleOpenEscalate}
            disabled={isAuditor}
            variant="outline"
            className="flex items-center gap-1.5 text-xs font-mono border-vermilion/40 text-vermilion hover:bg-vermilion/10"
            title="Keyboard shortcut: E"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Escalate Concern (E)</span>
          </Button>

          {/* Resolve Finding Button */}
          <Button
            onClick={handleOpenResolve}
            disabled={isAuditor || currentFinding?.status === 'PASS'}
            variant="primary"
            className="flex items-center gap-1.5 text-xs font-mono bg-verdigris hover:bg-verdigris/90 text-white"
            title="Keyboard shortcut: X"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Resolve Finding (X)</span>
          </Button>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {showNoticeDraft && currentFinding && (
        <NoticeDraft
          finding={currentFinding}
          applicationId={application.id}
          onClose={() => setShowNoticeDraft(false)}
          onSubmit={handleNoticeSubmit}
          readOnly={isAuditor}
        />
      )}

      {showEscalateModal && currentFinding && (
        <EscalateModal
          finding={currentFinding}
          onClose={() => setShowEscalateModal(false)}
          onSubmit={handleEscalateSubmit}
          readOnly={isAuditor}
        />
      )}

      <CorrectValueDrawer
        isOpen={showCorrectDrawer}
        onClose={() => setShowCorrectDrawer(false)}
        field={linkedExtractedField}
        onSubmit={handleCorrectSubmit}
        readOnly={isAuditor}
      />

      <ShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      {/* Resolve Finding Modal */}
      {showResolveModal && currentFinding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141413] border border-white/15 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#171715] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-verdigris" />
                <h3 className="text-base font-serif font-bold text-[#EDE7DA]">
                  Resolve Statutory Deficiency
                </h3>
              </div>
            </div>
            <form onSubmit={handleResolveSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-verdigris/10 border border-verdigris/20 rounded text-xs">
                <div className="font-mono text-verdigris uppercase font-bold text-[10px]">
                  {currentFinding.id} · {currentFinding.ruleId}
                </div>
                <div className="text-[#EDE7DA] mt-0.5">{currentFinding.explanation}</div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-1.5">
                  Resolution Justification (Mandatory):
                </label>
                <textarea
                  value={resolveRationale}
                  onChange={(e) => setResolveRationale(e.target.value)}
                  placeholder="Record verification rationale (e.g., validated via secondary physical register or gazette notification)..."
                  rows={4}
                  required
                  className="w-full bg-[#1A1A18] border border-white/15 rounded p-3 text-xs text-[#EDE7DA] font-mono focus:border-verdigris outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="px-4 py-2 text-xs font-mono text-slate hover:text-white"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={!resolveRationale.trim()}
                  variant="primary"
                  className="bg-verdigris hover:bg-verdigris/90 text-white"
                >
                  Mark Resolved (PASS)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
