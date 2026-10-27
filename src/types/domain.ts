/**
 * Sakshya‑I5 Domain Types
 * Derived from docs/final-solution.md §3.3, §6, §7
 */

// Roles
export type Role = 'applicant' | 'officer' | 'senior_officer' | 'auditor';

// Lifecycle States (§6, §7)
export type LifecycleState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PROCESSING'
  | 'EVIDENCE_REVIEW'
  | 'READY_FOR_OFFICER_REVIEW'
  | 'UNDER_OFFICER_REVIEW'
  | 'NEEDS_CLARIFICATION'
  | 'RESUBMITTED'
  | 'ESCALATED'
  | 'DECISION_RECORDED'
  | 'CLOSED'
  | 'WITHDRAWN'
  | 'PROCESSING_FAILED'
  | 'EVIDENCE_INCOMPLETE';

// Status Taxonomy (§3.3)
export type VerificationStatus =
  | 'PASS'
  | 'DEFICIENCY_FOUND'
  | 'MISMATCH_FOUND'
  | 'POSSIBLE_DUPLICATE'
  | 'SIGNATURE_VALID'
  | 'SIGNATURE_INVALID_OR_BROKEN'
  | 'SOURCE_UNAVAILABLE'
  | 'VERIFICATION_PENDING'
  | 'LOW_CONFIDENCE_EXTRACTION'
  | 'MANUAL_REVIEW_REQUIRED'
  | 'CHECK_NOT_RUN'
  | 'GEOTAG_ABSENT'
  | 'STRUCTURE_INDICATOR';

// Finding Classes (§3.6)
export type FindingClass =
  | 'rectifiable_gap'
  | 'integrity_concern'
  | 'unverifiable_item';

// Severity
export type FindingSeverity = 'low' | 'medium' | 'high' | 'critical';

// Rule Types (§3.8)
export type RuleType = 'presence' | 'threshold' | 'formula' | 'cross_record';

// Rule Lifecycle (§3.5)
export type RuleLifecycleState =
  | 'DRAFT'
  | 'SOURCE_VERIFIED'
  | 'REVIEWED'
  | 'ACTIVE'
  | 'RETIRED';

// Adapter Environment Label (§14, §8)
export type SourceEnvironment = 'LIVE' | 'SANDBOX' | 'SIMULATED';

// Application Category
export type ApplicationCategory =
  | 'EXTENSION_OF_APPROVAL'
  | 'NEW_INSTITUTION'
  | 'INTAKE_INCREASE'
  | 'CLOSURE_OR_MERGER';

// Core Entities (§6)

export interface Application {
  id: string; // e.g., "APP-2026-8801"
  institutionId: string;
  institutionName: string;
  institutionNameHi?: string;
  category: ApplicationCategory;
  academicYear: string;
  submissionDate: string;
  currentState: LifecycleState;
  assignedReviewerId?: string;
  assignedReviewerName?: string;
  referenceDate: string; // explicit date for expiry calculations (e.g., "2026-06-30")
  versionCount: number;
  currentVersionId: string;
  campusCoordinates?: {
    latitude: number;
    longitude: number;
  };
  declaredIntake?: number;
  declaredCarpetAreaSqm?: number;
}

export interface ApplicationVersion {
  id: string;
  applicationId: string;
  versionNumber: number;
  submittedAt: string;
  versionStatus: 'active' | 'superseded' | 'archived';
  supersededByVersionId?: string;
  changedInputKeys?: string[]; // for differential re-check
}

export interface DocumentItem {
  id: string;
  applicationId: string;
  versionId: string;
  documentType:
    | 'AFFIDAVIT'
    | 'STATE_GOVT_NOC'
    | 'ACCREDITATION_CERT'
    | 'LAND_REGISTRY_RECORD'
    | 'FIRE_SAFETY_CERT'
    | 'ARCHITECT_FLOOR_PLAN'
    | 'GEO_TAGGED_CAMPUS_PHOTO'
    | 'CAMPUS_WALKTHROUGH_VIDEO';
  originalFilename: string;
  storageKey: string;
  mediaType: string;
  byteSize: number;
  sha256: string;
  uploadTimestamp: string;
  uploaderLabel: string;
  digitalSignatureStatus?: VerificationStatus;
  pageCount?: number;
}

export interface DocumentDerivative {
  id: string;
  sourceDocumentId: string;
  derivativeType: 'ocr_text' | 'thumbnail' | 'redacted_view' | 'cv_annotation';
  storageKey: string;
  processingVersion: string;
  createdAt: string;
  extractedTextSample?: string;
}

export interface ExtractedField {
  id: string;
  documentId: string;
  fieldName: string;
  rawValue: string;
  normalizedValue: string;
  page?: number;
  regionBbox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax]
  extractionMethod: string; // e.g. "Tesseract OCR v5.3"
  confidence: number; // 0.0 - 1.0
  isCritical: boolean;
  reviewerCorrectedValue?: string;
  correctionReason?: string;
  correctionProvenance?: {
    officerId: string;
    timestamp: string;
  };
}

export interface RuleDefinition {
  id: string;
  version: string;
  ruleType: RuleType;
  category: ApplicationCategory;
  name: string;
  description: string;
  authoritativeSource: string; // e.g., "AICTE APH 2026-27"
  clauseReference: string; // e.g., "Chapter II, Clause 2.4.1"
  pageReference?: number;
  effectiveDate: string;
  lifecycleState: RuleLifecycleState;
  ownerReviewer: string;
  formulaDefinition?: {
    inputs: string[];
    expression: string;
    parameterCitations: Record<string, string>;
  };
}

