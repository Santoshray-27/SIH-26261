import React, { useState } from 'react';
import { Bug, X, Cpu } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const DevSimulationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addToast } = useAppStore();

  const [forceSourceUnavailable, setForceSourceUnavailable] = useState<boolean>(false);
  const [forceLowConfidence, setForceLowConfidence] = useState<boolean>(false);
  const [forceDuplicateBreach, setForceDuplicateBreach] = useState<boolean>(false);

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

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 p-2.5 bg-[#171715] hover:bg-[#20201D] text-slate hover:text-white border border-white/15 rounded-full shadow-2xl transition-all flex items-center gap-2 text-xs font-mono select-none"
        title="Open Developer Simulation Overrides Panel"
      >
        <Bug className="w-4 h-4 text-ochre" />
        <span className="hidden sm:inline">Dev Overrides</span>
      </button>

      {/* Drawer Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-80 bg-[#141413] border border-white/20 rounded-lg shadow-2xl overflow-hidden font-mono text-xs select-none animate-in fade-in slide-in-from-bottom-2">
          <div className="px-4 py-2.5 bg-[#171715] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-ochre" />
              <span className="font-bold text-white uppercase text-[11px]">
                Failure Modes & Non-Pass Overrides
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-3.5 text-slate">
            <p className="text-[11px] leading-relaxed">
              Force deterministic failure conditions to verify that Pramāṇa never masks non-pass states.
            </p>

            {/* Toggle 1: SOURCE_UNAVAILABLE */}
            <div className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded">
              <div>
                <div className="text-white font-bold text-[11.5px]">Force SOURCE_UNAVAILABLE</div>
                <div className="text-[10px] text-slate">External Registry 503 Timeout</div>
              </div>
              <button
                onClick={toggleSourceUnavailable}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  forceSourceUnavailable ? 'bg-ochre' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    forceSourceUnavailable ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Low-Confidence OCR */}
            <div className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded">
              <div>
                <div className="text-white font-bold text-[11.5px]">Force Low-Confidence (0.52)</div>
                <div className="text-[10px] text-slate">Triggers LOW_CONFIDENCE pill</div>
              </div>
              <button
                onClick={toggleLowConfidence}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  forceLowConfidence ? 'bg-ochre' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    forceLowConfidence ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Duplicate Breach */}
            <div className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded">
              <div>
                <div className="text-white font-bold text-[11.5px]">Force Hash Collision</div>
                <div className="text-[10px] text-slate">POSSIBLE_DUPLICATE alert</div>
              </div>
              <button
                onClick={toggleDuplicateBreach}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  forceDuplicateBreach ? 'bg-vermilion' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    forceDuplicateBreach ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-1 text-[10px] text-slate/70 italic text-center">
              Demonstrates acceptance gate: missing sources do not silently pass.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
