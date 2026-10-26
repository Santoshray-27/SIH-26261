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
  return (
    <div className="border border-hairline bg-ink-surface p-3 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline/60">
        <span className="text-[10px] uppercase tracking-widest text-slate">
          Application Lifecycle State Machine (§6 / §7)
        </span>
        <button
          onClick={() => onSelectState('ALL')}
          className={`text-[11px] uppercase tracking-wider px-2 py-0.5 border ${
            selectedState === 'ALL'
              ? 'border-paper text-paper font-bold bg-bone/10'
              : 'border-transparent text-slate hover:text-paper'
          }`}
        >
          View All ({Object.values(stateCounts).reduce((a, b) => a + b, 0)})
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {ORDERED_LIFECYCLE_STATES.map((item, idx) => {
          const count = stateCounts[item.state] || 0;
          const isSelected = selectedState === item.state;
          const isEscalated = item.state === 'ESCALATED';
          const isIncomplete = item.state === 'EVIDENCE_INCOMPLETE';

          return (
            <React.Fragment key={item.state}>
              <button
                onClick={() => onSelectState(item.state)}
                className={`flex items-center gap-2 px-2.5 py-1.5 border text-xs whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'border-paper bg-ink text-paper font-semibold shadow-subtle'
                    : 'border-hairline/60 bg-ink-dark/60 text-slate hover:text-paper hover:border-hairline'
                }`}
              >
                <span className="text-[10px] text-slate/70">0{idx + 1}</span>
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-xs font-bold ${
                    count > 0
                      ? isEscalated
                        ? 'bg-vermilion text-white'
                        : isIncomplete
                        ? 'bg-ochre text-white'
                        : 'bg-paper text-ink'
                      : 'bg-ink-surface text-slate/60'
                  }`}
                >
                  {count}
                </span>
              </button>
              {idx < ORDERED_LIFECYCLE_STATES.length - 1 && (
                <span className="text-slate/40 text-[10px] select-none">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
