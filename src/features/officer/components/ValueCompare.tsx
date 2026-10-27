import React from 'react';
import { Finding, ExtractedField } from '../../../types/domain';
import { StatusPill } from '../../../components/ui/StatusPill';
import { CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';

interface ValueCompareProps {
  finding: Finding;
  extractedField?: ExtractedField | null;
  onOpenCorrectDrawer?: () => void;
  readOnly?: boolean;
}

export const ValueCompare: React.FC<ValueCompareProps> = ({
  finding,
  extractedField,
  onOpenCorrectDrawer,
  readOnly = false,
}) => {
  const raw = finding.evidenceReferences.rawValue || extractedField?.rawValue || '—';
  const compared = finding.evidenceReferences.comparedValue || extractedField?.normalizedValue || '—';
  const hasMismatch = finding.status === 'MISMATCH_FOUND' || finding.status === 'DEFICIENCY_FOUND';

  return (
    <div className="h-full flex flex-col bg-surface border border-border rounded overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-surface-2 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            EVIDENCE COMPARISON LAYER
          </div>
          <h4 className="text-sm font-serif font-bold text-text mt-0.5">
            Value Triangulation & Verification
          </h4>
        </div>
        <StatusPill status={finding.status} />
      </div>

      <div className="flex-1 p-5 overflow-auto space-y-6">
        {/* Tri-value grid: Raw vs Normalized/Extracted vs Authority/Compared */}
        <div className="space-y-4">
          {/* Card 1: Raw Document Claim */}
          <div className="p-4 bg-surface-2 border border-border rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-slate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate" />
                Raw Document Extraction (OCR)
              </span>
              <span className="text-[10px] font-mono text-slate/70">
                Method: {extractedField?.extractionMethod || 'Tesseract OCR v5.3'}
              </span>
            </div>
            <div className="font-mono text-xs text-text bg-surface-2 p-3 rounded border border-border break-all">
              {finding.evidenceReferences.rawField && (
                <div className="text-[10px] text-slate mb-1">
                  {finding.evidenceReferences.rawField}
                </div>
              )}
              <div className="text-text font-medium text-sm">{raw}</div>
            </div>
            {extractedField?.reviewerCorrectedValue && (
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono">
                <span className="text-ochre">Superseded by officer correction:</span>
                <span className="text-text font-bold">{extractedField.reviewerCorrectedValue}</span>
              </div>
            )}
          </div>

          {/* Comparison Operator indicator */}
          <div className="flex items-center justify-center -my-2 relative z-10">
            <div className="px-3 py-1 bg-surface-2 border border-border rounded-full text-[10px] font-mono flex items-center gap-1.5 shadow-md">
              <Cpu className="w-3 h-3 text-verdigris" />
              <span className="text-slate uppercase tracking-wider">
                {finding.findingClass === 'integrity_concern'
                  ? 'Normalized String Distance & Cross-Check'
                  : 'Threshold & Effective Cutoff Logic'}
              </span>
            </div>
          </div>

          {/* Card 2: Authoritative or Compared Record */}
          <div className={`p-4 rounded border ${hasMismatch ? 'bg-vermilion/5 border-vermilion/30' : 'bg-surface-2 border-border'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-slate flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${hasMismatch ? 'bg-vermilion' : 'bg-verdigris'}`} />
                Authoritative / Compared Authority Value
              </span>
              <span className="text-[10px] font-mono text-slate/70">
                Reference Source
              </span>
            </div>
            <div className="font-mono text-xs text-text bg-surface-2 p-3 rounded border border-border break-all">
              {finding.evidenceReferences.comparedField && (
                <div className="text-[10px] text-slate mb-1">
                  {finding.evidenceReferences.comparedField}
                </div>
              )}
              <div className="text-text font-medium text-sm">{compared}</div>
            </div>
          </div>
        </div>

        {/* Delta Analysis Box */}
        <div className="p-4 bg-black/30 border border-border rounded space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate flex items-center gap-1.5">
            {hasMismatch ? (
              <AlertTriangle className="w-3.5 h-3.5 text-vermilion" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-verdigris" />
            )}
            <span>Finding Explanation & Forensic Note</span>
          </div>
          <p className="text-xs text-text leading-relaxed">
            {finding.explanation}
          </p>
          {finding.explanationHi && (
            <p className="text-xs text-slate/90 font-serif leading-relaxed pt-2 border-t border-border">
              {finding.explanationHi}
            </p>
          )}
        </div>

        {/* Correction Action Callout */}
        {extractedField && (
          <div className="pt-2">
            <div className="flex items-center justify-between p-3 bg-st-structure/30 border border-st-structure rounded">
              <div className="text-xs">
                <div className="font-bold text-text">Need to correct OCR transcription error?</div>
                <div className="text-[11px] text-text-muted mt-0.5">
                  Corrections create a tamper-evident audit record and supersede raw values.
                </div>
              </div>
              <button
                onClick={onOpenCorrectDrawer}
                disabled={readOnly}
                className="px-3 py-1.5 bg-surface hover:bg-surface-2 border border-border text-text font-mono text-xs rounded-xs transition-colors disabled:opacity-40"
              >
                Correct Value (C)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
