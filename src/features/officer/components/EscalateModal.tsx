import React, { useState } from 'react';
import { Finding } from '../../../types/domain';
import { Button } from '../../../components/ui/Button';
import { ShieldAlert, AlertTriangle, X, Send } from 'lucide-react';

interface EscalateModalProps {
  finding: Finding;
  onClose: () => void;
  onSubmit: (rationale: string, routingTarget: 'senior_officer' | 'vigilance_division') => Promise<void>;
  readOnly?: boolean;
}

export const EscalateModal: React.FC<EscalateModalProps> = ({
  finding,
  onClose,
  onSubmit,
  readOnly = false,
}) => {
  const [rationale, setRationale] = useState<string>('');
  const [routingTarget, setRoutingTarget] = useState<'senior_officer' | 'vigilance_division'>(
    finding.findingClass === 'integrity_concern' ? 'senior_officer' : 'vigilance_division'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationale.trim() || readOnly) return;
    setIsSubmitting(true);
    try {
      await onSubmit(rationale, routingTarget);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141413] border border-white/15 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#171715] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-vermilion" />
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE7DA]">
                Escalate Integrity Concern
              </h3>
              <p className="text-[11px] font-mono text-slate">
                Statutory Escalation & Vigilance Routing (§14)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Finding Reference Box */}
          <div className="p-3 bg-vermilion/10 border border-vermilion/20 rounded text-xs space-y-1">
            <div className="font-mono text-[10px] text-vermilion uppercase font-bold">
              Target Finding: {finding.id} · {finding.ruleId}
            </div>
            <div className="text-[#EDE7DA]">{finding.explanation}</div>
          </div>

          {/* Copy Rule Disclaimer */}
          <div className="p-3 bg-black/40 border border-white/10 rounded text-[11px] text-slate leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-ochre flex-shrink-0 mt-0.5" />
            <span>
              <strong>Copy Policy (§14):</strong> Classified as "indicator, requires review", never "forgery".
              Integrity concerns do NOT generate an applicant notice and are routed directly to Senior Officer / Vigilance review.
            </span>
          </div>

          {/* Escalation Route */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1.5">
              Escalation Destination:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoutingTarget('senior_officer')}
                className={`p-2.5 rounded border text-left text-xs font-mono transition-colors ${
                  routingTarget === 'senior_officer'
                    ? 'bg-vermilion/20 border-vermilion text-white font-bold'
                    : 'bg-[#1A1A18] border-white/10 text-slate hover:border-white/20'
                }`}
              >
                <div>Senior Officer Review</div>
                <div className="text-[10px] text-slate font-normal mt-0.5">Four-eyes scrutiny</div>
              </button>

              <button
                type="button"
                onClick={() => setRoutingTarget('vigilance_division')}
                className={`p-2.5 rounded border text-left text-xs font-mono transition-colors ${
                  routingTarget === 'vigilance_division'
                    ? 'bg-vermilion/20 border-vermilion text-white font-bold'
                    : 'bg-[#1A1A18] border-white/10 text-slate hover:border-white/20'
                }`}
              >
                <div>AICTE Vigilance Division</div>
                <div className="text-[10px] text-slate font-normal mt-0.5">Cross-cycle hash match</div>
              </button>
            </div>
          </div>

          {/* Escalation Rationale */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1.5">
              Officer Escalation Rationale (Mandatory):
            </label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Record forensic observation, reason for escalation, and specific queries for the Senior Reviewer..."
              rows={4}
              required
              className="w-full bg-[#1A1A18] border border-white/15 rounded p-3 text-xs text-[#EDE7DA] placeholder-slate focus:border-vermilion outline-none font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate hover:text-white transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={!rationale.trim() || readOnly || isSubmitting}
              variant="primary"
              className="flex items-center gap-1.5 !bg-vermilion hover:!bg-vermilion/90 text-white"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Routing...' : 'Escalate to Senior Review'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
