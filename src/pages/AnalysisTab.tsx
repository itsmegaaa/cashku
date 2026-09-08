import React from 'react';
import { ArrowUpRight, ArrowDownRight, PieChart as PieIcon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency } from '../utils/formatters';

export const AnalysisTab: React.FC = () => {
  const books = useAppStore((s) => s.books);
  const activeBookId = useAppStore((s) => s.activeBookId);
  const transactions = useAppStore((s) => s.transactions);

  const currentBook = books.find((b) => b.id === activeBookId) || books[0];
  const activeTransactions = transactions.filter((t) => t.bookId === currentBook?.id);

  const totalIncome = activeTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = activeTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netSavings = totalIncome - totalExpense;

  // Breakdown by category for expenses
  const expenseByCategory: Record<string, number> = {};
  activeTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    });

  const sortedExpenseCategories = Object.entries(expenseByCategory)
    .map(([cat, amount]) => ({
      category: cat,
      amount,
      percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="px-5 pt-safe pt-4 space-y-5 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
          Analisis Keuangan
        </span>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Ringkasan {currentBook?.name || 'Buku'}
        </h1>
      </div>

      {/* Net Cash Flow Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Arus Kas Bersih (Selisih)
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              netSavings >= 0
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
            }`}
          >
            {netSavings >= 0 ? 'Surplus' : 'Defisit'}
          </span>
        </div>

        <div className="text-2xl font-black tabular-nums text-slate-900 dark:text-white">
          {formatCurrency(netSavings)}
        </div>

        {/* Comparison Bars */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <ArrowUpRight size={14} />
              <span>Pemasukan</span>
            </div>
            <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300 tabular-nums mt-1 truncate">
              {formatCurrency(totalIncome)}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400">
              <ArrowDownRight size={14} />
              <span>Pengeluaran</span>
            </div>
            <div className="text-sm font-bold text-rose-800 dark:text-rose-300 tabular-nums mt-1 truncate">
              {formatCurrency(totalExpense)}
            </div>
          </div>
        </div>
      </div>

      {/* Expense by Category Section */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Alokasi Pengeluaran
        </h2>

        {sortedExpenseCategories.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-surface-cardDark border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <PieIcon size={20} />
            </div>
            <p className="text-xs text-slate-400">
              Belum ada data pengeluaran yang tercatat di buku ini.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sortedExpenseCategories.map((item) => (
              <div
                key={item.category}
                className="p-3.5 rounded-2xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.category}
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-slate-400 ml-1.5 font-medium">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
