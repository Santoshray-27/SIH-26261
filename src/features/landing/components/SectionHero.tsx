import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionHero: React.FC = () => {
  const { language } = useI18n();
  const [stampPos, setStampPos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setStampPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const hashes = [
    'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592',
    '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
  ].join('  ·  ');

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setStampPos((prev) => ({ ...prev, active: false }))}
      className="relative min-h-[90vh] flex flex-col justify-between pt-16 pb-12 px-6 md:px-12 border-b border-hairline overflow-hidden bg-paper"
    >
      {/* Subtle Mouse-Reactive Official Verification Stamp */}
      {stampPos.active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-36 h-36 border-2 border-vermilion/30 rounded-full flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-widest text-vermilion/40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 rotate-[-12deg]"
          style={{ left: stampPos.x, top: stampPos.y }}
        >
          <span className="font-bold">AICTE·VERIFIED</span>
          <span className="border-t border-vermilion/30 my-0.5 w-16" />
          <span>SYNTHETIC</span>
        </div>
      )}

      {/* Top Header Marquee Texture */}
      <div className="font-mono text-[10px] text-slate/50 whitespace-nowrap overflow-hidden select-none border-b border-hairline/60 pb-3 -mx-6 md:-mx-12 px-6 md:px-12">
        <div className="inline-block animate-[marquee_30s_linear_infinite]">
          <span>EVIDENCE HASH STREAM: {hashes} · {hashes}</span>
        </div>
      </div>

      {/* Main Massive Editorial Typography Hero */}
      <div className="my-auto py-12 max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">01 —</span>
          <span>SIH 26261 · AICTE Regulatory Automation</span>
        </div>

        <div className="space-y-0">
          <div className="flex flex-wrap items-baseline gap-4 md:gap-8">
            <h1 className="font-devanagariDisplay font-black text-6xl sm:text-8xl md:text-9xl text-ink tracking-tight select-none">
              साक्ष्य‑I5
            </h1>
            <span className="font-display italic font-normal text-4xl sm:text-6xl md:text-8xl text-ink/75 tracking-tight">
              Sakshya‑I5
            </span>
          </div>

          <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-ink mt-4 tracking-tight">
            “{language === 'hi' ? 'निर्णय नहीं, केवल साक्ष्य‑I5।' : 'Proof, not just a verdict.'}”
          </p>
        </div>

        <p className="font-sans text-base sm:text-lg text-slate max-w-2xl mt-6 leading-relaxed">
          {language === 'hi'
            ? 'दस्तावेज़ अखंडता, नियामक पुस्तिका अनुपालन और साक्ष्य पर्याप्तता को एक ही पारदर्शी कार्यप्रवाह में जोड़ता है। कोई अस्पष्ट विश्वास स्कोर नहीं।'
            : 'Connecting document cryptographic authentication, Approval Process Handbook rules, and physical evidence into one explainable officer ledger.'}
        </p>

        {/* Magnetic CTAs */}
        <div className="flex flex-wrap items-center gap-5 mt-10">
          <Link to="/officer">
            <MagneticButton
              strength={0.3}
              className="px-6 py-3.5 bg-ink text-paper hover:bg-black text-xs font-semibold tracking-wider flex items-center gap-2.5 shadow-lifted"
            >
              <span>{language === 'hi' ? 'अधिकारी कंसोल खोलें' : 'Open officer console'}</span>
              <ArrowRight size={14} />
            </MagneticButton>
          </Link>

          <Link to="/precheck">
            <MagneticButton
              strength={0.3}
              className="px-6 py-3.5 border border-ink text-ink hover:bg-bone text-xs font-semibold tracking-wider"
            >
              <span>{language === 'hi' ? 'आवेदक पूर्व-जांच आजमाएं' : 'Try applicant pre-check'}</span>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Hero Bottom Marginalia */}
      <div className="pt-6 border-t border-hairline flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[11px] text-slate">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-verdigris" />
          <span>3-Layer Separation: Check Result → Evidence Sufficiency → Officer Decision</span>
        </div>
        <div>Version: AICTE APH 2026-27 · Core Engine v2.1.0</div>
      </div>
    </section>
  );
};
