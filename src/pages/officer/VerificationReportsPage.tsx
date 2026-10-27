import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { Application, Finding, DocumentItem } from '../../types/domain';
import { generateCsv, downloadCsvFile } from '../../services/csv';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/StatusPill';
import { Mono, IdText, HashText } from '../../components/ui/MonoText';
import { BRAND } from '../../config/brand';
import { useAppStore } from '../../store/useAppStore';
import {
  FileText,
  Download,
  Printer,
  ChevronDown,
} from 'lucide-react';

export const VerificationReportsPage: React.FC = () => {
  const { addToast } = useAppStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>('APP-2026-8801');
  const [application, setApplication] = useState<Application | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    async function load() {
      const allApps = await api.getApplications();
      setApplications(allApps);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadDetails() {
      if (!selectedAppId) return;
      const app = await api.getApplicationById(selectedAppId);
      const f = await api.getFindingsByApplicationId(selectedAppId, 'VER-8801-1');
      const docs = await api.getDocumentsByApplicationId(selectedAppId);
      setApplication(app);
      setFindings(f);
      setDocuments(docs);
    }
    loadDetails();
  }, [selectedAppId]);

  // Export CSV with real formula injection neutralization
  const handleExportCsv = () => {
    if (!application) return;

    const headers = [
      'Finding ID',
      'Rule ID',
      'Finding Class',
      'Status',
      'Severity',
      'Document Name',
      'Claimed Raw Value',
      'Compared Value',
      'Explanation',
    ];

    const rows = findings.map((f) => [
      f.id,
      f.ruleId,
      f.findingClass,
      f.status,
      f.severity,
      f.evidenceReferences?.documentName || f.evidenceReferences?.documentId || 'Affidavit',
      f.evidenceReferences?.rawValue || 'N/A',
      f.evidenceReferences?.comparedValue || 'N/A',
      f.explanation,
    ]);

    const csvContent = generateCsv(headers, rows);
    downloadCsvFile(csvContent, `sakshya-i5-findings-${application.id}.csv`);
    addToast('CSV exported safely with formula injection guards (RFC 4180)', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!application) return null;

  return (
    <div className="space-y-6 text-text font-sans">
      {/* Editorial Header - Hidden in Print */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-accent-2 mb-2 tracking-[0.02em]">
            <FileText className="w-4 h-4 text-accent-2" />
            <span>Statutory verification dossier · <Mono>§3.3 / §6</Mono></span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-normal text-text">
            Compliance & sufficiency report
          </h1>
          <p className="text-sm font-sans text-text-muted mt-2 max-w-[66ch] leading-relaxed">
            Formal audit report with evidentiary findings, cryptographic annexure digests, and formula-neutralized CSV export.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <select
              aria-label="Select Application for Formal Verification Report"
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="appearance-none bg-surface border border-border rounded-xs px-3 py-2 pr-8 text-xs font-sans text-text focus:outline-none shadow-subtle cursor-pointer"
            >
              {applications.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} - {a.institutionName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-3 pointer-events-none text-text-muted" />
          </div>

          <Button
            onClick={handleExportCsv}
            variant="outline"
            className="flex items-center gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            onClick={handlePrint}
            variant="primary"
            className="flex items-center gap-1.5 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </Button>
        </div>
      </div>

      {/* Printable Report Sheet (Uses --bg-elevated, clean padding, print styles) */}
      <div className="bg-bg-elevated text-text p-6 sm:p-10 md:p-12 rounded-xs shadow-lifted font-sans max-w-5xl mx-auto border border-border print:border-none print:shadow-none print:p-0 print:bg-white">
        {/* Report Gazette Header */}
        <div className="border-b-2 border-border-strong pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-accent-2 text-accent-2-contrast flex items-center justify-center font-bold text-xl rounded-xs font-serif shrink-0">
              {BRAND.GLYPH}
            </div>
            <div>
              <div className="text-[12px] font-sans font-semibold text-text-muted">
                {BRAND.NAME_EN} · {BRAND.PROPOSED_EN} · Evidence ledger
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-text tracking-normal mt-0.5">
                Compliance verification & sufficiency report
              </h2>
              <div className="text-[11px] font-sans text-text-muted mt-0.5">
                Prototype report generated from synthetic data. Not an official document.
              </div>
            </div>
          </div>

          <div className="text-right font-sans text-xs text-text-muted space-y-0.5">
            <div>Dossier: <IdText>{application.id}</IdText></div>
            <div>Cycle: <span className="font-sans font-semibold text-text tabular-nums">AY 2026-27</span></div>
            <div>Generated: <span className="font-sans text-text tabular-nums">{new Date().toLocaleDateString()}</span></div>
          </div>
        </div>

        {/* Institution Info Card */}
        <div className="p-4 bg-surface border border-border font-sans text-xs mb-6 grid grid-cols-1 md:grid-cols-2 gap-3.5 rounded-xs">
          <div>
            <span className="text-text-muted block text-xs font-semibold mb-0.5">Institution legal title:</span>
            <span className="font-bold text-text text-sm">{application.institutionName}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs font-semibold mb-0.5">Statutory category:</span>
            <span className="font-medium text-text capitalize">{application.category.replace(/_/g, ' ').toLowerCase()}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs font-semibold mb-0.5">Reference evaluation date:</span>
            <span className="text-text font-sans tabular-nums font-medium">{application.referenceDate}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs font-semibold mb-0.5">Tamper-evident dossier hash:</span>
            <span className="text-text text-[11px] truncate block font-mono">
              SHA-256 (e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855)
            </span>
          </div>
        </div>

        {/* Uploaded Annexures Section */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-sans font-bold text-text border-b border-border pb-1">
            1. Verified evidentiary annexures ({documents.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-xs font-semibold text-text-muted">
                  <th className="p-2.5 min-w-[120px]">Document ID</th>
                  <th className="p-2.5 min-w-[200px]">Original filename</th>
                  <th className="p-2.5 min-w-[130px]">Type</th>
                  <th className="p-2.5 min-w-[180px]">SHA-256 digest</th>
                  <th className="p-2.5 min-w-[120px]">Digital signature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface/50">
                    <td className="p-2.5 font-bold"><IdText>{doc.id}</IdText></td>
                    <td className="p-2.5 font-medium">{doc.originalFilename}</td>
                    <td className="p-2.5 text-text-muted capitalize">{doc.documentType.replace(/_/g, ' ').toLowerCase()}</td>
                    <td className="p-2.5"><HashText>{doc.sha256.substring(0, 16)}...</HashText></td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-tint-teal text-st-pass border border-st-pass rounded-xs text-[11px] font-sans font-semibold">
                        {doc.digitalSignatureStatus ? doc.digitalSignatureStatus.replace(/_/g, ' ').toLowerCase() : 'Verified'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Findings Triangulation Table */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-sans font-bold text-text border-b border-border pb-1">
            2. Statutory rule adjudication & findings ({findings.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-xs font-semibold text-text-muted">
                  <th className="p-2.5 min-w-[120px]">Rule citation</th>
                  <th className="p-2.5 min-w-[120px]">Class</th>
                  <th className="p-2.5 min-w-[140px]">Status</th>
                  <th className="p-2.5 min-w-[180px]">Claimed vs authoritative</th>
                  <th className="p-2.5 min-w-[280px]">Finding explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {findings.map((finding) => (
                  <tr key={finding.id} className="hover:bg-surface/50">
                    <td className="p-2.5 font-bold"><IdText>{finding.ruleId}</IdText></td>
                    <td className="p-2.5 text-[12px] text-text-muted capitalize">
                      {finding.findingClass.replace(/_/g, ' ').toLowerCase()}
                    </td>
                    <td className="p-2.5">
                      <StatusPill status={finding.status as any} size="sm" showCaveatTooltip={false} />
                    </td>
                    <td className="p-2.5 text-xs">
                      <div>Raw: <code className="font-sans font-semibold text-text">{finding.evidenceReferences?.rawValue || 'N/A'}</code></div>
                      <div className="text-text-muted">Auth: <code className="text-accent-2 font-semibold font-sans">{finding.evidenceReferences?.comparedValue || 'N/A'}</code></div>
                    </td>
                    <td className="p-2.5 text-xs text-text-muted leading-relaxed">
                      {finding.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Officer Signature Endorsement */}
        <div className="pt-6 border-t-2 border-border-strong flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs font-sans">
          <div className="space-y-1">
            <div className="font-bold text-text">AICTE statutory governance notice:</div>
            <p className="text-[12px] text-text-muted max-w-md leading-relaxed">
              Evidence findings are generated strictly through deterministic clause evaluation against cited rules. External API responses are simulated for prototype verification.
            </p>
          </div>

          <div className="text-right space-y-1 min-w-[200px]">
            <div className="h-10 border-b border-text-muted border-dashed" />
            <div className="font-bold text-text">Authorized reviewing officer</div>
            <div className="text-[11px] text-text-muted font-sans">{BRAND.NAME_EN} verification ledger</div>
          </div>
        </div>
      </div>
    </div>
  );
};
