import {
  ReadinessProfile,
  CheckRun,
  ExtractedField,
  Finding,
  VerificationResult,
} from '../types/domain';

export interface GateInput {
  applicationId: string;
  versionId: string;
  categoryChecksExpectedTotal: number;
  checkRuns: CheckRun[];
  extractedFields: ExtractedField[];
  findings: Finding[];
  verificationResults: VerificationResult[];
  readinessProfile: ReadinessProfile;
}

export type GateVerdict =
  | 'EVIDENCE_INCOMPLETE'
  | 'MANUAL_REVIEW_REQUIRED'
  | 'READY_FOR_OFFICER_REVIEW';

export interface GateEvaluationOutput {
  verdict: GateVerdict;
  limitingSignal: string; // The single weakest critical signal (§3.4)
  mandatoryChecksTotal: number;
  mandatoryChecksCompleted: number;
  mandatoryChecksRunRatio: string;
  isReadyForDecision: boolean;
  blockers: string[];
  disclaimer: 'This gate is a workflow control, not an approval engine (§3.4).';
  readinessProfileVersion: string;
}

/**
 * Pure evaluation function for the Evidence Sufficiency Gate (§3.4).
 * Evaluates in strict precedence:
 * 1. Missing mandatory check runs -> EVIDENCE_INCOMPLETE
 * 2. Low-confidence critical fields below profile floors -> MANUAL_REVIEW_REQUIRED
 * 3. Non-terminal external issuer responses -> EVIDENCE_INCOMPLETE
 * 4. Unresolved critical findings (duplicates, expired, mismatches) -> MANUAL_REVIEW_REQUIRED
 * 5. All satisfied -> READY_FOR_OFFICER_REVIEW
 */
export function evaluateEvidenceSufficiency(input: GateInput): GateEvaluationOutput {
  const {
    categoryChecksExpectedTotal,
    checkRuns,
    extractedFields,
    findings,
    verificationResults,
    readinessProfile,
  } = input;

  const blockers: string[] = [];
  let limitingSignal = 'All mandatory readiness conditions satisfied.';
  let verdict: GateVerdict = 'READY_FOR_OFFICER_REVIEW';

  // 1. Mandatory checks executed evaluation
  const mandatoryRuns = checkRuns.filter((cr) => cr.isMandatory && cr.status !== 'CHECK_NOT_RUN');
  const mandatoryRunsCount = mandatoryRuns.length;
  const unrunCount = Math.max(0, categoryChecksExpectedTotal - mandatoryRunsCount);

  if (unrunCount > 0) {
    const unrunReasons = checkRuns
      .filter((cr) => cr.isMandatory && cr.status === 'CHECK_NOT_RUN')
      .map((cr) => cr.checkName);

    blockers.push(
      `${unrunCount} mandatory check(s) did not execute (${unrunReasons.join(', ') || 'un-run checks'}).`
    );
    limitingSignal = `${unrunCount} mandatory check(s) un-executed; case coverage incomplete`;
    verdict = 'EVIDENCE_INCOMPLETE';
  }

  // 2. Critical-field extraction quality
  for (const field of extractedFields) {
    if (field.isCritical && !field.reviewerCorrectedValue) {
      const floor = readinessProfile.perFieldConfidenceFloor[field.fieldName] || 0.75;
      if (field.confidence < floor) {
        const msg = `Critical field '${field.fieldName}' extraction confidence ${field.confidence.toFixed(2)} is below threshold ${floor.toFixed(2)}.`;
        blockers.push(msg);
        if (verdict === 'READY_FOR_OFFICER_REVIEW') {
          limitingSignal = msg;
          verdict = 'MANUAL_REVIEW_REQUIRED';
        }
      }
    }
  }

  // 3. Issuer/registry-backed documents terminal response
  if (readinessProfile.requireTerminalIssuerResponse) {
    for (const vr of verificationResults) {
      if (vr.status === 'SOURCE_UNAVAILABLE' || vr.status === 'VERIFICATION_PENDING') {
        const msg = `Issuer adapter '${vr.sourceAdapterId}' returned non-terminal status '${vr.status}'.`;
        blockers.push(msg);
        if (verdict !== 'EVIDENCE_INCOMPLETE') {
          limitingSignal = msg;
          verdict = 'EVIDENCE_INCOMPLETE';
        }
      }
    }
  }

  // 4. Unresolved critical findings (duplicates, mismatches, deficiencies)
  const openCriticalFindings = findings.filter((f) => f.isCritical && !f.resolvedAt);
  if (openCriticalFindings.length > 0) {
    const duplicateFinding = openCriticalFindings.find((f) => f.status === 'POSSIBLE_DUPLICATE');
    const mismatchFinding = openCriticalFindings.find((f) => f.status === 'MISMATCH_FOUND');
    const deficiencyFinding = openCriticalFindings.find((f) => f.status === 'DEFICIENCY_FOUND');

    let desc = `${openCriticalFindings.length} open critical finding(s) require officer resolution.`;
    if (duplicateFinding) {
      desc = `Unreviewed exact duplicate document: ${duplicateFinding.explanation.substring(0, 75)}...`;
    } else if (mismatchFinding) {
      desc = `Unresolved institutional title mismatch between records.`;
    } else if (deficiencyFinding) {
      desc = `Regulatory deficiency open: ${deficiencyFinding.explanation.substring(0, 75)}...`;
    }

    blockers.push(desc);
    limitingSignal = desc;
    verdict = 'MANUAL_REVIEW_REQUIRED';
  }

  return {
    verdict,
    limitingSignal,
    mandatoryChecksTotal: categoryChecksExpectedTotal,
    mandatoryChecksCompleted: mandatoryRunsCount,
    mandatoryChecksRunRatio: `${mandatoryRunsCount} of ${categoryChecksExpectedTotal} mandatory checks ran`,
    isReadyForDecision: verdict === 'READY_FOR_OFFICER_REVIEW',
    blockers,
    disclaimer: 'This gate is a workflow control, not an approval engine (§3.4).',
    readinessProfileVersion: readinessProfile.version,
  };
}
