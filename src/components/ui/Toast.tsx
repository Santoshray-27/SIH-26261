import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 border shadow-floating flex items-start gap-3 transition-all ${
            toast.type === 'error'
              ? 'bg-vermilion-light border-vermilion text-vermilion dark:bg-[#2c1310] dark:text-[#f8a397]'
              : toast.type === 'success'
              ? 'bg-verdigris-light border-verdigris text-verdigris dark:bg-[#0f2420] dark:text-[#84dbc9]'
              : 'bg-paper border-ink text-ink dark:bg-ink-surface dark:border-paper dark:text-paper'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          ) : toast.type === 'success' ? (
            <CheckCircle size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          ) : (
            <Info size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          )}

          <div className="flex-1 font-mono text-xs leading-relaxed">{toast.message}</div>

          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 p-0.5 opacity-60 hover:opacity-100"
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
