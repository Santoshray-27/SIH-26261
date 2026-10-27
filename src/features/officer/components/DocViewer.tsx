import React from 'react';
import { DocumentItem } from '../../../types/domain';
import { FileText, ZoomIn, ZoomOut, Hash, ShieldCheck } from 'lucide-react';

interface DocViewerProps {
  document: DocumentItem | null;
  page?: number;
  bbox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] relative pixels/percent
  fieldName?: string;
  rawValue?: string;
}

export const DocViewer: React.FC<DocViewerProps> = ({
  document,
  page = 1,
  bbox,
  fieldName,
}) => {
  const [zoom, setZoom] = React.useState<number>(100);

  if (!document) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-surface border border-border rounded">
        <FileText className="w-10 h-10 text-slate/40 mb-3" />
        <p className="font-mono text-xs text-slate">No document cited for this finding</p>
      </div>
    );
  }

  // Simulated synthetic document rendering with cited bounding box overlay
  return (
    <div className="h-full flex flex-col bg-surface border border-border rounded overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-2.5 bg-surface-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-4 h-4 text-verdigris flex-shrink-0" />
          <span className="font-mono text-xs text-text truncate" title={document.originalFilename}>
            {document.originalFilename}
          </span>
          <span className="text-[10px] font-mono text-slate px-1.5 py-0.5 bg-black/30 rounded">
            P. {page} / {document.pageCount || 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-2 border border-border rounded px-1">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="p-1 hover:text-text text-slate transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] text-slate px-1.5">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(180, z + 10))}
              className="p-1 hover:text-text text-slate transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-auto p-4 bg-bg flex justify-center items-start">
        <div
          style={{ width: `${(zoom / 100) * 540}px` }}
          className="transition-all duration-150 relative bg-surface text-text shadow-2xl rounded-sm p-8 min-h-[680px] font-serif border border-border select-none"
        >
          {/* Subtle printed document watermark & stamp */}
          <div className="absolute top-4 right-4 text-right opacity-80 pointer-events-none">
            <div className="text-[9px] font-mono tracking-tighter text-text-muted uppercase">
              AICTE Evidence Ledger
            </div>
            <div className="text-[8px] font-mono text-text-muted">
              HASH: {document.sha256.substring(0, 12)}...
            </div>
          </div>

          <div className="border-b-2 border-border-strong pb-3 mb-6 text-center">
            <div className="text-[10px] uppercase tracking-widest font-mono text-text-muted mb-1">
              Statutory Submission · Form Annexure
            </div>
            <h3 className="text-base font-bold font-serif uppercase tracking-tight text-text">
              {document.documentType.replace(/_/g, ' ')}
            </h3>
            <p className="text-[10px] text-text-muted mt-0.5">
              Ref: {document.id} · Timestamp: {new Date(document.uploadTimestamp).toLocaleDateString()}
            </p>
          </div>

          {/* Document Content Simulation */}
          <div className="space-y-4 text-[11px] leading-relaxed text-text">
            <p>
              BEFORE THE COMPETENT RECOGNITION AND APPROVAL AUTHORITY, NEW DELHI.
            </p>

            <div className="p-3 bg-surface-2 border border-border text-[10px] font-mono">
              <div className="flex justify-between py-0.5 border-b border-border">
                <span className="text-text-muted">Institution Identifier:</span>
                <span className="font-bold text-text">AP-TS-2018-REG-8801</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-border">
                <span className="text-text-muted">Legal Deponent:</span>
                <span className="font-bold text-text">{document.uploaderLabel}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-text-muted">Academic Cycle:</span>
                <span className="font-bold text-text">2026 – 2027</span>
              </div>
            </div>

            <p className="text-[10.5px]">
              I, the undersigned authorized signatory, do solemnly affirm and state on oath that the
              declarations furnished herewith pertaining to accreditation, land titles, and infrastructure
              conform in full measure to the statutory criteria framed by the Council.
            </p>

            <div className="my-6 space-y-3 pl-2 border-l-2 border-border">
              <div className="text-[11px]">
                <strong>Item 1. Institution Name & Headquarters:</strong>
                <div className="mt-1 p-1.5 bg-surface-2 border border-border font-mono text-[11px]">
                  "Sri Vidya Inst of Technology", Hyderabad Urban Cluster, TS
                </div>
              </div>

              <div className="text-[11px]">
                <strong>Item 2. Accreditation Accreditation Period:</strong>
                <div className="mt-1 p-1.5 bg-surface-2 border border-border font-mono text-[11px]">
                  Validity Period: 01-07-2023 to 31-12-2025 (Tier II UG Programs)
                </div>
              </div>

              <div className="text-[11px]">
                <strong>Item 3. Carpet Area Declaration:</strong>
                <div className="mt-1 p-1.5 bg-surface-2 border border-border font-mono text-[11px]">
                  Declared Total Instructional & Admin Carpet Area: 8,450 sq.m.
                </div>
              </div>
            </div>

            <p className="text-[10px] text-text-muted italic">
              Deponent verified through self-attestation and digital token signature. Any false representation
              shall invite penal prosecution under relevant statutes.
            </p>
          </div>

          {/* Bounding Box Visual Overlay if bbox provided */}
          {bbox && (
            <div
              style={{
                top: `${bbox[0]}px`,
                left: `${bbox[1]}px`,
                height: `${Math.max(28, bbox[2] - bbox[0])}px`,
                width: `${Math.max(120, bbox[3] - bbox[1])}px`,
              }}
              className="absolute border-2 border-vermilion bg-vermilion/15 shadow-[0_0_12px_rgba(214,54,31,0.35)] rounded pointer-events-none animate-pulse transition-all duration-300"
            >
              <div className="absolute -top-5 left-0 px-1.5 py-0.5 bg-vermilion text-text font-mono text-[9px] uppercase tracking-wider font-bold rounded-t whitespace-nowrap flex items-center gap-1 shadow-sm">
                <span>CITED REGION</span>
                {fieldName && <span className="opacity-80">· {fieldName}</span>}
              </div>
            </div>
          )}

          {/* Stamp footer */}
          <div className="mt-10 pt-4 border-t border-border flex items-center justify-between text-[9px] font-mono text-text-muted">
            <div className="flex items-center gap-1 text-verdigris">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIGITALLY SIGNED (CCA-INDIA)</span>
            </div>
            <div>PAGE {page} OF {document.pageCount || 1}</div>
          </div>
        </div>
      </div>

      {/* Footer bar with cryptographic hash */}
      <div className="px-4 py-2 bg-surface-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-slate">
        <div className="flex items-center gap-2">
          <Hash className="w-3.5 h-3.5 text-slate/70" />
          <span className="text-text/70">SHA-256:</span>
          <span className="text-text font-mono text-[10.5px]">
            {document.sha256}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-verdigris text-[10.5px]">
          <ShieldCheck className="w-3 h-3" />
          <span>Tamper-evident archive</span>
        </div>
      </div>
    </div>
  );
};
