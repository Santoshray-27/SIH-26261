import React from 'react';

interface MonoProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Mono component set for allow-listed items only:
 * Record IDs (APP-…, OVL-…, DOC-…, RULE-…), hashes/digests, clause/section references (§3.3), and inline code.
 * Uses --font-mono (Roboto Mono) at 0.9em for balanced optical sizing with Public Sans.
 */
export const Mono: React.FC<MonoProps> = ({ children, className = '', ...props }) => (
  <span className={`font-mono text-[0.9em] tabular-nums ${className}`} {...props}>
    {children}
  </span>
);

export const IdText: React.FC<MonoProps> = ({ children, className = '', ...props }) => (
  <span className={`font-mono text-[0.9em] tabular-nums font-medium tracking-normal text-accent-2 ${className}`} {...props}>
    {children}
  </span>
);

export const HashText: React.FC<MonoProps> = ({ children, className = '', ...props }) => (
  <span className={`font-mono text-[0.85em] tabular-nums tracking-normal break-all text-text-muted ${className}`} {...props}>
    {children}
  </span>
);

export const CodeText: React.FC<MonoProps> = ({ children, className = '', ...props }) => (
  <code className={`font-mono text-[0.875em] tabular-nums bg-surface-2 px-1 py-0.5 rounded-xs border border-border text-text ${className}`} {...props}>
    {children}
  </code>
);
