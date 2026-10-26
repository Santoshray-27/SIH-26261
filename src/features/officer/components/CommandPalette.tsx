import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Application } from '../../../types/domain';
import { Search, X, ArrowRight, FileText, Sliders, Shield } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  applications: Application[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  applications,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = applications.filter(
    (app) =>
      app.institutionName.toLowerCase().includes(query.toLowerCase()) ||
      app.id.toLowerCase().includes(query.toLowerCase()) ||
      app.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigationShortcuts = [
    { label: 'Go to Officer Dashboard', path: '/officer', icon: FileText },
    { label: 'Inspect Governed Rules', path: '/officer/rules', icon: Sliders },
    { label: 'Inspect Tamper-Evident Audit Ledger', path: '/officer/audit', icon: Shield },
    { label: 'Open UI Primitives & Tokens', path: '/ui-kit', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-2xl bg-ink-surface border border-hairline shadow-floating text-paper font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline">
          <Search size={16} className="text-slate" />
          <input
            type="text"
            placeholder="Type application ID, institution name, or command... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-paper placeholder:text-slate/60 text-xs focus:outline-none"
          />
          <button onClick={onClose} className="p-1 hover:text-paper text-slate">
            <X size={15} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Applications list */}
          <div>
            <div className="text-[10px] text-slate uppercase px-2 py-1 tracking-wider">
              Applications ({filteredApps.length})
            </div>
            <div className="space-y-1">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    navigate(`/officer/case/${app.id}`);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 border border-transparent hover:border-hairline hover:bg-ink-dark flex items-center justify-between text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-paper">{app.id}</span>
                    <span className="text-slate truncate max-w-sm">
                      {app.institutionName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate group-hover:text-paper text-[10px]">
                    <span>{app.currentState}</span>
                    <ArrowRight size={11} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Nav list */}
          <div className="border-t border-hairline/60 pt-2">
            <div className="text-[10px] text-slate uppercase px-2 py-1 tracking-wider">
              Navigation Shortcuts
            </div>
            <div className="space-y-1">
              {navigationShortcuts.map((nav) => {
                const Icon = nav.icon;
                return (
                  <button
                    key={nav.path}
                    onClick={() => {
                      navigate(nav.path);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 border border-transparent hover:border-hairline hover:bg-ink-dark flex items-center justify-between text-xs transition-colors text-slate hover:text-paper"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} />
                      <span>{nav.label}</span>
                    </div>
                    <code className="text-[10px] text-slate/70">{nav.path}</code>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Command Palette Footer */}
        <div className="bg-ink-dark px-4 py-2 border-t border-hairline text-[10px] text-slate flex justify-between">
          <span>Navigate with arrows or mouse</span>
          <span>Ctrl/Cmd+K to toggle anytime</span>
        </div>
      </div>
    </div>
  );
};
