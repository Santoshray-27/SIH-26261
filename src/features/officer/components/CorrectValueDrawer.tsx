import React, { useState } from 'react';
import { ExtractedField } from '../../../types/domain';
import { Button } from '../../../components/ui/Button';
import { Drawer } from '../../../components/ui/Drawer';
import { History, ShieldCheck } from 'lucide-react';

interface CorrectValueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  field: ExtractedField | null;
  onSubmit: (fieldId: string, correctedValue: string, reason: string) => Promise<void>;
  readOnly?: boolean;
}

export const CorrectValueDrawer: React.FC<CorrectValueDrawerProps> = ({
  isOpen,
  onClose,
  field,
  onSubmit,
  readOnly = false,
}) => {
  const [correctedValue, setCorrectedValue] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  React.useEffect(() => {
    if (field) {
      setCorrectedValue(field.reviewerCorrectedValue || field.rawValue);
      setReason(field.correctionReason || '');
    }
  }, [field]);

  if (!field) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctedValue.trim() || !reason.trim() || readOnly) return;
    setIsSubmitting(true);
    try {
      await onSubmit(field.id, correctedValue.trim(), reason.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Correct Extracted Field Value">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-3.5 bg-black/40 border border-white/10 rounded text-xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate">Field Name</div>
          <div className="font-mono text-white font-bold text-sm">{field.fieldName}</div>
          <div className="text-[11px] text-slate">Document: {field.documentId} · Page {field.page || 1}</div>
        </div>

        {/* Audit preservation rule note */}
        <div className="p-3 bg-[#1B2A49]/30 border border-[#1B2A49] rounded text-[11px] text-slate flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-verdigris flex-shrink-0 mt-0.5" />
          <span>
            <strong>Immutable Provenance Rule:</strong> Pramāṇa never overwrites values in place.
            Your correction creates a superseding record linked to your officer ID with timestamp.
          </span>
        </div>

        {/* Old Value vs New Value */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">
              Raw Extracted Value (Preserved in ledger):
            </label>
            <div className="p-3 bg-[#1A1A18] border border-white/10 rounded font-mono text-xs text-slate break-all select-all">
              {field.rawValue}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#EDE7DA] mb-1">
              Superseding Corrected Value (New):
            </label>
            <input
              type="text"
              value={correctedValue}
              onChange={(e) => setCorrectedValue(e.target.value)}
              className="w-full bg-[#1A1A18] border border-white/20 rounded p-3 text-xs text-white font-mono focus:border-verdigris outline-none"
              placeholder="Enter corrected value as read from document..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#EDE7DA] mb-1">
              Correction Reason & Justification (Mandatory):
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full bg-[#1A1A18] border border-white/20 rounded p-3 text-xs text-white font-mono focus:border-verdigris outline-none"
              placeholder="e.g. OCR misread ligature 'fl' as 'fi'; verified against original high-resolution scan page 1."
              required
            />
          </div>
        </div>

        {/* Previous Correction History if any */}
        {field.correctionProvenance && (
          <div className="p-3 bg-black/30 border border-white/5 rounded text-[11px] font-mono text-slate space-y-1">
            <div className="text-ochre flex items-center gap-1">
              <History className="w-3.5 h-3.5" />
              <span>Prior Correction Record</span>
            </div>
            <div>Officer: {field.correctionProvenance.officerId}</div>
            <div>Timestamp: {new Date(field.correctionProvenance.timestamp).toLocaleString()}</div>
            <div className="text-white/80 italic">"{field.correctionReason}"</div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button
            type="submit"
            disabled={!correctedValue.trim() || !reason.trim() || readOnly || isSubmitting}
            variant="primary"
          >
            {isSubmitting ? 'Recording...' : 'Record Superseding Value'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
