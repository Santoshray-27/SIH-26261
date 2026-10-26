import React from 'react';
import { CheckRun } from '../../../types/domain';
import { StatusPill } from '../../../components/ui/StatusPill';

interface CaseCoverageStatementProps {
  checkRuns: CheckRun[];
  totalExpected: number;
}

export const CaseCoverageStatement: React.FC<CaseCoverageStatementProps> = ({
  checkRuns,
  totalExpected,
}) => {
  const executedRuns = checkRuns.filter((cr) => cr.isMandatory && cr.status !== 'CHECK_NOT_RUN');
  const unrunChecks = checkRuns.filter((cr) => cr.status === 'CHECK_NOT_RUN');
  const executedCount = executedRuns.length;

  return (
    <div className="border border-hairline bg-ink-surface p-4 font-mono text-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-hairline/60">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-paper">
            Mandatory Case Coverage: {executedCount} of {totalExpected} checks ran
          </span>
          <span className="text-slate text-[10px]">({Math.round((executedCount / totalExpected) * 100)}%)</span>
        </div>
        <span className="text-[10px] text-ochre font-semibold">
          Absence of evidence is never treated as a pass (§3.4)
        </span>
      </div>

      {unrunChecks.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[10px] uppercase text-slate tracking-wider block">
            Un-Executed Mandatory Checks & Reported Reasons:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unrunChecks.map((chk) => (
              <div
                key={chk.id}
                className="p-3 border border-hairline bg-ink-dark/60 flex flex-col justify-between space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-paper text-xs">{chk.checkName}</span>
                  <StatusPill status="CHECK_NOT_RUN" size="sm" />
                </div>
                <p className="font-sans text-xs text-slate leading-relaxed">
                  <strong>Reason:</strong> {chk.notRunReason || 'Pending external registry integration.'}
                </p>
                <span className="text-[10px] text-slate/70">Rule ID: {chk.ruleId}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
