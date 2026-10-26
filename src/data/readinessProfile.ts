import { ReadinessProfile } from '../types/domain';

export const defaultReadinessProfile: ReadinessProfile = {
  id: 'RP-2026-EOA-STRICT',
  version: '2.1.0',
  name: 'AICTE APH 2026-27 Strict Extension of Approval Gate Profile',
  perFieldConfidenceFloor: {
    institutionName: 0.85,
    accreditationExpiryDate: 0.80,
    carpetAreaSqm: 0.75,
    approvedIntake: 0.90,
    registrationNumber: 0.85,
  },
  requireTerminalIssuerResponse: true,
  disallowUnreviewedDuplicates: true,
  effectiveDate: '2026-01-01',
};
