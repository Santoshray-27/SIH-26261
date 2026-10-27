import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PortalAPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F0EDE4] text-[#1F2B3D] font-serif">
      {/* Government Legacy Top Header */}
      <header className="bg-[#1B2A49] text-[#FAF6EC] border-b-4 border-[#C48A12] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FAF6EC] text-[#1B2A49] rounded-full flex items-center justify-center font-bold text-xl border-2 border-[#C48A12]">
              स
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#C48A12] font-sans font-bold">
                Government of India · Ministry of Education
              </div>
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-tight">
                National Portal for Technical Approval (Legacy Host Portal A)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans text-xs">
            <span className="bg-[#243559] px-3 py-1 rounded-xs border border-[#3A4A9C]/40 text-[#FAF6EC]">
              Host Environment: <strong>LEGACY ASP.NET MOCK</strong>
            </span>
            <Link
              to="/portal/b"
              className="text-[#F3E7C6] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Switch to Modern Portal B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Legacy Sub-navbar */}
      <nav className="bg-[#121E36] text-[#FAF6EC] text-xs font-sans border-b border-[#243559]">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-6">
          <span className="hover:underline cursor-pointer font-bold">Home</span>
          <span className="hover:underline cursor-pointer">Instructions for Approvals</span>
          <span className="hover:underline cursor-pointer">Circulars & Gazettes</span>
          <span className="hover:underline cursor-pointer">Helpdesk</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-[#FAF6EC] p-6 border border-[#D8CFB9] shadow-sm rounded-none">
          <div className="border-b-2 border-[#1B2A49] pb-3 mb-4">
            <span className="text-xs font-sans uppercase font-bold text-[#1B2A49]">
              Form Annexure Submission - Cycle 2026-27
            </span>
            <h2 className="text-xl font-bold font-serif text-[#1B2A49] mt-1">
              Integrated Compliance Verification Module
            </h2>
          </div>

          <p className="text-xs font-sans text-[#4A5568] leading-relaxed mb-6">
            This legacy government host portal embeds the standalone Pramāṇa Pre-Check widget via an{' '}
            <code className="font-mono bg-[#ECE5D4] px-1.5 py-0.5 border border-[#D8CFB9] text-[#1B2A49]">
              &lt;iframe src="/embed/precheck" /&gt;
            </code>
            . The widget runs with complete style and script isolation while verifying documents before final HTTP form post.
          </p>

          {/* Embedded iFrame */}
          <div className="border-2 border-[#1B2A49]/30 rounded-xs overflow-hidden shadow-inner bg-[#FAF6EC]">
            <div className="bg-[#E7E0D2] px-4 py-2 border-b border-[#1B2A49]/20 flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#1B2A49]">
                Isolated iFrame Container (/embed/precheck)
              </span>
              <span className="text-[10px] text-[#4A5568] font-mono">sandbox="allow-scripts allow-forms"</span>
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
      <footer className="bg-[#E7E0D2] border-t border-[#D8CFB9] text-center py-4 text-xs font-sans text-[#4A5568]">
        Portal A Proof of Independence · Pramāṇa Embeddable Evidence Engine · Ministry of Education
      </footer>
    </div>
  );
};
