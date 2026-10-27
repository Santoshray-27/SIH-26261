import React, { useState } from 'react';
import { mockDocuments } from '../../mock/mockData';
import { UploadCloud, FileCheck, AlertTriangle, Hash, Copy, Check } from 'lucide-react';
import { StatusPill } from '../../components/ui/StatusPill';

interface HashMatch {
  matched: boolean;
  sha256: string;
  matchedDoc?: (typeof mockDocuments)[0];
  fileName: string;
  byteSize: number;
}

export const DuplicateCheckTool: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [result, setResult] = useState<HashMatch | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const computeFileHash = async (file: File) => {
    setIsComputing(true);
    setResult(null);

    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const sha256 = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // Compare against seeded mock document hashes
      const match = mockDocuments.find(
        (doc) => doc.sha256.toLowerCase() === sha256.toLowerCase()
      );

      setResult({
        matched: !!match,
        sha256,
        matchedDoc: match,
        fileName: file.name,
        byteSize: file.size,
      });
    } catch (err) {
      console.error('Error computing hash in browser:', err);
    } finally {
      setIsComputing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      computeFileHash(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      computeFileHash(e.target.files[0]);
    }
  };

  const copyHash = () => {
    if (result) {
      navigator.clipboard.writeText(result.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to test with the known duplicate hash from the hero case
  const testKnownDuplicate = () => {
    const known = mockDocuments.find((d) => d.id === 'DOC-8801-04');
    if (known) {
      setResult({
        matched: true,
        sha256: known.sha256,
        matchedDoc: known,
        fileName: 'Land_Title_Deed_Copy.pdf (Synthetic Seed)',
        byteSize: known.byteSize,
      });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-surface-2 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[12px] font-sans font-semibold text-text-muted">
            Crypto evidence tool · <span className="font-mono text-[0.9em]">§3.3</span>
          </div>
          <h3 className="text-sm font-sans font-bold text-text mt-0.5">
            Client-side SHA-256 duplicate check
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-surface-2 border border-border rounded-xs font-sans text-[11px] font-semibold text-st-pass">
            Computed locally (Web Crypto API)
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-xs text-text-muted leading-relaxed">
          Drop any local file. Your browser computes the SHA-256 cryptographic digest locally via the
          native Web Crypto API (<code className="font-mono text-text bg-surface-2 px-1 py-0.5 rounded-xs border border-border">crypto.subtle.digest</code>).
          The file is never transmitted to any external server.
        </p>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-md p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-st-review bg-st-review-bg'
              : 'border-border bg-surface hover:border-border-strong'
          }`}
          onClick={() => document.getElementById('duplicate-file-input')?.click()}
        >
          <input
            id="duplicate-file-input"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-text-muted mx-auto mb-2" />
          <div className="text-xs font-sans text-text font-semibold">
            {isComputing ? 'Computing digest locally...' : 'Drop any file here or click to browse'}
          </div>
          <div className="text-[11px] text-text-muted mt-1 font-sans">
            PDF, JPG, PNG, DOCX — any format supported
          </div>
        </div>

        {/* Quick Test Button */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={testKnownDuplicate}
            className="text-xs font-sans font-semibold text-accent-2 hover:underline flex items-center gap-1"
          >
            <span>Load known duplicate hash (DOC-8801-04 Land Deed collision)</span>
          </button>
          <span className="text-xs font-sans text-text-muted">Cross-application hash registry</span>
        </div>

        {/* Computation Result */}
        {result && (
          <div
            className={`p-4 rounded border transition-all ${
              result.matched
                ? 'bg-ochre/10 border-ochre/30'
                : 'bg-verdigris/10 border-verdigris/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {result.matched ? (
                    <StatusPill status="POSSIBLE_DUPLICATE" />
                  ) : (
                    <StatusPill status="PASS" label="NO REPOSITORY MATCH" />
                  )}
                  <span className="font-mono text-xs text-text font-bold truncate">
                    {result.fileName}
                  </span>
                  <span className="font-mono text-[10px] text-slate">
                    ({(result.byteSize / 1024).toFixed(1)} KB)
                  </span>
                </div>

                {/* Hash row */}
                <div className="flex items-center gap-2 pt-1">
                  <Hash className="w-3.5 h-3.5 text-slate flex-shrink-0" />
                  <span className="font-mono text-[11px] text-text break-all select-all">
                    {result.sha256}
                  </span>
                  <button
                    onClick={copyHash}
                    className="p-1 hover:text-text text-slate transition-colors flex-shrink-0"
                    title="Copy SHA-256"
                  >
                    {copied ? <Check className="w-3 h-3 text-verdigris" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {/* Match Details */}
                {result.matched && result.matchedDoc && (
                  <div className="mt-3 pt-3 border-t border-ochre/20 text-xs space-y-1 font-mono">
                    <div className="text-ochre font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Cross-Application Document Match Detected</span>
                    </div>
                    <div className="text-slate text-[11px]">
                      Collision with: <span className="text-text font-bold">{result.matchedDoc.id}</span> ({result.matchedDoc.originalFilename})
                    </div>
                    <div className="text-slate text-[11px]">
                      Target Application: <span className="text-text font-bold">{result.matchedDoc.applicationId}</span>
                    </div>
                    <div className="text-[10px] text-slate pt-1">
                      Statutory rule: Byte-identical cross-application submissions require Senior Review / Vigilance scrutiny (§14).
                    </div>
                  </div>
                )}

                {!result.matched && (
                  <div className="text-[11px] font-mono text-verdigris mt-2 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Unique document hash. No collision found in current cycle or preceding 3 cycles.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
