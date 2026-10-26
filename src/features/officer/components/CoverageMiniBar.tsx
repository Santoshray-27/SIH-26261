import React from 'react';

interface CoverageMiniBarProps {
  ratioStr: string; // e.g. "9 of 11 mandatory checks ran"
}

export const CoverageMiniBar: React.FC<CoverageMiniBarProps> = ({ ratioStr }) => {
  // Parse numbers from string like "9 of 11 mandatory checks ran"
  const match = ratioStr.match(/(\d+)\s+of\s+(\d+)/);
  const completed = match ? parseInt(match[1], 10) : 0;
  const total = match ? parseInt(match[2], 10) : 11;
  const notRun = Math.max(0, total - completed);

  return (
    <div className="flex flex-col gap-1 w-28">
      <div className="flex justify-between items-center font-mono text-[10px] text-slate">
        <span>{completed}/{total}</span>
        <span className="text-[9px] uppercase">{notRun > 0 ? `${notRun} un-run` : 'all ran'}</span>
      </div>
      <div className="flex h-2 w-full border border-hairline overflow-hidden rounded-xs bg-ink-dark">
        {/* Completed checks in verdigris */}
        <div
          style={{ width: `${(completed / total) * 100}%` }}
          className="bg-verdigris h-full"
        />
        {/* Un-run checks with diagonal hatch */}
        {notRun > 0 && (
          <div
            style={{ width: `${(notRun / total) * 100}%` }}
            className="h-full bg-slate/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 hatch-pattern" />
          </div>
        )}
      </div>
    </div>
  );
};
