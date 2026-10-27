import React from 'react';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ children, className = '' }) => {
  return (
    <kbd
      className={`inline-block px-1.5 py-0.5 font-sans text-xs font-semibold text-text bg-surface-2 border border-border rounded-xs shadow-xs leading-none ${className}`}
    >
      {children}
    </kbd>
  );
};
