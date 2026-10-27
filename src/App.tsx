import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicShell } from './components/PublicShell';
import { OfficerShell } from './components/OfficerShell';

import { LandingPage } from './pages/LandingPage';
import { UiKitPage } from './pages/UiKitPage';
import { ApplicantPrecheckPage } from './pages/ApplicantPrecheckPage';
import { EmbedPrecheckPage } from './pages/EmbedPrecheckPage';
import { PortalAPage } from './pages/PortalAPage';
import { PortalBPage } from './pages/PortalBPage';
import { ApplicantRectificationPage } from './pages/ApplicantRectificationPage';
import { OfficerDashboardPage } from './pages/officer/OfficerDashboardPage';
import { CaseReviewPage } from './pages/officer/CaseReviewPage';
import { FindingReviewWorkstationPage } from './pages/officer/FindingReviewWorkstationPage';
import { RuleGovernancePage } from './pages/officer/RuleGovernancePage';
import { AuditLedgerPage } from './pages/officer/AuditLedgerPage';
import { EvidenceToolsPage } from './pages/officer/EvidenceToolsPage';
import { DecisionReplayPage } from './pages/officer/DecisionReplayPage';
import { CrossAppNetworkPage } from './pages/officer/CrossAppNetworkPage';
import { VerificationReportsPage } from './pages/officer/VerificationReportsPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { LegalPage } from './pages/LegalPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center font-mono text-xs text-slate">
            Loading Sakshya‑I5 Evidence System...
          </div>
        }
      >
        <Routes>
          {/* Standalone Embeddable Route (no shell wrapper) */}
          <Route path="/embed/precheck" element={<EmbedPrecheckPage />} />

          {/* Standalone Mock Host Portals A & B */}
          <Route path="/portal/a" element={<PortalAPage />} />
          <Route path="/portal/b" element={<PortalBPage />} />

          {/* Public Portal Routes */}
          <Route element={<PublicShell />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<LandingPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
            <Route path="/sitemap" element={<LegalPage type="sitemap" />} />
            <Route path="/help" element={<LegalPage type="help" />} />
            <Route path="/precheck" element={<ApplicantPrecheckPage />} />
            <Route path="/applicant/rectify/:id" element={<ApplicantRectificationPage />} />
            <Route path="/ui-kit" element={<UiKitPage />} />
          </Route>

          {/* Officer Console Routes */}
          <Route path="/officer" element={<OfficerShell />}>
            <Route index element={<OfficerDashboardPage />} />
            <Route path="queue" element={<OfficerDashboardPage />} />
            <Route path="cases" element={<OfficerDashboardPage />} />
            <Route path="case/:id" element={<CaseReviewPage />} />
            <Route path="cases/:id" element={<CaseReviewPage />} />
            <Route path="case/:id/review" element={<FindingReviewWorkstationPage />} />
            <Route path="cases/:id/review" element={<FindingReviewWorkstationPage />} />
            <Route path="case/:id/replay" element={<DecisionReplayPage />} />
            <Route path="cases/:id/replay" element={<DecisionReplayPage />} />
            <Route path="rules" element={<RuleGovernancePage />} />
            <Route path="tools" element={<EvidenceToolsPage />} />
            <Route path="network" element={<CrossAppNetworkPage />} />
            <Route path="reports" element={<VerificationReportsPage />} />
            <Route path="audit" element={<AuditLedgerPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
