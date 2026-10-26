import React from 'react';
import { X, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'J', desc: 'Next finding in queue' },
    { key: 'K', desc: 'Previous finding in queue' },
    { key: 'C', desc: 'Correct value (creates superseding audit record)' },
    { key: 'R', desc: 'Request clarification / draft notice (rectifiable gaps only)' },
    { key: 'X', desc: 'Resolve finding (mark verified with rationale)' },
    { key: 'E', desc: 'Escalate integrity concern to Senior Review / Vigilance' },
    { key: '?', desc: 'Open / close this keyboard shortcuts helper' },
    { key: 'Esc', desc: 'Close any active modal or drawer' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141413] border border-white/15 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-5 py-4 bg-[#171715] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-ochre" />
            <h3 className="font-serif font-bold text-white text-sm">
              Keyboard Review Shortcuts
            </h3>
          </div>
          <button onClick={onClose} className="text-slate hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate mb-4">
            Optimized for rapid finding-by-finding adjudication without mouse dependency.
          </p>

          <div className="space-y-2">
            {shortcuts.map((sc) => (
              <div
                key={sc.key}
                className="flex items-center justify-between py-1.5 border-b border-white/5 text-xs font-mono"
              >
                <span className="text-[#EDE7DA]">{sc.desc}</span>
                <kbd className="px-2 py-0.5 bg-black/50 border border-white/20 rounded text-white font-bold text-xs">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 bg-[#171715] border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded transition-colors"
          >
            Close (?)
          </button>
        </div>
      </div>
    </div>
  );
};
