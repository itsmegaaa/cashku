import React from 'react';
import { Check, Sun, Moon, Laptop, Sparkles, LucideIcon, Palette } from 'lucide-react';
import { ThemeMode } from '../../types';

interface SlideThemeSetupProps {
  selectedTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const SlideThemeSetup: React.FC<SlideThemeSetupProps> = ({
  selectedTheme,
  onSelectTheme,
}) => {
  const themeOptions: { id: ThemeMode; label: string; desc: string; icon: LucideIcon }[] = [
    {
      id: 'light',
      label: 'Mode Terang',
      desc: 'Tampilan cerah, bersih, dan kontras tinggi.',
      icon: Sun,
    },
    {
      id: 'dark',
      label: 'Mode Gelap',
      desc: 'Nyaman di mata untuk malam hari & hemat baterai.',
      icon: Moon,
    },
    {
      id: 'system',
      label: 'Ikuti Sistem',
      desc: 'Otomatis berganti mengikuti preferensi perangkat Anda.',
      icon: Laptop,
    },
  ];

  return (
    <div className="flex flex-col px-6 pt-2 pb-4 animate-fadeIn">
      {/* Center Theme Illustration */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500/20 via-brand-400/10 to-blue-500/20 dark:from-purple-950/80 dark:to-blue-950/60 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-md mb-3">
          <Palette size={38} strokeWidth={1.8} />
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Pilih tampilan tema
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Sesuaikan kenyamanan visual aplikasi. Dapat diubah kapan saja.
        </p>
      </div>

      {/* Theme Options */}
      <div className="mt-5 space-y-2.5">
        {themeOptions.map((opt) => {
          const isSelected = selectedTheme === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectTheme(opt.id)}
              className={`w-full flex items-start gap-3.5 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-sm ring-1 ring-brand-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-cardDark hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {opt.label}
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirmation banner */}
      <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2.5">
        <Sparkles className="text-emerald-600 dark:text-emerald-400 shrink-0" size={16} />
        <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium leading-tight">
          Ketuk tombol panah di bawah untuk menyelesaikan onboarding dan masuk ke beranda.
        </p>
      </div>
    </div>
  );
};
