import React from 'react';
import { BookOpen, WalletCards, ShieldCheck, Sparkles } from 'lucide-react';

export const SlideWelcome: React.FC = () => {
  return (
    <div className="flex flex-col px-6 pt-2 pb-4 text-center animate-fadeIn">
      {/* Top / Brand */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-elevated flex items-center justify-center">
            <div className="w-full h-full bg-surface-cardLight dark:bg-surface-cardDark rounded-[22px] flex items-center justify-center">
              <img src="/logo.svg" alt="CashKu Logo" className="w-14 h-14" />
            </div>
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 bg-brand-500 text-white p-1.5 rounded-full shadow-md">
            <Sparkles size={14} />
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          CashKu
        </h1>
        <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
          Catat, Pantau, Tenang
        </p>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Kelola pos keuangan pribadi, keluarga, dan usaha dalam buku terpisah secara rapi dan praktis.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="space-y-2.5 mt-5 text-left max-w-sm mx-auto w-full">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Konsep Multi-Buku</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Pisahkan buku pribadi, usaha, atau bersama.</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <WalletCards size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Banyak Dompet & Rekening</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Pantau saldo bank, e-wallet, dan tunai.</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Privasi & Offline-First</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Data tersimpan aman di perangkat lokal Anda.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
