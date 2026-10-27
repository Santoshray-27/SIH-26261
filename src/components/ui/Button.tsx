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
    'inline-flex items-center justify-center font-mono uppercase tracking-wider transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-focus-ring';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-6 py-3 gap-2.5 font-medium',
  }[size];

  const variantClasses = {
    primary:
      'bg-text text-bg hover:opacity-90',
    secondary:
      'bg-surface-2 text-text hover:bg-surface border border-border',
    outline:
      'border border-border hover:border-text hover:bg-surface-2 text-text',
    danger:
      'bg-st-deficiency text-accent-contrast hover:opacity-90',
    ghost:
      'hover:bg-surface-2 text-text',
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
