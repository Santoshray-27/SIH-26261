import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-text/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 flex pl-6 sm:pl-10 max-w-full">
        <div
          className={`w-screen ${width} bg-surface border-l border-border shadow-floating flex flex-col text-text`}
        >
          <div className="p-5 border-b border-border flex items-center justify-between bg-surface-2">
            <div>
              <h2 className="font-display font-bold text-xl tracking-tight text-text">{title}</h2>
              {subtitle && (
                <p className="font-sans text-xs text-text-muted mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-surface text-text transition-colors"
              aria-label="Close drawer"
            >
              <X size={18} strokeWidth={1.25} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
