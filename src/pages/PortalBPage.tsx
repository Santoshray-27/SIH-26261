import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PrototypeBanner } from '../components/gov';

export const PortalBPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1F2B3D] text-[#FAF6EC] font-sans">
      <PrototypeBanner />
      {/* Modern Minimal Header */}
      <header className="border-b border-[#3A4A9C]/30 bg-[#162030]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] text-[#1F2B3D] font-bold flex items-center justify-center text-sm">
              ▲
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-[#FAF6EC]">
                Next-Gen Applicant Cloud (Host Portal B)
              </div>
              <div className="text-[10px] font-mono text-[#DCEAE5]">
                Modern Jamstack / Tailwind Architecture
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 bg-[#26374E] border border-[#3A4A9C]/40 rounded-full text-[#FAF6EC]">
              Host: <strong className="text-[#DCEAE5]">Next.js Edge Runtime</strong>
            </span>
            <Link
              to="/portal/a"
              className="text-[#FAF6EC] hover:text-[#DCEAE5] flex items-center gap-1 font-bold underline"
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26374E] border border-[#3A4A9C]/40 text-xs font-mono text-[#DCEAE5]">
            <Sparkles className="w-3 h-3 text-[#FAF6EC]" />
            <span>Style & Framework Independence Verification</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#FAF6EC]">
            Pre-Check Embedded Instance
          </h2>
          <p className="text-sm text-[#DCEAE5] max-w-2xl leading-relaxed">
            Even though Portal B represents a modern minimal SaaS host environment, the exact same Sakshya‑I5 Pre-Check widget
            is loaded without any style leakage or font collision, proving complete portal autonomy.
          </p>
        </div>

        {/* Embedded iFrame */}
        <div className="border border-[#3A4A9C]/40 rounded-xl overflow-hidden shadow-2xl bg-[#162030]">
          <div className="px-4 py-2.5 bg-[#26374E] border-b border-[#3A4A9C]/30 flex items-center justify-between text-xs font-mono text-[#DCEAE5]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B3341C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8A5A00]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B6F4F]" />
              <span className="ml-2 text-[#FAF6EC] font-semibold">iframe: /embed/precheck</span>
            </div>
            <span>Cross-Origin Style Isolation</span>
          </div>

          <iframe
            src="/embed/precheck"
            title="Sakshya‑I5 Pre-Check Widget (Modern Portal B)"
            className="w-full h-[620px] border-none"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3A4A9C]/30 py-6 text-center text-xs font-mono text-[#DCEAE5]">
        Portal B Demo · Zero Dependency on Host CSS or Global JavaScript
      </footer>
    </div>
  );
};
