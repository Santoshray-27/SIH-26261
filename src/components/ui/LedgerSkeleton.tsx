import React from 'react';

interface LedgerSkeletonProps {
  rows?: number;
  className?: string;
}

export const LedgerSkeleton: React.FC<LedgerSkeletonProps> = ({
  rows = 5,
  className = '',
}) => {
  return (
    <div className={`space-y-3 animate-pulse font-mono ${className}`}>
      {/* Header skeleton */}
      <div className="h-8 bg-white/5 border border-white/5 rounded-xs w-full flex items-center px-4 justify-between">
        <div className="h-3 bg-white/10 rounded w-1/4" />
        <div className="h-3 bg-white/10 rounded w-1/6" />
      </div>

      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white/[0.02] border border-white/5 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="space-y-2 flex-1">
            <div className="h-3.5 bg-white/15 rounded w-1/3" />
            <div className="h-2.5 bg-white/10 rounded w-1/2" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-5 bg-white/10 rounded w-20" />
            <div className="h-5 bg-white/10 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};
