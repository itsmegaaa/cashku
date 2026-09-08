import React from 'react';
import { BookOpen, Wallet, PieChart, MoreHorizontal, LucideIcon } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const items: NavItem[] = [
    { id: 'book', label: 'Buku', icon: BookOpen },
    { id: 'wallet', label: 'Dompet', icon: Wallet },
    { id: 'analysis', label: 'Analisis', icon: PieChart },
    { id: 'more', label: 'Lebih', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-md mx-auto bg-white/95 dark:bg-surface-cardDark/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-3 pt-2 pb-safe shadow-lg">
        <div className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl min-w-[64px] min-h-[48px] transition-all cursor-pointer ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-semibold'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                aria-label={`Tab ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={`relative p-1 rounded-xl transition-all ${
                  isActive ? 'bg-brand-50 dark:bg-brand-950/60 scale-105' : ''
                }`}>
                  <Icon size={22} />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                  )}
                </div>
                <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
