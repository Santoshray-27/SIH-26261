import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-hairline hover:border-ink dark:hover:border-paper rounded-xs transition-colors"
      aria-label="Toggle theme between light paper and dark ink"
      title={`Switch to ${theme === 'paper' ? 'Dark' : 'Light'} mode / थीम बदलें`}
    >
      {theme === 'paper' ? (
        <>
          <Moon size={13} strokeWidth={1.25} />
          <span className="hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun size={13} strokeWidth={1.25} />
          <span className="hidden sm:inline">Light</span>
        </>
      )}
    </button>
  );
};