export interface CheckRun {
  id: string;
  applicationId: string;
  versionId: string;
  ruleId: string;
  ruleVersion: string;
  checkName: string;
  status: VerificationStatus;
  startedAt: string;
  endedAt: string;
  softwareVersion: string;
  isMandatory: boolean;
  notRunReason?: string;
  idempotencyKey: string;
}

export interface Finding {
  id: string;
  checkRunId: string;
  applicationId: string;
  applicationVersion?: number;
  ruleId: string;
  findingClass: FindingClass;
  status: VerificationStatus;
  severity: FindingSeverity;
  explanation: string;
  explanationHi?: string;
  isCritical: boolean;
  evidenceReferences: {
    documentId?: string;
    documentName?: string;
    page?: number;
    rawField?: string;
    comparedField?: string;
    rawValue?: string;
    comparedValue?: string;
  };
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionAction?: string;
}

export interface VerificationResult {
  id: string;
  documentId?: string;
  recordId?: string;
  verificationMethod: string; // e.g., "NBA_ACCREDITATION_REGISTRY_API"
  sourceAdapterId: string;
  sourceEnvironment: SourceEnvironment; // LIVE / SANDBOX / SIMULATED
  status: VerificationStatus;
  returnedFields: Record<string, any>;
  timestamp: string;
  limitationsNote?: string;
}

export interface SufficiencyAssessment {
  id: string;
  applicationId: string;
  versionId: string;
  mandatoryChecksTotal: number;
  mandatoryChecksCompleted: number;
  mandatoryChecksRunRatio: string; // e.g. "9 of 11 mandatory checks ran"
  blockingIssuesCount: number;
  limitingSignal: string; // Weakest signal rule (§3.4)
  readinessProfileId: string;
  readinessProfileVersion: string;
  isReadyForDecision: boolean;
  sufficiencyStatus: 'SUFFICIENT' | 'EVIDENCE_INCOMPLETE' | 'MANUAL_REVIEW_REQUIRED';
  timestamp: string;
}

export interface ReviewerAction {
  id: string;
  applicationId: string;
  versionId: string;
  findingId?: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  action:
    | 'CORRECT_EXTRACTION'
    | 'REQUEST_RECTIFICATION'
    | 'MARK_REVIEWED'
    | 'RESOLVE_DEFICIENCY'
    | 'ESCALATE_FRAUD'
    | 'RECORD_FINAL_DECISION';
  rationale: string;
  beforeState?: string;
  afterState?: string;
  timestamp: string;
  supersedesActionId?: string;
}

export interface AlertItem {
  id: string;
  applicationId: string;
  alertType:
    | 'EXPIRED_DOCUMENT'
    | 'NAME_MISMATCH'
    | 'DUPLICATE_DETECTED'
    | 'SIGNATURE_INVALID'
    | 'SOURCE_UNAVAILABLE'
    | 'ESCALATION_PENDING';
  severity: FindingSeverity;
  assignedRole: Role;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  message: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: Role | 'SYSTEM';
  eventType:
    | 'APPLICATION_SUBMITTED'
    | 'CHECK_EXECUTED'
    | 'SOURCE_ADAPTER_CALLED'
    | 'FINDING_CREATED'
    | 'OFFICER_CORRECTION'
    | 'RECTIFICATION_NOTICE_DRAFTED'
    | 'CASE_ESCALATED'
    | 'DECISION_RECORDED'
    | 'AUDIT_CHECKPOINT_PUBLISHED';
  targetEntityId: string;
  timestamp: string;
  payload: Record<string, any>;
  previousEventHash: string;
  eventHash: string;
  externalCheckpointRef?: string;
}

export interface ReadinessProfile {
  id: string;
  version: string;
  name: string;
  perFieldConfidenceFloor: Record<string, number>;
  requireTerminalIssuerResponse: boolean;
  disallowUnreviewedDuplicates: boolean;
  effectiveDate: string;
}

export interface RectificationNotice {
  id: string;
  applicationId: string;
  versionId: string;
  linkedFindingIds: string[];
  language: 'en' | 'hi' | 'both';
  templateVersion: string;
  subject: string;
  subjectHi?: string;
  bodyContent: string;
  bodyContentHi?: string;
  responsePeriodDays: number;
  responsePeriodSource: string;
  approvingOfficerId: string;
  approvingOfficerName: string;
  sentTimestamp: string;
  deadlineDate: string;
  status: 'DRAFT' | 'APPROVED' | 'DISPATCHED' | 'ACKNOWLEDGED';
}

export interface ReplayRun {
  id: string;
  originalApplicationId: string;
  originalVersionId: string;
  originalRuleVersion: string;
  originalSoftwareVersion: string;
  pinnedReferenceDate: string;
  replayTimestamp: string;
  requestingActorId: string;
  requestingActorRole: Role;
  differencesFound: Array<{
    findingId: string;
    originalStatus: VerificationStatus;
    replayedStatus: VerificationStatus;
    explanation: string;
  }>;
  matchRatio: number; // 1.0 = identical
}

export interface MeasurementSession {
  id: string;
  documentId: string;
  applicationId: string;
  scaleReferencePoints: [[number, number], [number, number]];
  statedScaleLengthMeters: number;
  pixelsPerMeter: number;
  tracedPolygonVertices: Array<[number, number]>;
  computedAreaSqm: number;
  declaredAreaSqm: number;
  tolerancePercentage: number;
  areaDeltaSqm: number;
  isWithinTolerance: boolean;
  officerId: string;
  timestamp: string;
}
