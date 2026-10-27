import React, { useEffect, useState } from 'react';

export const ScrollProgressRuler: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 bottom-0 w-8 z-40 hidden md:flex flex-col items-center justify-between py-12 pointer-events-none select-none font-mono text-[9px] text-slate/70 border-l border-hairline/40 bg-paper/20 backdrop-blur-[2px]"
    >
      <div className="writing-vertical text-center tracking-widest uppercase">
        SAKSHYA-I5 · LEDGER
      </div>

      <div className="flex-1 w-full flex flex-col justify-between items-end pr-2 py-4">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
          <div key={tick} className="flex items-center gap-1">
            <span className="text-[8px] opacity-40">{tick}</span>
            <div
              className={`h-[1px] ${
                progress >= tick ? 'w-3 bg-ink' : 'w-1.5 bg-slate/40'
              } transition-all`}
            />
          </div>
        ))}
      </div>

      <div className="font-bold text-ink text-[10px]">
        {Math.round(progress)}%
      </div>
    </div>
  );
};
