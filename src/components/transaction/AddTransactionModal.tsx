import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { TransactionType } from '../../types';
import { WalletIconBadge } from '../common/WalletIcon';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBookId: string;
}

const EXPENSE_CATEGORIES = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja Harian',
  'Tagihan & Utilitas',
  'Hiburan & Hobi',
  'Kesehatan',
  'Pendidikan',
  'Lainnya',
];

const INCOME_CATEGORIES = [
  'Gaji',
  'Bonus & Tunjangan',
  'Hasil Usaha',
  'Investasi',
  'Hadiah / Hibah',
  'Lainnya',
];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  defaultBookId,
}) => {
  const wallets = useAppStore((s) => s.wallets.filter((w) => w.bookId === defaultBookId));
  const addTransaction = useAppStore((s) => s.addTransaction);

  const [type, setType] = useState<TransactionType>('expense');
  const [amountInput, setAmountInput] = useState<string>('');
  const [selectedWalletId, setSelectedWalletId] = useState<string>(wallets[0]?.id || '');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [notes, setNotes] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const numericAmount = parseFloat(amountInput.replace(/[^0-9]/g, '')) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) {
      setError('Nominal harus lebih besar dari 0');
      return;
    }
    if (!selectedWalletId && wallets.length > 0) {
      setError('Silakan pilih akun / dompet');
      return;
    }

    addTransaction({
      bookId: defaultBookId,
      walletId: selectedWalletId || wallets[0]?.id || 'default',
      type,
      amount: numericAmount,
      category,
      notes: notes.trim(),
      date: new Date(date).toISOString(),
    });

    // Reset & close
    setAmountInput('');
    setNotes('');
    setError('');
    onClose();
  };

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Catat Transaksi Baru
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Income / Expense Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory(EXPENSE_CATEGORIES[0]);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                type === 'expense'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ArrowDownRight size={18} />
              <span>Pengeluaran</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory(INCOME_CATEGORIES[0]);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ArrowUpRight size={18} />
              <span>Pemasukan</span>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nominal Transaksi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                placeholder="0"
                value={amountInput}
                onChange={(e) => {
                  setAmountInput(e.target.value.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xl font-bold tabular-nums text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {error && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Wallet Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Sumber Akun / Dompet
            </label>
            {wallets.length === 0 ? (
              <div className="text-xs text-amber-600 dark:text-amber-400 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40">
                Belum ada dompet di buku ini. Silakan buat dompet terlebih dahulu di tab Dompet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {wallets.map((w) => {
                  const isSelected = (selectedWalletId || wallets[0]?.id) === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWalletId(w.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <WalletIconBadge type={w.type} size={16} />
                      <span className="truncate">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Kategori
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    category === cat
                      ? 'border-brand-500 bg-brand-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Note Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Catatan (Opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="mis. Makan siang"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-md shadow-brand-600/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
            >
              <Check size={18} />
              <span>Simpan Transaksi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
