import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { BookIconType } from '../../types';
import { BOOK_ICONS, BOOK_COLORS, BookIconBadge } from '../common/BookIcon';

interface SlideBookSetupProps {
  initialName?: string;
  initialIcon?: BookIconType;
  initialColor?: string;
  onNext: (data: { name: string; icon: BookIconType; color: string }) => void;
  onBack?: () => void;
}

export const SlideBookSetup: React.FC<SlideBookSetupProps> = ({
  initialName = 'Buku Pribadi',
  initialIcon = 'book',
  initialColor = '#10B981',
  onNext,
}) => {
  const [name, setName] = useState(initialName);
  const [selectedIcon, setSelectedIcon] = useState<BookIconType>(initialIcon);
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onNext({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full justify-between px-6 pt-3 pb-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Buku Pertama Anda
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Setiap buku mencatat pos keuangan mandiri. Anda bisa menambahkan buku lain nanti.
        </p>

        {/* Live Preview Card */}
        <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-colors"
            style={{ backgroundColor: selectedColor }}
          >
            <BookIconBadge icon={selectedIcon} size={28} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Preview Buku</div>
            <div className="text-lg font-bold text-slate-800 dark:text-white truncate max-w-[200px]">
              {name.trim() || 'Nama Buku...'}
            </div>
            <div className="text-xs text-brand-600 dark:text-brand-400 font-medium">Buku Utama</div>
          </div>
        </div>

        {/* Name Input */}
        <div className="mt-6">
          <label htmlFor="bookName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Nama Buku <span className="text-red-500">*</span>
          </label>
          <input
            id="bookName"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTouched(true);
            }}
            placeholder="Contoh: Buku Pribadi, Usaha Kafe"
            maxLength={32}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              touched && !isValid
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 dark:border-slate-700 focus:ring-brand-500 focus:border-brand-500'
            }`}
          />
          {touched && !isValid && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={14} />
              Nama buku tidak boleh kosong.
            </p>
          )}
        </div>

        {/* Icon Preset Picker */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Pilih Ikon Buku
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {BOOK_ICONS.map((item) => {
              const isSelected = selectedIcon === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedIcon(item.type)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 shadow-sm ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <BookIconBadge icon={item.type} size={20} />
                  <span className="text-[11px] mt-1 font-medium truncate max-w-full">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Palette Picker */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Warna Aksen Buku
          </label>
          <div className="flex items-center gap-3">
            {BOOK_COLORS.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform cursor-pointer ${
                    isSelected ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900 scale-110' : 'opacity-85 hover:opacity-100'
                  }`}
                  aria-label={`Warna ${color}`}
                >
                  {isSelected && <Check size={16} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold shadow-md transition-all text-base min-h-[50px] cursor-pointer ${
            isValid
              ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/25 active:scale-[0.98]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Lanjut ke Akun & Dompet</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};
