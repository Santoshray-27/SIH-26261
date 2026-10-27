import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const seen = sessionStorage.getItem('sakshya-i5_preloader_seen');
    if (seen) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        sessionStorage.setItem('sakshya-i5_preloader_seen', 'true');
        onComplete();
      }, 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-paper flex flex-col items-center justify-center transition-opacity duration-600 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Editorial Rotating Circular Seal */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Rotating Circular Text SVG */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full animate-[spin_12s_linear_infinite]"
        >
          <path
            id="textCircle"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <text className="font-mono text-[11px] uppercase tracking-[0.24em] fill-ink font-semibold">
            <textPath href="#textCircle" startOffset="0%">
              साक्ष्य‑I5 · EVIDENCE · PROOF · LEDGER · AICTE ·
            </textPath>
          </text>
        </svg>

        {/* Center Devanagari Monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-serif font-black text-4xl text-ink">प्र</span>
          <span className="font-mono text-[9px] tracking-widest text-slate uppercase mt-1">
            EST. 2026
          </span>
        </div>

        {/* Concentric Inner Line Ring */}
        <div className="absolute inset-6 rounded-full border border-dashed border-ink/40 pointer-events-none" />
      </div>

      <div className="mt-8 font-mono text-xs uppercase tracking-widest text-slate flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-vermilion animate-ping" />
        <span>Initializing Tamper-Evident Core...</span>
      </div>
    </div>
  );
};
