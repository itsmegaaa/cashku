import React, { useState } from 'react';
import { ChevronDown, Plus, TrendingDown, TrendingUp, ReceiptText, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency, formatDate } from '../utils/formatters';
import { BookIconBadge } from '../components/common/BookIcon';
import { WalletIconBadge } from '../components/common/WalletIcon';
import { AddTransactionModal } from '../components/transaction/AddTransactionModal';

export const BookTab: React.FC = () => {
  const books = useAppStore((s) => s.books);
  const activeBookId = useAppStore((s) => s.activeBookId);
  const setActiveBookId = useAppStore((s) => s.setActiveBookId);
  const wallets = useAppStore((s) => s.wallets);
  const transactions = useAppStore((s) => s.transactions);
  const deleteTransaction = useAppStore((s) => s.deleteTransaction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);

  // Active book
  const currentBook = books.find((b) => b.id === activeBookId) || books[0];
  const activeWallets = wallets.filter((w) => w.bookId === currentBook?.id);
  const activeTransactions = transactions.filter((t) => t.bookId === currentBook?.id);

  // Calculations
  const totalBalance = activeWallets.reduce((acc, w) => acc + w.currentBalance, 0);

  const totalIncome = activeTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = activeTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="px-5 pt-safe pt-4 space-y-5 animate-fadeIn">
      {/* Top Header: Active Book Switcher */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
              Buku Keuangan
            </span>
            <button
              onClick={() => setShowBookDropdown(!showBookDropdown)}
              className="flex items-center gap-2 mt-0.5 text-left group cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: currentBook?.color || '#10B981' }}
              >
                <BookIconBadge icon={currentBook?.icon || 'book'} size={15} />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                {currentBook?.name || 'Buku Pribadi'}
              </h1>
              <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600 transition-transform" />
            </button>
          </div>

          {/* Quick Action to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Catat</span>
          </button>
        </div>

        {/* Dropdown for Book Selection */}
        {showBookDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-surface-cardDark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-30 animate-fadeIn">
            <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase">
              Pilih Buku Aktif
            </div>
            <div className="space-y-1">
              {books.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBookId(b.id);
                    setShowBookDropdown(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    b.id === currentBook?.id
                      ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                    style={{ backgroundColor: b.color }}
                  >
                    <BookIconBadge icon={b.icon} size={13} />
                  </div>
                  <span className="truncate">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 text-white p-6 shadow-xl">
        {/* Background glow circle */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between text-slate-300 text-xs font-medium">
            <span>Total Saldo Terpantau</span>
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] uppercase font-semibold">
              {activeWallets.length} Dompet
            </span>
          </div>

          <div className="mt-2 text-3xl font-extrabold tracking-tight tabular-nums">
            {formatCurrency(totalBalance)}
          </div>

          {/* Income & Expense pill summary */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <TrendingUp size={16} />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-slate-400 font-medium">Pemasukan</div>
                <div className="text-xs font-bold text-emerald-400 tabular-nums truncate">
                  +{formatCurrency(totalIncome)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <TrendingDown size={16} />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-slate-400 font-medium">Pengeluaran</div>
                <div className="text-xs font-bold text-rose-400 tabular-nums truncate">
                  -{formatCurrency(totalExpense)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Riwayat Transaksi
          </h2>
          <span className="text-xs text-slate-400">
            {activeTransactions.length} transaksi
          </span>
        </div>

        {activeTransactions.length === 0 ? (
          /* Friendly Empty State */
          <div className="p-8 rounded-3xl bg-white dark:bg-surface-cardDark border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
              <ReceiptText size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Belum ada transaksi di buku ini
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                Mulai catat pengeluaran harian atau pemasukan Anda agar keuangan tetap terpantau rapi.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-600/20 hover:bg-brand-700 transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Catat Transaksi Pertama</span>
            </button>
          </div>
        ) : (
          /* Transaction Item Cards */
          <div className="space-y-2">
            {activeTransactions.map((tx) => {
              const wallet = wallets.find((w) => w.id === tx.walletId);
              const isIncome = tx.type === 'income';

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {tx.category}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <WalletIconBadge type={wallet?.type} size={11} />
                          <span className="truncate max-w-[90px]">{wallet?.name || 'Dompet'}</span>
                        </span>
                        <span>•</span>
                        <span>{formatDate(tx.date)}</span>
                        {tx.notes && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[100px] text-slate-500">{tx.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount & Delete Action */}
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span
                      className={`text-sm font-bold tabular-nums ${
                        isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Hapus transaksi"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {currentBook && (
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultBookId={currentBook.id}
        />
      )}
    </div>
  );
};
