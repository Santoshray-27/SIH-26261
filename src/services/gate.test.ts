import { describe, it, expect } from 'vitest';
import { evaluateEvidenceSufficiency, GateInput } from './gate';
import { defaultReadinessProfile } from '../data/readinessProfile';

describe('Evidence Sufficiency Gate (Pure Service §3.4)', () => {
  it('identifies un-executed mandatory checks and returns EVIDENCE_INCOMPLETE with weakest signal', () => {
    const input: GateInput = {
      applicationId: 'APP-TEST-01',
      versionId: 'VER-01',
      categoryChecksExpectedTotal: 11,
      checkRuns: [
        {
          id: 'CR-01',
          applicationId: 'APP-TEST-01',
          versionId: 'VER-01',
          ruleId: 'RULE-01',
          ruleVersion: '2026.1',
          checkName: 'Affidavit Check',
          status: 'PASS',
          startedAt: '',
          endedAt: '',
          softwareVersion: '1.0',
          isMandatory: true,
          idempotencyKey: 'k1',
        },
        // 10 checks missing
      ],
      extractedFields: [],
      findings: [],
      verificationResults: [],
      readinessProfile: defaultReadinessProfile,
    };

    const result = evaluateEvidenceSufficiency(input);
    expect(result.verdict).toBe('EVIDENCE_INCOMPLETE');
    expect(result.isReadyForDecision).toBe(false);
    expect(result.mandatoryChecksRunRatio).toBe('1 of 11 mandatory checks ran');
    expect(result.limitingSignal).toContain('mandatory check(s) un-executed');
    expect(result.disclaimer).toBe('This gate is a workflow control, not an approval engine (§3.4).');
  });

  it('routes to MANUAL_REVIEW_REQUIRED when a critical field falls below confidence floor', () => {
    const checkRuns = Array.from({ length: 11 }, (_, i) => ({
      id: `CR-${i}`,
      applicationId: 'APP-TEST-02',
      versionId: 'VER-01',
      ruleId: `RULE-${i}`,
      ruleVersion: '2026.1',
      checkName: `Check ${i}`,
      status: 'PASS' as const,
      startedAt: '',
      endedAt: '',
      softwareVersion: '1.0',
      isMandatory: true,
      idempotencyKey: `k-${i}`,
    }));

    const input: GateInput = {
      applicationId: 'APP-TEST-02',
      versionId: 'VER-01',
      categoryChecksExpectedTotal: 11,
      checkRuns,
      extractedFields: [
        {
          id: 'EF-01',
          documentId: 'DOC-01',
          fieldName: 'institutionName',
          rawValue: 'Sample Inst',
          normalizedValue: 'Sample Inst',
          extractionMethod: 'Tesseract',
          confidence: 0.62, // floor is 0.85
          isCritical: true,
        },
      ],
      findings: [],
      verificationResults: [],
      readinessProfile: defaultReadinessProfile,
    };

    const result = evaluateEvidenceSufficiency(input);
    expect(result.verdict).toBe('MANUAL_REVIEW_REQUIRED');
    expect(result.isReadyForDecision).toBe(false);
    expect(result.limitingSignal).toContain('institutionName');
  });

  it('routes to READY_FOR_OFFICER_REVIEW when all mandatory checks ran, fields meet confidence, and findings are resolved', () => {
    const checkRuns = Array.from({ length: 11 }, (_, i) => ({
      id: `CR-${i}`,
      applicationId: 'APP-TEST-03',
      versionId: 'VER-01',
      ruleId: `RULE-${i}`,
      ruleVersion: '2026.1',
      checkName: `Check ${i}`,
      status: 'PASS' as const,
      startedAt: '',
      endedAt: '',
      softwareVersion: '1.0',
      isMandatory: true,
      idempotencyKey: `k-${i}`,
    }));

    const input: GateInput = {
      applicationId: 'APP-TEST-03',
      versionId: 'VER-01',
      categoryChecksExpectedTotal: 11,
      checkRuns,
      extractedFields: [
        {
          id: 'EF-01',
          documentId: 'DOC-01',
          fieldName: 'institutionName',
          rawValue: 'Valid University',
          normalizedValue: 'Valid University',
          extractionMethod: 'Tesseract',
          confidence: 0.96,
          isCritical: true,
        },
      ],
      findings: [],
      verificationResults: [
        {
          id: 'VR-01',
          verificationMethod: 'REGISTRY',
          sourceAdapterId: 'ADAPTER-NBA',
          sourceEnvironment: 'SIMULATED',
          status: 'PASS',
          returnedFields: { valid: true },
          timestamp: '',
        },
      ],
      readinessProfile: defaultReadinessProfile,
    };

    const result = evaluateEvidenceSufficiency(input);
    expect(result.verdict).toBe('READY_FOR_OFFICER_REVIEW');
    expect(result.isReadyForDecision).toBe(true);
    expect(result.limitingSignal).toBe('All mandatory readiness conditions satisfied.');
  });
});
