import { ApiService } from './api';
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
import {
  mockApplications,
  mockDocuments,
  mockFindings,
  mockSufficiencyAssessments,
  mockVerificationResults,
  mockRules,
  mockAuditEvents,
  mockAlerts,
  mockExtractedFields,
  mockCheckRuns,
} from '../mock/mockData';

const delay = (ms: number = 80) => new Promise((resolve) => setTimeout(resolve, ms));

class MockApiService implements ApiService {
  private applications = [...mockApplications];
  private documents = [...mockDocuments];
  private findings = [...mockFindings];
  private assessments = { ...mockSufficiencyAssessments };
  private verifications = [...mockVerificationResults];
  private rules = [...mockRules];
  private auditEvents = [...mockAuditEvents];
  private alerts = [...mockAlerts];
  private extractedFields = [...mockExtractedFields];
  private checkRuns = [...mockCheckRuns];
  private notices: RectificationNotice[] = [];

  async getApplications(): Promise<Application[]> {
    await delay();
    return [...this.applications];
  }

  async getApplicationById(id: string): Promise<Application | null> {
    await delay();
    return this.applications.find((app) => app.id === id) || null;
  }

  async getDocumentsByApplicationId(applicationId: string): Promise<DocumentItem[]> {
    await delay();
    return this.documents.filter((doc) => doc.applicationId === applicationId);
  }

  async getExtractedFieldsByDocumentId(documentId: string): Promise<ExtractedField[]> {
    await delay();
    return this.extractedFields.filter((ef) => ef.documentId === documentId);
  }

  async getAllExtractedFieldsByApplicationId(applicationId: string): Promise<ExtractedField[]> {
    await delay();
    const appDocs = this.documents.filter((d) => d.applicationId === applicationId);
    const docIds = new Set(appDocs.map((d) => d.id));
    return this.extractedFields.filter((ef) => docIds.has(ef.documentId));
  }

  async getCheckRunsByApplicationId(applicationId: string): Promise<CheckRun[]> {
    await delay();
    return this.checkRuns.filter((cr) => cr.applicationId === applicationId);
  }

  async getFindingsByApplicationId(applicationId: string, versionId?: string): Promise<Finding[]> {
    await delay();
    if (versionId === 'VER-8801-2') {
      return this.findings.filter((f) => f.id.endsWith('-V2'));
    }
    // Default to v1 findings
    return this.findings.filter((f) => f.applicationId === applicationId && !f.id.endsWith('-V2'));
  }

  async getSufficiencyAssessment(applicationId: string): Promise<SufficiencyAssessment | null> {
    await delay();
    return this.assessments[applicationId] || null;
  }

  async getAllSufficiencyAssessments(): Promise<Record<string, SufficiencyAssessment>> {
    await delay();
    return { ...this.assessments };
  }

  async getVerificationResults(_applicationId: string): Promise<VerificationResult[]> {
    await delay();
    return this.verifications;
  }

  async getRules(): Promise<RuleDefinition[]> {
    await delay();
    return [...this.rules];
  }

  async getAuditTrail(applicationId?: string): Promise<AuditEvent[]> {
    await delay();
    if (!applicationId) return [...this.auditEvents];
    return this.auditEvents.filter((ev) => ev.targetEntityId.includes(applicationId));
  }

  async getAlerts(): Promise<AlertItem[]> {
    await delay();
    return [...this.alerts];
  }

  async recordReviewerAction(
    actionData: Omit<ReviewerAction, 'id' | 'timestamp'>
  ): Promise<ReviewerAction> {
    await delay(120);
    const newAction: ReviewerAction = {
      ...actionData,
      id: `ACT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      timestamp: new Date().toISOString(),
    };

    if (newAction.findingId) {
      const targetFinding = this.findings.find((f) => f.id === newAction.findingId);
      if (targetFinding && newAction.action === 'RESOLVE_DEFICIENCY') {
        targetFinding.status = 'PASS';
        targetFinding.resolvedAt = newAction.timestamp;
        targetFinding.resolvedBy = newAction.actorName;
        targetFinding.resolutionAction = newAction.rationale;
      }
    }

    const lastHash = this.auditEvents[this.auditEvents.length - 1]?.eventHash || '00000000';
    const fakeDigest = Math.random().toString(16).substring(2, 10).repeat(4);
    this.auditEvents.push({
      id: `AUD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      actorId: newAction.actorId,
      actorName: newAction.actorName,
      actorRole: newAction.actorRole,
      eventType: 'OFFICER_CORRECTION',
      targetEntityId: newAction.applicationId,
      timestamp: newAction.timestamp,
      payload: { action: newAction.action, rationale: newAction.rationale },
      previousEventHash: lastHash,
      eventHash: fakeDigest,
    });

    return newAction;
  }

  async correctExtractedField(
    fieldId: string,
    correctedValue: string,
    reason: string,
    officerId: string
  ): Promise<ExtractedField> {
    await delay(120);
    const field = this.extractedFields.find((f) => f.id === fieldId);
    if (!field) throw new Error(`Field ${fieldId} not found`);

    field.reviewerCorrectedValue = correctedValue;
    field.correctionReason = reason;
    field.correctionProvenance = {
      officerId,
      timestamp: new Date().toISOString(),
    };

    // Log correction in audit log
    const lastHash = this.auditEvents[this.auditEvents.length - 1]?.eventHash || '00000000';
    const fakeDigest = Math.random().toString(16).substring(2, 10).repeat(4);
    this.auditEvents.push({
      id: `AUD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      actorId: officerId,
      actorName: 'Dr. R. K. Sharma (Reviewer)',
      actorRole: 'officer',
      eventType: 'OFFICER_CORRECTION',
      targetEntityId: fieldId,
      timestamp: new Date().toISOString(),
      payload: { fieldName: field.fieldName, rawValue: field.rawValue, correctedValue, reason },
      previousEventHash: lastHash,
      eventHash: fakeDigest,
    });

    return { ...field };
  }

  async createRectificationNotice(
    noticeData: Omit<RectificationNotice, 'id' | 'sentTimestamp'>
  ): Promise<RectificationNotice> {
    await delay(120);
    const newNotice: RectificationNotice = {
      ...noticeData,
      id: `NOT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      sentTimestamp: new Date().toISOString(),
    };
    this.notices.push(newNotice);

    // Audit log
    const lastHash = this.auditEvents[this.auditEvents.length - 1]?.eventHash || '00000000';
    const fakeDigest = Math.random().toString(16).substring(2, 10).repeat(4);
    this.auditEvents.push({
      id: `AUD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      actorId: newNotice.approvingOfficerId,
      actorName: newNotice.approvingOfficerName,
      actorRole: 'officer',
      eventType: 'RECTIFICATION_NOTICE_DRAFTED',
      targetEntityId: newNotice.applicationId,
      timestamp: new Date().toISOString(),
      payload: {
        noticeId: newNotice.id,
        linkedFindingIds: newNotice.linkedFindingIds,
        responsePeriodDays: newNotice.responsePeriodDays,
        subject: newNotice.subject,
      },
      previousEventHash: lastHash,
      eventHash: fakeDigest,
    });

    return newNotice;
  }

  async getNoticesByApplicationId(applicationId: string): Promise<RectificationNotice[]> {
    await delay();
    return this.notices.filter((n) => n.applicationId === applicationId);
  }
}

export const api: ApiService = new MockApiService();
