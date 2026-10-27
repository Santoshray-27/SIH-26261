import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ledger' | 'editorial';
  sectionNumber?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  sectionNumber,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`border border-border bg-surface text-text p-5 relative transition-colors ${
        variant === 'ledger' ? 'border-l-4 border-l-text' : ''
      } ${className}`}
      {...props}
    >
      {sectionNumber && (
        <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase absolute top-3 right-4 select-none">
          {sectionNumber} —
        </span>
      )}
      {children}
    </div>
  );
};
