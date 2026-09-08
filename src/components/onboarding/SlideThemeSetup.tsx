import React, { useState } from 'react';
import { Check, Sun, Moon, Laptop, Sparkles, LucideIcon } from 'lucide-react';
import { ThemeMode } from '../../types';
import { applyThemeClass } from '../../store/useAppStore';

interface SlideThemeSetupProps {
  initialTheme?: ThemeMode;
  onFinish: (theme: ThemeMode) => void;
  onBack?: () => void;
}

export const SlideThemeSetup: React.FC<SlideThemeSetupProps> = ({
  initialTheme = 'system',
  onFinish,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(initialTheme);

  const handleSelectTheme = (theme: ThemeMode) => {
    setSelectedTheme(theme);
    applyThemeClass(theme);
  };

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
    <div className="flex flex-col min-h-full justify-between px-6 pt-3 pb-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Pilih Tampilan Favorit
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Sesuaikan kenyamanan visual aplikasi. Anda dapat mengubahnya kapan saja di menu Pengaturan.
        </p>

        {/* Theme Options */}
        <div className="mt-6 space-y-3">
          {themeOptions.map((opt) => {
            const isSelected = selectedTheme === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectTheme(opt.id)}
                className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-sm ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-cardDark hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirmation banner */}
        <div className="mt-6 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3">
          <Sparkles className="text-emerald-600 dark:text-emerald-400 shrink-0" size={18} />
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            Setup awal Anda selesai! Buku dan dompet pertama siap digunakan untuk mencatat pengeluaran.
          </p>
        </div>
      </div>

      {/* Finish CTA */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => onFinish(selectedTheme)}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold shadow-lg shadow-brand-600/25 transition-all text-base min-h-[50px] cursor-pointer"
        >
          <span>Selesai & Masuk ke Beranda</span>
          <Check size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
