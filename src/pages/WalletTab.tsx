import React, { useState } from 'react';
import { Plus, X, Landmark, Smartphone, Banknote, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { WalletType } from '../types';
import { formatCurrency } from '../utils/formatters';
import { WALLET_PRESETS, WalletIconBadge } from '../components/common/WalletIcon';

export const WalletTab: React.FC = () => {
  const books = useAppStore((s) => s.books);
  const activeBookId = useAppStore((s) => s.activeBookId);
  const wallets = useAppStore((s) => s.wallets);
  const addWallet = useAppStore((s) => s.addWallet);
  const deleteWallet = useAppStore((s) => s.deleteWallet);

  const currentBook = books.find((b) => b.id === activeBookId) || books[0];
  const bookWallets = wallets.filter((w) => w.bookId === currentBook?.id);
  const totalBalance = bookWallets.reduce((acc, w) => acc + w.currentBalance, 0);

  // New Wallet Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [walletType, setWalletType] = useState<WalletType>('bank');
  const [initialBalance, setInitialBalance] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0060AF');

  const handleCreateWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !currentBook) return;

    const numBalance = parseFloat(initialBalance.replace(/[^0-9]/g, '')) || 0;

    addWallet({
      bookId: currentBook.id,
      name: name.trim(),
      type: walletType,
      initialBalance: numBalance,
      currency: 'IDR',
      icon: walletType === 'bank' ? 'Landmark' : walletType === 'ewallet' ? 'Smartphone' : 'Banknote',
      color: selectedColor,
    });

    setName('');
    setInitialBalance('');
    setIsModalOpen(false);
  };

  const handleSelectPreset = (preset: typeof WALLET_PRESETS[0]) => {
    setName(preset.defaultName);
    setWalletType(preset.type);
    setSelectedColor(preset.color);
  };

  return (
    <div className="px-5 pt-safe pt-4 space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Daftar Rekening & Dompet
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Dompet di {currentBook?.name || 'Buku'}
          </h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition-all cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Tambah</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 dark:bg-surface-cardDark text-white flex items-center justify-between shadow-md">
        <div>
          <div className="text-xs text-slate-400">Total di Semua Dompet</div>
          <div className="text-xl font-extrabold tabular-nums mt-0.5 text-white">
            {formatCurrency(totalBalance)}
          </div>
        </div>
        <div className="px-3 py-1 rounded-xl bg-white/10 text-xs font-semibold text-slate-200">
          {bookWallets.length} Akun Terhubung
        </div>
      </div>

      {/* Wallets List */}
      <div className="space-y-3">
        {bookWallets.map((wallet) => (
          <div
            key={wallet.id}
            className="p-4 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
                style={{ backgroundColor: wallet.color || '#3B82F6' }}
              >
                <WalletIconBadge type={wallet.type} iconName={wallet.icon} size={22} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {wallet.name}
                </div>
                <div className="text-xs text-slate-400 capitalize">
                  {wallet.type === 'bank' ? 'Rekening Bank' : wallet.type === 'ewallet' ? 'Dompet Digital' : 'Uang Tunai'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  {formatCurrency(wallet.currentBalance, wallet.currency)}
                </div>
                <div className="text-[10px] text-slate-400">Saldo aktif</div>
              </div>

              {bookWallets.length > 1 && (
                <button
                  onClick={() => deleteWallet(wallet.id)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Hapus dompet"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Dompet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Tambah Akun / Dompet Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateWallet} className="mt-4 space-y-4">
              {/* Preset Chips */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pilihan Rekomendasi
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {WALLET_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Dompet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: BCA Payroll, GoPay, Dompet Tunai"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Akun
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWalletType('bank')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 cursor-pointer ${
                      walletType === 'bank'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Landmark size={18} />
                    <span>Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletType('ewallet')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 cursor-pointer ${
                      walletType === 'ewallet'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Smartphone size={18} />
                    <span>E-Wallet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletType('cash')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 cursor-pointer ${
                      walletType === 'cash'
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Banknote size={18} />
                    <span>Tunai</span>
                  </button>
                </div>
              </div>

              {/* Initial Balance */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Saldo Awal
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold tabular-nums text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Simpan Akun / Dompet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
