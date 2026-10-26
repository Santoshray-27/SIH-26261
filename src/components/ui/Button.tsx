import React from 'react';
import { useAppStore } from '../../store/useAppStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isWritingAction?: boolean; // if true and role is auditor, intercepted
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isWritingAction = false,
  className = '',
  onClick,
  ...props
}) => {
  const { currentRole, addToast } = useAppStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isWritingAction && currentRole === 'auditor') {
      e.preventDefault();
      e.stopPropagation();
      addToast('Read-only role (403): Auditor cannot perform mutating actions.', 'error');
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center font-mono uppercase tracking-wider transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-ink';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-6 py-3 gap-2.5 font-medium',
  }[size];

  const variantClasses = {
    primary:
      'bg-ink text-paper hover:bg-black dark:bg-[#EDE7DA] dark:text-[#0C0C0B] dark:hover:bg-white',
    secondary:
      'bg-bone text-ink hover:bg-[#D9D1C1] dark:bg-ink-surface dark:text-ink-text dark:hover:bg-[#252522]',
    outline:
      'border border-hairline hover:border-ink hover:bg-bone/40 dark:hover:bg-ink-surface',
    danger:
      'bg-vermilion text-white hover:bg-[#b52d19] dark:hover:bg-[#e0452e]',
    ghost:
      'hover:bg-bone/50 text-ink dark:text-ink-text dark:hover:bg-ink-surface',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
