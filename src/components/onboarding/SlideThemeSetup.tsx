import React from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../../types';
import { applyThemeClass } from '../../store/useAppStore';

interface SlideThemeSetupProps {
  selectedTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  accentColor: string;
  onSelectAccentColor: (color: string) => void;
}

export const ACCENT_SWATCHES = [
  { id: 'emerald', label: 'Emerald', color: '#10B981' },
  { id: 'blue', label: 'Royal Blue', color: '#3B82F6' },
  { id: 'purple', label: 'Violet', color: '#8B5CF6' },
  { id: 'rose', label: 'Rose', color: '#F43F5E' },
  { id: 'amber', label: 'Amber', color: '#F59E0B' },
  { id: 'cyan', label: 'Cyan', color: '#06B6D4' },
  { id: 'slate', label: 'Slate', color: '#475569' },
];

export const SlideThemeSetup: React.FC<SlideThemeSetupProps> = ({
  selectedTheme,
  onSelectTheme,
  accentColor,
  onSelectAccentColor,
}) => {
  const handleThemeChange = (newTheme: ThemeMode) => {
    onSelectTheme(newTheme);
    applyThemeClass(newTheme);
  };

  return (
    <div className="flex flex-col px-6 pt-2 pb-4 animate-fadeIn">
      {/* Centered 2-Cards Color Illustration */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="relative w-24 h-20 flex items-center justify-center mb-3">
          {/* Background tilted card */}
          <div
            className="absolute w-16 h-12 rounded-2xl shadow-md rotate-[-12deg] -left-1 top-2 transition-colors duration-300 opacity-80"
            style={{ backgroundColor: accentColor }}
          />
          {/* Foreground card */}
          <div className="absolute w-16 h-12 rounded-2xl bg-surface-cardLight dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-700 shadow-lg rotate-[8deg] right-0 top-3 flex items-center justify-center">
            <div
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Pilih tema kamu
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Sesuaikan warna aksen dan mode tampilan yang nyaman untukmu.
        </p>
      </div>

      {/* Card List Fields */}
      <div className="mt-6 bg-white dark:bg-surface-cardDark rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
        {/* Field 1: Color Swatch Bar (Strip pilihan warna aksen) */}
        <div className="p-4 space-y-2.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Warna Aksen
          </div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {ACCENT_SWATCHES.map((swatch) => {
              const isSelected = accentColor === swatch.color;
              return (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => onSelectAccentColor(swatch.color)}
                  style={{ backgroundColor: swatch.color }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900 scale-110 shadow-sm'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                  aria-label={swatch.label}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 2: Mode Tampilan (Dropdown Light / Dark / Sistem) */}
        <div className="p-4">
          <label htmlFor="themeSelect" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Mode Tampilan
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-600 dark:text-brand-400">
              {selectedTheme === 'light' ? (
                <Sun size={18} />
              ) : selectedTheme === 'dark' ? (
                <Moon size={18} />
              ) : (
                <Laptop size={18} />
              )}
            </div>
            <select
              id="themeSelect"
              value={selectedTheme}
              onChange={(e) => handleThemeChange(e.target.value as ThemeMode)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
            >
              <option value="light">Light Mode (Terang)</option>
              <option value="dark">Dark Mode (Gelap)</option>
              <option value="system">Ikuti Sistem (Otomatis)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
