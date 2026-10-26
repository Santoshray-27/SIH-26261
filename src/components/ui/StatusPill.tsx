import React from 'react';
import { VerificationStatus } from '../../types/domain';
import { useI18n } from '../../i18n/useI18n';

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
  const info = t.statuses[status] || { label: status, caveat: 'Status check' };
  const displayLabel = label || info.label;

  let styleClasses = '';

  switch (status) {
    case 'PASS':
      styleClasses = 'bg-[#1F6B5C] text-white border-transparent';
      break;
    case 'DEFICIENCY_FOUND':
    case 'MISMATCH_FOUND':
      styleClasses = 'bg-[#D6361F] text-white border-transparent';
      break;
    case 'SIGNATURE_INVALID_OR_BROKEN':
      styleClasses = 'bg-[#D6361F] text-white border-[#D6361F]';
      break;
    case 'POSSIBLE_DUPLICATE':
    case 'MANUAL_REVIEW_REQUIRED':
      styleClasses = 'bg-[#C48A12] text-white border-transparent';
      break;
    case 'GEOTAG_ABSENT':
      styleClasses = 'bg-transparent text-[#C48A12] border-2 border-[#C48A12]';
      break;
    case 'LOW_CONFIDENCE_EXTRACTION':
      styleClasses = 'bg-[#FDF5E3] text-[#C48A12] border-2 border-dotted border-[#C48A12] dark:bg-[#1f1a10]';
      break;
    case 'SIGNATURE_VALID':
      styleClasses = 'bg-[#1F6B5C] text-white border-transparent';
      break;
    case 'STRUCTURE_INDICATOR':
      styleClasses = 'bg-[#1B2A49] text-white border-transparent';
      break;
    case 'SOURCE_UNAVAILABLE':
    case 'VERIFICATION_PENDING':
      styleClasses = 'bg-transparent text-[#6B6B66] border-2 border-dashed border-[#6B6B66] dark:text-[#a0a09a] dark:border-[#a0a09a]';
      break;
    case 'CHECK_NOT_RUN':
      styleClasses = 'bg-transparent text-[#6B6B66] border border-current relative overflow-hidden';
      break;
    default:
      styleClasses = 'bg-slate-200 text-slate-700';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 tracking-tight',
    md: 'text-xs px-2.5 py-1 tracking-tight font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-medium',
  }[size];

  return (
    <div className={`relative group inline-block ${className}`}>
      <span
        tabIndex={0}
        aria-label={`${info.label}. Limitation note: ${info.caveat}`}
        className={`inline-flex items-center gap-1.5 rounded-sm font-mono uppercase transition-transform select-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-ink ${sizeClasses} ${styleClasses}`}
      >
        {status === 'CHECK_NOT_RUN' && (
          <span className="absolute inset-0 hatch-pattern pointer-events-none" />
        )}
        <span className="relative z-10">{displayLabel}</span>
      </span>

      {showCaveatTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex group-focus-within:flex flex-col z-50 pointer-events-none w-64 bg-ink dark:bg-[#EDE7DA] text-paper dark:text-[#0C0C0B] p-2.5 rounded shadow-floating text-left"
        >
          <div className="font-mono text-[10px] uppercase text-ochre dark:text-[#7A5405] tracking-wider mb-1 font-semibold flex items-center justify-between">
            <span>Evidence Limitation</span>
            <span>§3.3</span>
          </div>
          <p className="text-xs font-sans leading-tight">
            {info.caveat}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink dark:border-t-[#EDE7DA]" />
        </div>
      )}
    </div>
  );
};
