import React, { useEffect, useState } from 'react';
import { Cpu, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const DevSimulationPanel: React.FC = () => {
  const { devOverridesOpen, setDevOverridesOpen, addToast } = useAppStore();

  const [forceSourceUnavailable, setForceSourceUnavailable] = useState<boolean>(false);
  const [forceLowConfidence, setForceLowConfidence] = useState<boolean>(false);
  const [forceDuplicateBreach, setForceDuplicateBreach] = useState<boolean>(false);

  // Keyboard shortcut Shift+D to toggle dev panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setDevOverridesOpen(!devOverridesOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [devOverridesOpen, setDevOverridesOpen]);

  const toggleSourceUnavailable = () => {
    const next = !forceSourceUnavailable;
    setForceSourceUnavailable(next);
    addToast(
      next
        ? 'Dev Override: External API calls forced to SOURCE_UNAVAILABLE (HTTP 503)'
        : 'Dev Override: External API calls restored to default',
      'info'
    );
  };

  const toggleLowConfidence = () => {
    const next = !forceLowConfidence;
    setForceLowConfidence(next);
    addToast(
      next
        ? 'Dev Override: OCR field extraction confidence forced below floor (0.52)'
        : 'Dev Override: OCR confidence restored to nominal (0.94+)',
      'info'
    );
  };

  const toggleDuplicateBreach = () => {
    const next = !forceDuplicateBreach;
    setForceDuplicateBreach(next);
    addToast(
      next
        ? 'Dev Override: Cross-application hash collision flagged for vigilance review'
        : 'Dev Override: Duplicate collision flags restored',
      'info'
    );
  };

  if (!devOverridesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text/25 backdrop-blur-xs transition-opacity"
        onClick={() => setDevOverridesOpen(false)}
      />

      {/* Right Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-surface border-l border-border shadow-floating flex flex-col font-sans text-sm animate-in slide-in-from-right duration-200">
          <div className="px-5 py-4 bg-tint-clay border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="font-bold text-text uppercase text-xs tracking-wider">
                Simulation Overrides (§8)
              </span>
            </div>
            <button
              onClick={() => setDevOverridesOpen(false)}
              className="text-text-muted hover:text-text p-1"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-5 text-text-muted flex-1 overflow-y-auto font-sans">
            <p className="text-xs leading-relaxed">
              Deterministic simulation overrides to prove Pramāṇa never masks non-pass states or collapses unknown status into pass.
            </p>

            {/* Toggle 1: SOURCE_UNAVAILABLE */}
            <div className="p-3.5 bg-bg-elevated border border-border rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text font-bold text-xs">Force SOURCE_UNAVAILABLE</div>
                  <div className="text-[11px] text-text-muted">Simulate Dharani Registry 503</div>
                </div>
                <button
                  onClick={toggleSourceUnavailable}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    forceSourceUnavailable ? 'bg-st-review' : 'bg-surface-2 border border-border'
                  }`}
                  aria-label="Toggle SOURCE_UNAVAILABLE override"
                >
                  <div
                    className={`w-4 h-4 bg-accent-contrast rounded-full absolute top-1 transition-transform ${
                      forceSourceUnavailable ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Toggle 2: Low-Confidence OCR */}
            <div className="p-3.5 bg-bg-elevated border border-border rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text font-bold text-xs">Force Low-Confidence (0.52)</div>
                  <div className="text-[11px] text-text-muted">Drops below extraction floor (0.80)</div>
                </div>
                <button
                  onClick={toggleLowConfidence}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    forceLowConfidence ? 'bg-st-review' : 'bg-surface-2 border border-border'
                  }`}
                  aria-label="Toggle low confidence override"
                >
                  <div
                    className={`w-4 h-4 bg-accent-contrast rounded-full absolute top-1 transition-transform ${
                      forceLowConfidence ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Toggle 3: Duplicate Collision */}
            <div className="p-3.5 bg-bg-elevated border border-border rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text font-bold text-xs">Force Hash Collision</div>
                  <div className="text-[11px] text-text-muted">Flags byte-identical duplicate</div>
                </div>
                <button
                  onClick={toggleDuplicateBreach}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    forceDuplicateBreach ? 'bg-st-deficiency' : 'bg-surface-2 border border-border'
                  }`}
                  aria-label="Toggle duplicate collision override"
                >
                  <div
                    className={`w-4 h-4 bg-accent-contrast rounded-full absolute top-1 transition-transform ${
                      forceDuplicateBreach ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-text-muted italic border-t border-border">
              Shortcut: press <kbd className="px-1.5 py-0.5 bg-surface-2 border border-border rounded font-mono text-[10px]">Shift+D</kbd> anywhere to open or dismiss this drawer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
