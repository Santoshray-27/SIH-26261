/**
 * Pure service for Decision Replay.
 * Reproduces or evaluates findings against pinned rule versions, software versions,
 * and reference dates without ever mutating original records (§3.4, §6).
 */

import { Finding, ReplayRun, Role, VerificationStatus } from '../types/domain';

export interface ReplayConfig {
  applicationId: string;
  versionId: string;
  pinnedRuleVersion: string;
  pinnedSoftwareVersion: string;
  pinnedReferenceDate: string; // e.g. "2026-06-30" vs "2025-12-31"
  actorId: string;
  actorRole: Role;
}

export interface ReplayedFindingResult {
  findingId: string;
  ruleId: string;
  originalStatus: VerificationStatus;
  replayedStatus: VerificationStatus;
  hasDifference: boolean;
  explanation: string;
}

/**
 * Pure function: Executes a deterministic replay of a case's findings against pinned parameters.
 * E.g., if the rule version is changed from '2026.1' to '2025.1' (prior cycle) or reference date changed:
 * - If reference date was earlier than accreditation expiry 2025-12-31 (e.g. 2025-06-30), accreditation passes!
 * - If rule version changed to '2025.1' where threshold was 2025-06-30, status changes from DEFICIENCY_FOUND to PASS.
 */
export function executeDecisionReplay(
  originalFindings: Finding[],
  config: ReplayConfig
): {
  replayRun: ReplayRun;
  results: ReplayedFindingResult[];
} {
  const differences: ReplayRun['differencesFound'] = [];
  const results: ReplayedFindingResult[] = [];

  for (const f of originalFindings) {
    let replayedStatus: VerificationStatus = f.status;
    let explanation = 'Identical outcome under pinned environment.';

    // Check Rule: Accreditation Threshold (RULE-APH-2.4-EXPIRY)
    if (f.ruleId === 'RULE-APH-2.4-EXPIRY') {
      const declaredExpiry = f.evidenceReferences.rawValue || '2025-12-31';
      // Compare declaredExpiry with pinnedReferenceDate
      if (config.pinnedReferenceDate <= declaredExpiry) {
        // Under an earlier reference date cutoff (or 2025 rulebook), expiry was still valid!
        replayedStatus = 'PASS';
        explanation = `Accreditation expiry ${declaredExpiry} is valid through pinned reference cutoff ${config.pinnedReferenceDate}. Deficiency resolved under replayed parameter.`;
      } else {
        replayedStatus = 'DEFICIENCY_FOUND';
        explanation = `Accreditation expired on ${declaredExpiry}, prior to pinned cutoff ${config.pinnedReferenceDate}.`;
      }
    }

    // Check Rule: Name match under lenient rule version 2024.1 (exact match vs token subset)
    if (f.ruleId === 'RULE-APH-1.2-NAME-MATCH') {
      if (config.pinnedRuleVersion === '2024.1') {
        // 2024 rule allowed token subset overlap
        replayedStatus = 'PASS';
        explanation = 'Rule version 2024.1 allowed fuzzy token overlap between Affidavit and State NOC.';
      } else {
        replayedStatus = f.status;
      }
    }

    // Check Rule: Hash Duplicate
    if (f.ruleId === 'RULE-AUTH-EXACT-HASH-DUP') {
      // Byte duplicate is immutable across rule versions
      replayedStatus = f.status;
    }

    const hasDifference = replayedStatus !== f.status;
    if (hasDifference) {
      differences.push({
        findingId: f.id,
        originalStatus: f.status,
        replayedStatus,
        explanation,
      });
    }

    results.push({
      findingId: f.id,
      ruleId: f.ruleId,
      originalStatus: f.status,
      replayedStatus,
      hasDifference,
      explanation,
    });
  }

  const matchRatio = originalFindings.length > 0
    ? (originalFindings.length - differences.length) / originalFindings.length
    : 1.0;

  const replayRun: ReplayRun = {
    id: `RPL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    originalApplicationId: config.applicationId,
    originalVersionId: config.versionId,
    originalRuleVersion: config.pinnedRuleVersion,
    originalSoftwareVersion: config.pinnedSoftwareVersion,
    pinnedReferenceDate: config.pinnedReferenceDate,
    replayTimestamp: new Date().toISOString(),
    requestingActorId: config.actorId,
    requestingActorRole: config.actorRole,
    differencesFound: differences,
    matchRatio: Math.round(matchRatio * 100) / 100,
  };

  return { replayRun, results };
}
