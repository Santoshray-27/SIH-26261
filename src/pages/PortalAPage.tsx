import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PortalAPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21] font-serif">
      {/* Government Legacy Top Header */}
      <header className="bg-[#002855] text-white border-b-4 border-[#FF9933] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white text-[#002855] rounded-full flex items-center justify-center font-bold text-xl border-2 border-[#FF9933]">
              स
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#FF9933] font-sans font-bold">
                Government of India · Ministry of Education
              </div>
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-tight">
                National Portal for Technical Approval (Legacy Host Portal A)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans text-xs">
            <span className="bg-white/10 px-3 py-1 rounded border border-white/20">
              Host Environment: <strong>LEGACY ASP.NET MOCK</strong>
            </span>
            <Link
              to="/portal/b"
              className="text-[#FF9933] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Switch to Modern Portal B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Legacy Sub-navbar */}
      <nav className="bg-[#001833] text-white text-xs font-sans border-b border-neutral-300">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-6">
          <span className="hover:underline cursor-pointer font-bold">Home</span>
          <span className="hover:underline cursor-pointer">Instructions for Approvals</span>
          <span className="hover:underline cursor-pointer">Circulars & Gazettes</span>
          <span className="hover:underline cursor-pointer">Helpdesk</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white p-6 border border-neutral-300 shadow-sm rounded-none">
          <div className="border-b-2 border-[#002855] pb-3 mb-4">
            <span className="text-xs font-sans uppercase font-bold text-[#002855]">
              Form Annexure Submission - Cycle 2026-27
            </span>
            <h2 className="text-xl font-bold font-serif text-[#002855] mt-1">
              Integrated Compliance Verification Module
            </h2>
          </div>

          <p className="text-xs font-sans text-neutral-600 leading-relaxed mb-6">
            This legacy government host portal embeds the standalone Pramāṇa Pre-Check widget via an{' '}
            <code className="font-mono bg-neutral-100 px-1.5 py-0.5 border text-[#002855]">
              &lt;iframe src="/embed/precheck" /&gt;
            </code>
            . The widget runs with complete style and script isolation while verifying documents before final HTTP form post.
          </p>

          {/* Embedded iFrame */}
          <div className="border-2 border-[#002855]/30 rounded overflow-hidden shadow-inner bg-white">
            <div className="bg-[#E9EEF4] px-4 py-2 border-b border-[#002855]/20 flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#002855]">
                Isolated iFrame Container (/embed/precheck)
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">sandbox="allow-scripts allow-forms"</span>
            </div>
            <iframe
              src="/embed/precheck"
              title="Pramana Pre-Check Widget (Legacy Portal A)"
              className="w-full h-[620px] border-none"
            />
          </div>
        </div>
      </main>

      {/* Legacy Footer */}
      <footer className="bg-[#E2E8F0] border-t border-neutral-300 text-center py-4 text-xs font-sans text-neutral-600">
        Portal A Proof of Independence · Pramāṇa Embeddable Evidence Engine · Ministry of Education
      </footer>
    </div>
  );
};
