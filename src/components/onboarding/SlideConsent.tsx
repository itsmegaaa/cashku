import React, { useState } from 'react';
import { Sparkles, Check, X, Shield, FileText } from 'lucide-react';

interface SlideConsentProps {
  onStart: () => void;
}

export const SlideConsent: React.FC<SlideConsentProps> = ({ onStart }) => {
  const [agreed, setAgreed] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-6 text-center animate-fadeIn min-h-full">
      {/* Top Branding Section */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-elevated flex items-center justify-center">
            <div className="w-full h-full bg-surface-cardLight dark:bg-surface-cardDark rounded-[22px] flex items-center justify-center">
              <img src="/logo.svg" alt="Cashku Logo" className="w-16 h-16" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1.5 rounded-full shadow-md">
            <Sparkles size={16} />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Cashku
        </h1>
        <p className="mt-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
          Catat, Pantau, Tenang
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Kelola pos keuangan pribadi, keluarga, dan usaha dalam buku terpisah secara rapi dan mandiri di perangkat Anda.
        </p>
      </div>

      {/* Security Highlights */}
      <div className="my-6 p-4 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800 shadow-sm text-left max-w-sm mx-auto w-full space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Shield size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Offline-First</div>
            <div className="text-[11px] text-slate-400">Data keuangan tersimpan aman di perangkat lokal Anda.</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Tanpa Iklan & Pelacak</div>
            <div className="text-[11px] text-slate-400">Pengalaman pencatatan bersih tanpa kebocoran data.</div>
          </div>
        </div>
      </div>

      {/* Bottom Agreement & Start Button */}
      <div className="w-full max-w-sm mx-auto space-y-4">
        {/* Checkbox Agreement */}
        <label className="flex items-start gap-2.5 text-left cursor-pointer group select-none">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                agreed
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-slate-400'
              }`}
            >
              {agreed && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
            Saya menyetujui{' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTermsModal(true);
              }}
              className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
            >
              Syarat & Ketentuan
            </button>{' '}
            serta{' '}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrivacyModal(true);
              }}
              className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
            >
              Kebijakan Privasi
            </button>
            .
          </span>
        </label>

        {/* Full-width "Mulai" Button */}
        <button
          type="button"
          onClick={onStart}
          disabled={!agreed}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all shadow-md min-h-[50px] cursor-pointer ${
            agreed
              ? 'bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white shadow-brand-600/25'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          Mulai
        </button>
      </div>

      {/* Modal Syarat & Ketentuan */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn text-left">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[80vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Syarat & Ketentuan</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>1. <strong>Penggunaan Aplikasi:</strong> Cashku disediakan sebagai alat pencatatan keuangan mandiri tanpa menghubungkan data credential perbankan rahasia pengguna.</p>
              <p>2. <strong>Tanggung Jawab Data:</strong> Seluruh catatan nominal, buku, dan transaksi disimpan di penyimpanan lokal browser Anda.</p>
              <p>3. <strong>Ketersediaan Layanan:</strong> Aplikasi dapat dijalankan tanpa koneksi internet (PWA offline-first).</p>
            </div>
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs mt-3"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Modal Kebijakan Privasi */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn text-left">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[80vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kebijakan Privasi</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>1. <strong>Privasi Penuh:</strong> Cashku tidak mengunggah, menjual, atau menganalisis data keuangan Anda ke server pihak ketiga manapun.</p>
              <p>2. <strong>Penyimpanan Lokal:</strong> Semua informasi tersimpan langsung di memori perangkat Anda (Local Storage / IndexedDB).</p>
              <p>3. <strong>Penghapusan:</strong> Anda dapat menghapus atau mereset seluruh data kapan saja melalui menu Pengaturan.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs mt-3"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
