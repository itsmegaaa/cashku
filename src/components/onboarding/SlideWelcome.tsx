import React from 'react';
import { ArrowRight, BookOpen, WalletCards, ShieldCheck, Sparkles } from 'lucide-react';

interface SlideWelcomeProps {
  onNext: () => void;
}

export const SlideWelcome: React.FC<SlideWelcomeProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col min-h-full justify-between px-6 py-4 text-center animate-fadeIn">
      {/* Top / Brand */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-elevated flex items-center justify-center">
            <div className="w-full h-full bg-surface-cardLight dark:bg-surface-cardDark rounded-[22px] flex items-center justify-center">
              <img src="/logo.svg" alt="CashKu Logo" className="w-16 h-16" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-brand-500 text-white p-1.5 rounded-full shadow-md">
            <Sparkles size={16} />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          CashKu
        </h1>
        <p className="mt-2 text-base font-medium text-brand-600 dark:text-brand-400">
          Catat, Pantau, Tenang
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Kelola pos keuangan pribadi, keluarga, dan usaha dalam buku terpisah secara rapi dan praktis.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="space-y-3 my-5 text-left max-w-sm mx-auto w-full">
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Konsep Multi-Buku</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Pisahkan buku pribadi, usaha sampingan, atau bersama.</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <WalletCards size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Banyak Dompet & Rekening</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Pantau saldo BCA, GoPay, Tunai, dan tabungan di satu tempat.</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Privasi & Offline-First</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Data tersimpan di perangkat Anda, cepat dan dapat diakses kapan pun.</div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold shadow-lg shadow-brand-600/25 transition-all text-base min-h-[50px] cursor-pointer"
        >
          <span>Mulai Sekarang</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
