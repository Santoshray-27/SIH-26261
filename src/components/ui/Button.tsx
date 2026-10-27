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
    'inline-flex items-center justify-center font-sans font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-focus-ring leading-[1.2]';

  const sizeClasses = {
    sm: 'text-[13px] px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-[15px] px-6 py-2.5 gap-2.5 font-semibold',
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
