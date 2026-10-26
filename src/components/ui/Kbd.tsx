import React from 'react';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ children, className = '' }) => {
  return (
    <kbd
      className={`inline-block px-1.5 py-0.5 font-mono text-[10px] uppercase font-semibold text-ink dark:text-paper bg-bone dark:bg-ink-surface border border-hairline rounded shadow-subtle ${className}`}
    >
      {children}
    </kbd>
  );
};
