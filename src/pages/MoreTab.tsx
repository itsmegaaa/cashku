import React, { useState } from 'react';
import { 
  BookOpen, 
  Palette, 
  Trash2, 
  Plus, 
  RefreshCcw, 
  Sun, 
  Moon, 
  Laptop, 
  Check, 
  X, 
  ShieldCheck
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ThemeMode, BookIconType } from '../types';
import { BOOK_ICONS, BOOK_COLORS, BookIconBadge } from '../components/common/BookIcon';

export const MoreTab: React.FC = () => {
  const books = useAppStore((s) => s.books);
  const activeBookId = useAppStore((s) => s.activeBookId);
  const setActiveBookId = useAppStore((s) => s.setActiveBookId);
  const addBook = useAppStore((s) => s.addBook);
  const deleteBook = useAppStore((s) => s.deleteBook);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const resetAll = useAppStore((s) => s.resetAll);

  // New Book Modal
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [newBookIcon, setNewBookIcon] = useState<BookIconType>('briefcase');
  const [newBookColor, setNewBookColor] = useState('#3B82F6');

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookName.trim()) return;

    addBook(newBookName.trim(), newBookIcon, newBookColor);
    setNewBookName('');
    setIsAddBookOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengulang onboarding dan menghapus data lokal?')) {
      resetAll();
    }
  };

  return (
    <div className="px-5 pt-safe pt-4 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
          Pengaturan & Lainnya
        </span>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Menu Pengaturan
        </h1>
      </div>

      {/* Theme Settings Section */}
      <div className="p-4 rounded-3xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <Palette size={16} className="text-brand-600 dark:text-brand-400" />
          <span>Tema Tampilan</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'light' as ThemeMode, label: 'Terang', icon: Sun },
            { id: 'dark' as ThemeMode, label: 'Gelap', icon: Moon },
            { id: 'system' as ThemeMode, label: 'Sistem', icon: Laptop },
          ].map((item) => {
            const isSelected = theme === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon size={18} className="mb-1" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Management Section */}
      <div className="p-4 rounded-3xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <BookOpen size={16} className="text-brand-600 dark:text-brand-400" />
            <span>Kelola Buku ({books.length})</span>
          </div>
          <button
            onClick={() => setIsAddBookOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <Plus size={14} />
            <span>Tambah Buku</span>
          </button>
        </div>

        <div className="space-y-2">
          {books.map((b) => {
            const isActive = b.id === activeBookId;
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  isActive
                    ? 'border-brand-500/60 bg-brand-50/40 dark:bg-brand-950/30'
                    : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <button
                  onClick={() => setActiveBookId(b.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: b.color }}
                  >
                    <BookIconBadge icon={b.icon} size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{b.name}</span>
                      {isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-600 text-white font-medium">
                          Aktif
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {books.length > 1 && (
                  <button
                    onClick={() => deleteBook(b.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Hapus buku ini"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PWA & Security Info */}
      <div className="p-4 rounded-3xl bg-white dark:bg-surface-cardDark border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Status Aplikasi PWA</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          CashKu berjalan dengan prinsip offline-first. Semua catatan multi-buku dan transaksi Anda tersimpan di perangkat lokal.
        </p>
        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Versi: 1.0.0 (MVP)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Siap Digunakan Offline</span>
        </div>
      </div>

      {/* Developer / Testing: Reset Data */}
      <div className="pt-2">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RefreshCcw size={14} />
          <span>Ulangi Onboarding / Reset Data</span>
        </button>
      </div>

      {/* Modal Tambah Buku Baru */}
      {isAddBookOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Buat Buku Keuangan Baru
              </h3>
              <button
                onClick={() => setIsAddBookOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Buku <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Usaha Cuci Sepatu, Tabungan Liburan"
                  value={newBookName}
                  onChange={(e) => setNewBookName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Ikon Buku
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {BOOK_ICONS.map((i) => (
                    <button
                      key={i.type}
                      type="button"
                      onClick={() => setNewBookIcon(i.type)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] cursor-pointer ${
                        newBookIcon === i.type
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 font-bold ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <BookIconBadge icon={i.type} size={18} />
                      <span className="truncate max-w-full">{i.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Warna Aksen
                </label>
                <div className="flex items-center gap-2.5">
                  {BOOK_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewBookColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer ${
                        newBookColor === c ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900 scale-110' : 'opacity-85'
                      }`}
                    >
                      {newBookColor === c && <Check size={14} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Simpan Buku Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
