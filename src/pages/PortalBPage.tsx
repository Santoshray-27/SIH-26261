import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const PortalBPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans">
      {/* Modern Minimal Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black font-bold flex items-center justify-center text-sm">
              ▲
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white">
                Next-Gen Applicant Cloud (Host Portal B)
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                Modern Jamstack / Tailwind Architecture
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-400">
              Host: <strong className="text-white">Next.js Edge Runtime</strong>
            </span>
            <Link
              to="/portal/a"
              className="text-white hover:text-neutral-300 flex items-center gap-1 font-bold underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Switch to Legacy Portal A</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Style & Framework Independence Verification</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Pre-Check Embedded Instance
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Even though Portal B is a sleek, dark modern web app, the exact same Pramāṇa Pre-Check widget
            is loaded without any style leakage or font collision, proving complete portal autonomy.
          </p>
        </div>

        {/* Embedded iFrame */}
        <div className="border border-white/15 rounded-xl overflow-hidden shadow-2xl bg-[#0F0F0E]">
          <div className="px-4 py-2.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-white font-semibold">iframe: /embed/precheck</span>
            </div>
            <span>Cross-Origin Style Isolation</span>
          </div>

          <iframe
            src="/embed/precheck"
            title="Pramana Pre-Check Widget (Modern Portal B)"
            className="w-full h-[620px] border-none"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs font-mono text-neutral-500">
        Portal B Demo · Zero Dependency on Host CSS or Global JavaScript
      </footer>
    </div>
  );
};
