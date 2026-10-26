import { describe, it, expect } from 'vitest';
import { executeDecisionReplay, ReplayConfig } from './replay';
import { Finding } from '../types/domain';

describe('Decision Replay Service (services/replay.ts)', () => {
  const mockOriginalFindings: Finding[] = [
    {
      id: 'FIND-01',
      checkRunId: 'CR-01',
      applicationId: 'APP-2026-8801',
      ruleId: 'RULE-APH-2.4-EXPIRY',
      findingClass: 'rectifiable_gap',
      status: 'DEFICIENCY_FOUND',
      severity: 'critical',
      explanation: 'Accreditation expired on 2025-12-31, prior to reference cutoff 2026-06-30.',
      isCritical: true,
      evidenceReferences: {
        rawValue: '2025-12-31',
        comparedValue: '2026-06-30',
      },
      createdAt: '2026-03-12T10:30:00Z',
    },
    {
      id: 'FIND-02',
      checkRunId: 'CR-02',
      applicationId: 'APP-2026-8801',
      ruleId: 'RULE-APH-1.2-NAME-MATCH',
      findingClass: 'integrity_concern',
      status: 'MISMATCH_FOUND',
      severity: 'high',
      explanation: 'Name mismatch between affidavit and NOC.',
      isCritical: true,
      evidenceReferences: {
        rawValue: 'Sri Vidya Inst of Technology',
        comparedValue: 'Sri Vidya College of Engineering & Tech',
      },
      createdAt: '2026-03-12T10:30:00Z',
    },
  ];

  it('produces identical outcome when pinned parameters match original reference date', () => {
    const config: ReplayConfig = {
      applicationId: 'APP-2026-8801',
      versionId: 'VER-8801-1',
      pinnedRuleVersion: '2026.1',
      pinnedSoftwareVersion: '2.1.0',
      pinnedReferenceDate: '2026-06-30',
      actorId: 'OFF-042',
      actorRole: 'officer',
    };

    const { replayRun, results } = executeDecisionReplay(mockOriginalFindings, config);
    expect(replayRun.differencesFound.length).toBe(0);
    expect(replayRun.matchRatio).toBe(1.0);
    expect(results[0].replayedStatus).toBe('DEFICIENCY_FOUND');
    expect(results[1].replayedStatus).toBe('MISMATCH_FOUND');
  });

  it('detects status difference when pinned reference date is shifted prior to document expiry', () => {
    const config: ReplayConfig = {
      applicationId: 'APP-2026-8801',
      versionId: 'VER-8801-1',
      pinnedRuleVersion: '2026.1',
      pinnedSoftwareVersion: '2.1.0',
      pinnedReferenceDate: '2025-06-30', // Earlier reference date
      actorId: 'OFF-042',
      actorRole: 'officer',
    };

    const { replayRun, results } = executeDecisionReplay(mockOriginalFindings, config);
    expect(replayRun.differencesFound.length).toBe(1);
    expect(replayRun.differencesFound[0].findingId).toBe('FIND-01');
    expect(replayRun.differencesFound[0].originalStatus).toBe('DEFICIENCY_FOUND');
    expect(replayRun.differencesFound[0].replayedStatus).toBe('PASS');
    expect(replayRun.matchRatio).toBe(0.5);
    expect(results[0].hasDifference).toBe(true);
  });

  it('detects difference when pinned rule version is reverted to 2024.1', () => {
    const config: ReplayConfig = {
      applicationId: 'APP-2026-8801',
      versionId: 'VER-8801-1',
      pinnedRuleVersion: '2024.1',
      pinnedSoftwareVersion: '2.0.0',
      pinnedReferenceDate: '2026-06-30',
      actorId: 'OFF-042',
      actorRole: 'officer',
    };

    const { replayRun, results } = executeDecisionReplay(mockOriginalFindings, config);
    expect(replayRun.differencesFound.some((d) => d.findingId === 'FIND-02')).toBe(true);
    expect(results[1].replayedStatus).toBe('PASS');
  });
});
