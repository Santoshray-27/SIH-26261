import {
  Application,
  DocumentItem,
  Finding,
  SufficiencyAssessment,
  VerificationResult,
  RuleDefinition,
  AuditEvent,
  ReviewerAction,
  AlertItem,
  ExtractedField,
  CheckRun,
  RectificationNotice,
} from '../types/domain';

export interface ApiService {
  getApplications: () => Promise<Application[]>;
  getApplicationById: (id: string) => Promise<Application | null>;
  getDocumentsByApplicationId: (applicationId: string) => Promise<DocumentItem[]>;
  getExtractedFieldsByDocumentId: (documentId: string) => Promise<ExtractedField[]>;
  getAllExtractedFieldsByApplicationId: (applicationId: string) => Promise<ExtractedField[]>;
  getCheckRunsByApplicationId: (applicationId: string) => Promise<CheckRun[]>;
  getFindingsByApplicationId: (applicationId: string, versionId?: string) => Promise<Finding[]>;
  getSufficiencyAssessment: (applicationId: string) => Promise<SufficiencyAssessment | null>;
  getAllSufficiencyAssessments: () => Promise<Record<string, SufficiencyAssessment>>;
  getVerificationResults: (applicationId: string) => Promise<VerificationResult[]>;
  getRules: () => Promise<RuleDefinition[]>;
  getAuditTrail: (applicationId?: string) => Promise<AuditEvent[]>;
  getAlerts: () => Promise<AlertItem[]>;
  recordReviewerAction: (action: Omit<ReviewerAction, 'id' | 'timestamp'>) => Promise<ReviewerAction>;
  correctExtractedField: (fieldId: string, correctedValue: string, reason: string, officerId: string) => Promise<ExtractedField>;
  createRectificationNotice: (notice: Omit<RectificationNotice, 'id' | 'sentTimestamp'>) => Promise<RectificationNotice>;
  getNoticesByApplicationId: (applicationId: string) => Promise<RectificationNotice[]>;
}
