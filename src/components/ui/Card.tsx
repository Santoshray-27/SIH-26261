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
      className={`border border-hairline bg-paper dark:bg-ink-surface p-5 relative transition-colors ${
        variant === 'ledger' ? 'border-l-4 border-l-ink dark:border-l-paper' : ''
      } ${className}`}
      {...props}
    >
      {sectionNumber && (
        <span className="font-mono text-[10px] tracking-widest text-slate uppercase absolute top-3 right-4 select-none">
          {sectionNumber} —
        </span>
      )}
      {children}
    </div>
  );
};
