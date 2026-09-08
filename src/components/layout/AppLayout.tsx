import React, { useEffect } from 'react';
import { useAppStore, applyThemeClass } from '../../store/useAppStore';
import { BottomNav } from './BottomNav';
import { TabType } from '../../types';

interface AppLayoutProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  activeTab,
  onChangeTab,
  children,
}) => {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    applyThemeClass(theme);

    // Watch for system theme changes if theme is set to 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (useAppStore.getState().theme === 'system') {
        applyThemeClass('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center">
      <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark min-h-screen flex flex-col relative shadow-xl border-x border-slate-200/60 dark:border-slate-800/60">
        {/* Main Content View with padding for BottomNav */}
        <main className="flex-1 pb-24 overflow-y-auto">
          {children}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav activeTab={activeTab} onChangeTab={onChangeTab} />
      </div>
    </div>
  );
};
