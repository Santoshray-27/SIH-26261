import React from 'react';

interface LedgerSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const LedgerSkeleton: React.FC<LedgerSkeletonProps> = ({
  rows = 5,
  columns = 4,
  className = '',
}) => {
  return (
    <div
      className={`border border-border bg-surface p-4 space-y-3 animate-pulse font-mono ${className}`}
      role="status"
      aria-label="Loading ledger records"
    >
      <div className="h-4 bg-surface-2 w-1/3 mb-4 rounded-xs" />
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div
            key={rIdx}
            className="flex items-center gap-3 py-2 border-b border-border/50"
          >
            {Array.from({ length: columns }).map((_, cIdx) => (
              <div
                key={cIdx}
                className="h-3 bg-surface-2 rounded-xs flex-1"
                style={{ opacity: 1 - cIdx * 0.15 }}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Loading records...</span>
    </div>
  );
};
