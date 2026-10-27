import React from 'react';
import { LifecycleState } from '../../../types/domain';

interface LifecycleStripProps {
  stateCounts: Record<LifecycleState, number>;
  selectedState: LifecycleState | 'ALL';
  onSelectState: (state: LifecycleState | 'ALL') => void;
}

const ORDERED_LIFECYCLE_STATES: Array<{ state: LifecycleState; label: string }> = [
  { state: 'SUBMITTED', label: 'Submitted' },
  { state: 'PROCESSING', label: 'Processing' },
  { state: 'EVIDENCE_REVIEW', label: 'Evidence Review' },
  { state: 'READY_FOR_OFFICER_REVIEW', label: 'Ready for Review' },
  { state: 'UNDER_OFFICER_REVIEW', label: 'Under Review' },
  { state: 'NEEDS_CLARIFICATION', label: 'Needs Clarification' },
  { state: 'RESUBMITTED', label: 'Resubmitted' },
  { state: 'ESCALATED', label: 'Escalated' },
  { state: 'DECISION_RECORDED', label: 'Decision Recorded' },
  { state: 'CLOSED', label: 'Closed' },
  { state: 'EVIDENCE_INCOMPLETE', label: 'Incomplete' },
];

export const LifecycleStrip: React.FC<LifecycleStripProps> = ({
  stateCounts,
  selectedState,
  onSelectState,
}) => {
  const totalCount = Object.values(stateCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="border border-border bg-surface p-4 font-sans text-xs rounded-xs shadow-subtle">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b border-border">
        <span className="text-[12px] font-mono uppercase tracking-wider text-text-muted font-bold">
          Lifecycle State Stepper (§6 / §7)
        </span>
        <button
          onClick={() => onSelectState('ALL')}
          className={`text-xs px-2.5 py-1 border rounded-xs transition-colors font-medium ${
            selectedState === 'ALL'
              ? 'border-accent-2 bg-tint-teal text-accent-2 font-bold'
              : 'border-border text-text-muted hover:text-text hover:bg-surface-2'
          }`}
        >
          View All ({totalCount})
        </button>
      </div>

      {/* Wrapping Stepper (No scrollbar; responsive wrap across viewports) */}
      <div className="flex flex-wrap items-center gap-2">
        {ORDERED_LIFECYCLE_STATES.map((item) => {
          const count = stateCounts[item.state] || 0;
          const isSelected = selectedState === item.state;
          const isEscalated = item.state === 'ESCALATED';
          const isIncomplete = item.state === 'EVIDENCE_INCOMPLETE';

          return (
            <button
              key={item.state}
              onClick={() => onSelectState(item.state)}
              className={`flex items-center gap-2 px-3 py-1.5 border text-xs rounded-xs transition-colors ${
                isSelected
                  ? 'border-accent-2 bg-tint-teal text-accent-2 font-bold shadow-subtle'
                  : isEscalated && count > 0
                  ? 'border-st-deficiency bg-st-deficiency-bg text-st-deficiency font-semibold'
                  : isIncomplete && count > 0
                  ? 'border-st-review bg-st-review-bg text-st-review font-semibold'
                  : 'border-border bg-bg-elevated text-text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-xs font-mono text-[11px] ${
                  isSelected
                    ? 'bg-accent-2 text-accent-2-contrast'
                    : 'bg-surface-2 text-text font-bold'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
