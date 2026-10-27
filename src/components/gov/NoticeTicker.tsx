import React, { useState, useEffect } from 'react';
import { Play, Pause, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NoticeItem {
  id: string;
  tag: string;
  text: string;
  link?: string;
}

export const NoticeTicker: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const notices: NoticeItem[] = [
    {
      id: 'N-1',
      tag: 'PROTOTYPE UPDATE',
      text: 'AICTE Approval Process Handbook (APH 2026-27) rulepacks synchronized for Engineering & Management streams.',
      link: '/officer/rules',
    },
    {
      id: 'N-2',
      tag: 'EVIDENCE VERIFICATION',
      text: 'Deterministic decision replay engine now pins rule specifications and historic reference dates.',
      link: '/officer/tools',
    },
    {
      id: 'N-3',
      tag: 'CRYPTOGRAPHIC AUDIT',
      text: 'All officer corrections and verification executions committed to tamper-evident SHA-256 block ledger.',
      link: '/officer/audit',
    },
  ];

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, notices.length]);

  const currentNotice = notices[currentIndex];

  return (
    <aside
      aria-label="Important Updates Ticker"
      className="bg-surface border-b border-border py-1.5 px-4 sm:px-6 md:px-10 flex items-center justify-between text-xs font-sans transition-colors z-20 select-none"
    >
      <div className="flex items-center gap-3 overflow-hidden flex-1 mr-3">
        {/* Notice badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-tint-clay text-accent font-mono text-[10px] font-bold rounded-xs shrink-0">
          <Bell size={11} aria-hidden="true" />
          <span>WHAT'S NEW</span>
        </div>

        {/* Ticker Content */}
        <div className="flex items-center gap-2 truncate text-text">
          <span className="font-mono text-[10px] uppercase text-text-muted shrink-0">
            [{currentNotice.tag}]
          </span>
          {currentNotice.link ? (
            <Link
              to={currentNotice.link}
              className="hover:text-accent-2 hover:underline truncate"
            >
              {currentNotice.text}
            </Link>
          ) : (
            <span className="truncate">{currentNotice.text}</span>
          )}
        </div>
      </div>

      {/* Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-1 text-text-muted hover:text-text border border-border hover:bg-surface-2 rounded-xs transition-colors shrink-0"
        title={isPlaying ? 'Pause ticker' : 'Resume ticker'}
        aria-label={isPlaying ? 'Pause notice ticker' : 'Play notice ticker'}
      >
        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
      </button>
    </aside>
  );
};
