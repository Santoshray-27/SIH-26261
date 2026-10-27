import React from 'react';
import { VerificationStatus } from '../../types/domain';
import { useI18n } from '../../i18n/useI18n';
import { Check, AlertTriangle, AlertCircle, HelpCircle, FileText, Clock, Minus } from 'lucide-react';

interface StatusPillProps {
  status: VerificationStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showCaveatTooltip?: boolean;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  size = 'md',
  showCaveatTooltip = true,
  className = '',
}) => {
  const { t } = useI18n();
  const info = {
    label: t(`status:${status}.label`, { defaultValue: status }),
    caveat: t(`status:${status}.caveat`, { defaultValue: 'Status check' }),
  };
  const displayLabel = label || info.label;

  let styleClasses = '';
  let Icon = Check;

  switch (status) {
    case 'PASS':
      styleClasses = 'bg-st-pass-bg text-st-pass border border-st-pass-border font-bold';
      Icon = Check;
      break;
    case 'DEFICIENCY_FOUND':
    case 'MISMATCH_FOUND':
      styleClasses = 'bg-st-deficiency-bg text-st-deficiency border border-st-deficiency-border font-bold';
      Icon = AlertCircle;
      break;
    case 'SIGNATURE_INVALID_OR_BROKEN':
      styleClasses = 'bg-st-deficiency-bg text-st-deficiency border-2 border-st-deficiency font-bold';
      Icon = AlertCircle;
      break;
    case 'POSSIBLE_DUPLICATE':
    case 'MANUAL_REVIEW_REQUIRED':
      styleClasses = 'bg-st-review-bg text-st-review border border-st-review-border font-bold';
      Icon = AlertTriangle;
      break;
    case 'GEOTAG_ABSENT':
      styleClasses = 'bg-transparent text-st-review border-2 border-st-review-border font-bold';
      Icon = AlertTriangle;
      break;
    case 'LOW_CONFIDENCE_EXTRACTION':
      styleClasses = 'bg-st-review-bg text-st-review border-2 border-dotted border-st-review font-bold';
      Icon = AlertTriangle;
      break;
    case 'SIGNATURE_VALID':
      styleClasses = 'bg-st-pass-bg text-st-pass border border-st-pass-border font-bold';
      Icon = Check;
      break;
    case 'STRUCTURE_INDICATOR':
      styleClasses = 'bg-st-structure-bg text-st-structure border border-st-structure-border font-bold';
      Icon = FileText;
      break;
    case 'SOURCE_UNAVAILABLE':
    case 'VERIFICATION_PENDING':
      styleClasses = 'bg-st-unavailable-bg text-st-unavailable border-2 border-dashed border-st-unavailable-border font-bold';
      Icon = Clock;
      break;
    case 'CHECK_NOT_RUN':
      styleClasses = 'bg-transparent text-st-unavailable border border-border font-medium relative overflow-hidden';
      Icon = Minus;
      break;
    default:
      styleClasses = 'bg-surface-2 text-text-muted border border-border';
      Icon = HelpCircle;
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 min-h-[24px] font-sans font-semibold leading-normal whitespace-nowrap',
    md: 'text-[13px] px-3 py-1 min-h-[26px] font-sans font-semibold leading-normal whitespace-nowrap',
    lg: 'text-sm px-3.5 py-1 min-h-[28px] font-sans font-semibold leading-normal whitespace-nowrap',
  }[size];

  return (
    <div className={`relative group inline-flex items-center ${className}`}>
      <span
        tabIndex={0}
        aria-label={`${info.label}. Limitation note: ${info.caveat}`}
        className={`inline-flex items-center gap-1.5 rounded-xs font-sans transition-colors select-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-focus-ring ${sizeClasses} ${styleClasses}`}
      >
        {status === 'CHECK_NOT_RUN' && (
          <span className="absolute inset-0 hatch-pattern pointer-events-none" />
        )}
        <Icon size={13} strokeWidth={2.2} className="shrink-0 relative z-10" />
        <span className="relative z-10 tracking-normal">{displayLabel}</span>
      </span>

      {showCaveatTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus-within:flex flex-col z-50 pointer-events-none w-64 bg-surface border border-border-strong text-text p-2.5 rounded-xs shadow-floating text-left"
        >
          <div className="font-sans text-[11px] font-semibold text-st-review mb-1 flex items-center justify-between">
            <span>Evidence limitation</span>
            <span className="font-mono">§3.3</span>
          </div>
          <p className="text-xs font-sans leading-tight text-text-muted">
            {info.caveat}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-surface" />
        </div>
      )}
    </div>
  );
};
