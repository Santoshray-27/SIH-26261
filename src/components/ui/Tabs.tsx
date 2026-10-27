import React from 'react';

interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex border-b border-hairline gap-6 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`pb-3 font-sans text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap focus:outline-none ${
              isActive
                ? 'border-ink text-ink dark:border-paper dark:text-paper font-semibold'
                : 'border-transparent text-slate hover:text-ink dark:hover:text-paper'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                    : 'bg-bone text-slate dark:bg-ink-dark dark:text-slate'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
