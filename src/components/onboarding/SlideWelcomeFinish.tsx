import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SlideWelcomeFinishProps {
  onStart: () => void;
  bookName: string;
  accountName: string;
  accentColor?: string;
}

export const SlideWelcomeFinish: React.FC<SlideWelcomeFinishProps> = ({
  onStart,
  bookName,
  accountName,
  accentColor = '#10B981',
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-2 pb-6 text-center animate-fadeIn min-h-full">
      {/* Top Confetti / Celebration Illustration */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 via-emerald-400 to-amber-400 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-surface-cardLight dark:bg-surface-cardDark rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <Sparkles size={42} className="text-amber-500 animate-pulse" />
              {/* Confetti decorative dots */}
              <span className="absolute top-2.5 left-3 w-2 h-2 rounded-full bg-rose-500" />
              <span className="absolute bottom-3 left-4 w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500" />
              <span className="absolute bottom-2.5 right-3.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Selamat Datang
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Kelola keuanganmu dengan mudah bareng Cashku.
        </p>
      </div>

      {/* Setup Summary Card */}
      <div className="my-6 p-4 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800 shadow-sm text-left max-w-sm mx-auto w-full space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <CheckCircle2 size={16} className="text-brand-600 dark:text-brand-400" />
          <span>Pengaturan Awal Selesai</span>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pl-6">
          <p>• Buku Utama: <strong className="text-slate-700 dark:text-slate-200">{bookName || 'Buku Pribadi'}</strong></p>
          <p>• Akun Terhubung: <strong className="text-slate-700 dark:text-slate-200">{accountName || 'Kas / Tunai'}</strong></p>
          <p>• Privasi: <strong className="text-brand-600 dark:text-brand-400">Tersimpan di perangkat lokal</strong></p>
        </div>
      </div>

      {/* Full-width "Mulai" Button dengan panah -> */}
      <div className="w-full max-w-sm mx-auto">
        <button
          type="button"
          onClick={onStart}
          style={{ backgroundColor: accentColor }}
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl active:scale-[0.98] text-white font-bold text-sm shadow-lg transition-all min-h-[50px] cursor-pointer"
        >
          <span>Mulai</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
