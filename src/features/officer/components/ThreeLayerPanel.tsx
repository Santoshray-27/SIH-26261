import React from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { GateEvaluationOutput } from '../../../services/gate';

interface ThreeLayerPanelProps {
  checkResultsSummary: {
    passed: number;
    failedOrDeficient: number;
    unavailableOrPending: number;
  };
  gateOutput: GateEvaluationOutput | null;
  officerDecision: {
    state: string;
    assignedOfficer: string;
  };
}

export const ThreeLayerPanel: React.FC<ThreeLayerPanelProps> = ({
  checkResultsSummary,
  gateOutput,
  officerDecision,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
      {/* Plane 1: Check Results */}
      <div className="border border-hairline bg-ink-surface p-4 border-l-4 border-l-verdigris flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-hairline/60 mb-2">
            <span className="font-bold text-paper uppercase">01 · Check Results</span>
            <span className="text-[10px] text-verdigris font-semibold">AUTOMATED CORE</span>
          </div>
          <p className="font-sans text-xs text-slate mb-3">
            Deterministic rule comparisons, hash checks, and external adapter responses.
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate">Checks Passed:</span>
              <span className="font-bold text-verdigris">{checkResultsSummary.passed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Deficiencies / Gaps:</span>
              <span className="font-bold text-vermilion">{checkResultsSummary.failedOrDeficient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Source Unavailable:</span>
              <span className="font-bold text-slate">{checkResultsSummary.unavailableOrPending}</span>
            </div>
          </div>
        </div>
        <div className="pt-3 mt-3 border-t border-hairline/40 text-[10px] text-slate/70">
          Result scoped to check; does not prove factual veracity (§3.3).
        </div>
      </div>

      {/* Plane 2: Evidence Sufficiency */}
      <div className="border border-hairline bg-ink-surface p-4 border-l-4 border-l-ochre flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-hairline/60 mb-2">
            <span className="font-bold text-paper uppercase">02 · Evidence Sufficiency</span>
            <span className="text-[10px] text-ochre font-semibold">WORKFLOW GATE</span>
          </div>
          <p className="font-sans text-xs text-slate mb-3">
            Workflow control evaluating mandatory check completeness and critical unresolved signals.
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate">Sufficiency Verdict:</span>
              {gateOutput ? (
                <StatusPill status={gateOutput.verdict as any} size="sm" />
              ) : (
                <span className="text-slate">Evaluating...</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Mandatory Run Ratio:</span>
              <span className="font-bold text-paper">{gateOutput?.mandatoryChecksRunRatio || 'N/A'}</span>
            </div>
            <div className="pt-1">
              <span className="text-slate text-[10px] uppercase block">Limiting Signal:</span>
              <span className="font-sans text-xs text-ochre leading-tight block truncate" title={gateOutput?.limitingSignal}>
                {gateOutput?.limitingSignal || 'None'}
              </span>
            </div>
          </div>
        </div>
        <div className="pt-3 mt-3 border-t border-hairline/40 text-[10px] text-ochre/80 font-bold">
          Not an approval engine (§3.4).
        </div>
      </div>

      {/* Plane 3: Officer Decision */}
      <div className="border border-hairline bg-ink-surface p-4 border-l-4 border-l-paper flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-hairline/60 mb-2">
            <span className="font-bold text-paper uppercase">03 · Officer Decision</span>
            <span className="text-[10px] text-paper font-semibold">STATUTORY DISPOSITION</span>
          </div>
          <p className="font-sans text-xs text-slate mb-3">
            Exclusive statutory decision-making authority exercised by an authorized AICTE officer.
          </p>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate">Current State:</span>
              <span className="font-bold text-paper uppercase">{officerDecision.state.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Assigned Officer:</span>
              <span className="font-semibold text-paper">{officerDecision.assignedOfficer || 'Unassigned'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Autonomous Override:</span>
              <span className="font-bold text-verdigris">Disabled By Protocol</span>
            </div>
          </div>
        </div>
        <div className="pt-3 mt-3 border-t border-hairline/40 text-[10px] text-slate/70">
          Overrides require written statutory rationale in audit log.
        </div>
      </div>
    </div>
  );
};
