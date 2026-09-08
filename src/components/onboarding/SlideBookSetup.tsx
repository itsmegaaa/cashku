import React, { useState } from 'react';
import { PiggyBank, BookOpen, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import { BookIconType } from '../../types';
import { BOOK_ICONS, BOOK_COLORS, BookIconBadge } from '../common/BookIcon';

interface SlideBookSetupProps {
  data: {
    name: string;
    icon: BookIconType;
    color: string;
  };
  onChange: (data: { name: string; icon: BookIconType; color: string }) => void;
  error?: string;
}

export const SlideBookSetup: React.FC<SlideBookSetupProps> = ({
  data,
  onChange,
  error,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const activeIconItem = BOOK_ICONS.find((i) => i.type === data.icon) || BOOK_ICONS[0];

  return (
    <div className="flex flex-col px-6 pt-2 pb-4 animate-fadeIn">
      {/* Centered Piggy Bank Illustration */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-emerald-400/10 to-brand-500/30 dark:from-emerald-950/80 dark:to-brand-950/60 border border-emerald-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-md mb-3">
          <PiggyBank size={40} strokeWidth={1.8} />
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Set up your book first
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Buku ini menjadi ruang pencatatan keuangan utama Anda.
        </p>
      </div>

      {/* Card List Fields */}
      <div className="mt-6 bg-white dark:bg-surface-cardDark rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
        {/* Field 1: Book Name */}
        <div className="flex items-center gap-3.5 p-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="bookNameInput" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Book Name
            </label>
            <input
              id="bookNameInput"
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="mis. Buku Pribadi"
              maxLength={32}
              className="w-full mt-0.5 bg-transparent text-sm font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Field 2: Icon & Color (tap to open picker) */}
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: data.color }}
            >
              <BookIconBadge icon={data.icon} size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Icon
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {activeIconItem.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-xs font-medium text-slate-400">Pilih</span>
            <ChevronRight size={18} />
          </div>
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1 px-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}

      {/* Icon & Color Picker Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pilih Ikon & Warna Buku
              </h3>
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Icon Presets Grid */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Pilihan Ikon
              </label>
              <div className="grid grid-cols-4 gap-2">
                {BOOK_ICONS.map((item) => {
                  const isSelected = data.icon === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => onChange({ ...data, icon: item.type })}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-[11px] transition-all cursor-pointer ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-bold ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <BookIconBadge icon={item.type} size={20} />
                      <span className="truncate max-w-full">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Warna Aksen
              </label>
              <div className="flex items-center justify-between px-1">
                {BOOK_COLORS.map((c) => {
                  const isSelected = data.color === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onChange({ ...data, color: c })}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform cursor-pointer ${
                        isSelected ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900 scale-110' : 'opacity-85'
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPickerOpen(false)}
              className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold text-xs shadow-md mt-2 cursor-pointer"
            >
              Gunakan Pilihan Ini
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
