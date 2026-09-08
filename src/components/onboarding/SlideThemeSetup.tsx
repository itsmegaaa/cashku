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

// 7 Pilihan Warna Aksen Sesuai Referensi Cashku
export const ACCENT_SWATCHES = [
  { id: 'green', label: 'Hijau', color: '#10B981' },
  { id: 'blue', label: 'Biru', color: '#3B82F6' },
  { id: 'purple', label: 'Ungu', color: '#8B5CF6' },
  { id: 'pink', label: 'Pink', color: '#EC4899' },
  { id: 'orange', label: 'Oranye', color: '#F97316' },
  { id: 'cyan', label: 'Cyan', color: '#06B6D4' },
  { id: 'gray', label: 'Abu-abu', color: '#64748B' },
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

  const isDarkActive =
    selectedTheme === 'dark' ||
    (selectedTheme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleQuickTheme = () => {
    const nextTheme: ThemeMode = selectedTheme === 'dark' ? 'light' : 'dark';
    handleThemeChange(nextTheme);
  };

  return (
    <div className="flex flex-col px-6 pt-2 pb-4 animate-fadeIn">
      {/* Icon Ilustrasi: Animasi Toggle Switch On/Off */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="relative mb-3.5 py-1">
          {/* Animated Toggle Switch Button */}
          <button
            type="button"
            onClick={toggleQuickTheme}
            className={`w-24 h-12 rounded-full p-1 transition-all duration-300 shadow-md flex items-center cursor-pointer border ${
              isDarkActive
                ? 'bg-slate-800 border-slate-700 justify-end'
                : 'bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-slate-700 justify-start'
            }`}
            style={{
              borderColor: accentColor,
            }}
            aria-label="Toggle tema visual"
          >
            {/* Animated Knob */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 transform scale-100"
              style={{ backgroundColor: accentColor }}
            >
              {isDarkActive ? (
                <Moon size={20} className="animate-spin-slow text-white" />
              ) : (
                <Sun size={20} className="animate-spin-slow text-white" />
              )}
            </div>
          </button>
        </div>

        {/* Judul & Subjudul persis sesuai spesifikasi */}
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Pilih tema kamu
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Sesuaikan warna aksen dan mode tampilan yang nyaman untukmu.
        </p>
      </div>

      {/* Card/Container Putih */}
      <div className="mt-6 bg-white dark:bg-surface-cardDark rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
        {/* Section 1: WARNA AKSEN */}
        <div className="p-4 space-y-2.5">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            WARNA AKSEN
          </div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {ACCENT_SWATCHES.map((swatch) => {
              const isSelected = accentColor.toLowerCase() === swatch.color.toLowerCase();
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
                  aria-label={`Pilih warna ${swatch.label}`}
                >
                  {isSelected && <Check size={14} strokeWidth={3} className="text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: MODE TAMPILAN */}
        <div className="p-4 space-y-2">
          <label htmlFor="modeSelect" className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            MODE TAMPILAN
          </label>
          <div className="relative">
            {/* Left Icon (Laptop / Sun / Moon) */}
            <div
              className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
              style={{ color: accentColor }}
            >
              {selectedTheme === 'light' ? (
                <Sun size={18} />
              ) : selectedTheme === 'dark' ? (
                <Moon size={18} />
              ) : (
                <Laptop size={18} />
              )}
            </div>

            {/* Dropdown Selector */}
            <select
              id="modeSelect"
              value={selectedTheme}
              onChange={(e) => handleThemeChange(e.target.value as ThemeMode)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 appearance-none cursor-pointer"
              style={{
                outlineColor: accentColor,
              }}
            >
              <option value="system">Ikuti Sistem (Otomatis)</option>
              <option value="light">Mode Terang</option>
              <option value="dark">Mode Gelap</option>
            </select>

            {/* Right Chevron */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
