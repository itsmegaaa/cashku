import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book, Wallet, Transaction, ThemeMode, BookIconType, WalletType } from '../types';
import { generateId } from '../utils/formatters';

interface BookSetupPayload {
  name: string;
  icon: BookIconType;
  color: string;
}

interface WalletSetupPayload {
  name: string;
  type: WalletType;
  initialBalance: number;
  currency: string;
  icon: string;
  color: string;
}

interface AppState {
  // Theme & Onboarding
  theme: ThemeMode;
  onboardingCompleted: boolean;
  activeBookId: string;
  
  // Entities
  books: Book[];
  wallets: Wallet[];
  transactions: Transaction[];
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  setActiveBookId: (id: string) => void;
  
  // Onboarding completion
  completeOnboarding: (
    book: BookSetupPayload,
    wallet: WalletSetupPayload,
    theme: ThemeMode
  ) => void;
  skipOnboarding: () => void;
  
  // Books CRUD
  addBook: (name: string, icon: BookIconType, color: string) => Book;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  
  // Wallets CRUD
  addWallet: (wallet: Omit<Wallet, 'id' | 'createdAt' | 'currentBalance'>) => Wallet;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  
  // Transactions CRUD
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => Transaction;
  deleteTransaction: (id: string) => void;
  
  // Reset for testing
  resetAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      onboardingCompleted: false,
      activeBookId: '',
      books: [],
      wallets: [],
      transactions: [],

      setTheme: (theme) => {
        set({ theme });
        applyThemeClass(theme);
      },

      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

      setActiveBookId: (activeBookId) => set({ activeBookId }),

      completeOnboarding: (bookSetup, walletSetup, theme) => {
        const bookId = generateId();
        const walletId = generateId();
        const now = new Date().toISOString();

        const newBook: Book = {
          id: bookId,
          name: bookSetup.name.trim() || 'Buku Pribadi',
          icon: bookSetup.icon || 'book',
          color: bookSetup.color || '#10B981',
          isDefault: true,
          createdAt: now,
        };

        const newWallet: Wallet = {
          id: walletId,
          bookId: bookId,
          name: walletSetup.name.trim() || 'Dompet Utama',
          type: walletSetup.type || 'cash',
          initialBalance: walletSetup.initialBalance || 0,
          currentBalance: walletSetup.initialBalance || 0,
          currency: walletSetup.currency || 'IDR',
          icon: walletSetup.icon || 'Wallet',
          color: walletSetup.color || '#3B82F6',
          createdAt: now,
        };

        set({
          books: [newBook],
          wallets: [newWallet],
          transactions: [],
          activeBookId: bookId,
          theme,
          onboardingCompleted: true,
        });

        applyThemeClass(theme);
      },

      skipOnboarding: () => {
        const bookId = generateId();
        const walletId = generateId();
        const now = new Date().toISOString();

        const defaultBook: Book = {
          id: bookId,
          name: 'Buku Pribadi',
          icon: 'book',
          color: '#10B981',
          isDefault: true,
          createdAt: now,
        };

        const defaultWallet: Wallet = {
          id: walletId,
          bookId: bookId,
          name: 'Tunai / Cash',
          type: 'cash',
          initialBalance: 0,
          currentBalance: 0,
          currency: 'IDR',
          icon: 'Banknote',
          color: '#10B981',
          createdAt: now,
        };

        set({
          books: [defaultBook],
          wallets: [defaultWallet],
          transactions: [],
          activeBookId: bookId,
          onboardingCompleted: true,
        });
      },

      addBook: (name, icon, color) => {
        const id = generateId();
        const newBook: Book = {
          id,
          name,
          icon,
          color,
          isDefault: get().books.length === 0,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          books: [...state.books, newBook],
          activeBookId: state.activeBookId || id,
        }));

        return newBook;
      },

      updateBook: (id, updates) => {
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        }));
      },

      deleteBook: (id) => {
        const state = get();
        const remainingBooks = state.books.filter((b) => b.id !== id);
        const nextActiveId =
          state.activeBookId === id
            ? remainingBooks[0]?.id || ''
            : state.activeBookId;

        set({
          books: remainingBooks,
          activeBookId: nextActiveId,
          wallets: state.wallets.filter((w) => w.bookId !== id),
          transactions: state.transactions.filter((t) => t.bookId !== id),
        });
      },

      addWallet: (walletData) => {
        const id = generateId();
        const newWallet: Wallet = {
          ...walletData,
          id,
          currentBalance: walletData.initialBalance,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          wallets: [...state.wallets, newWallet],
        }));

        return newWallet;
      },

      updateWallet: (id, updates) => {
        set((state) => ({
          wallets: state.wallets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        }));
      },

      deleteWallet: (id) => {
        set((state) => ({
          wallets: state.wallets.filter((w) => w.id !== id),
          transactions: state.transactions.filter((t) => t.walletId !== id),
        }));
      },

      addTransaction: (txData) => {
        const id = generateId();
        const newTx: Transaction = {
          ...txData,
          id,
          createdAt: new Date().toISOString(),
        };

        // Update balance on the associated wallet
        set((state) => {
          const updatedWallets = state.wallets.map((w) => {
            if (w.id === txData.walletId) {
              const delta =
                txData.type === 'income' ? txData.amount : -txData.amount;
              return { ...w, currentBalance: w.currentBalance + delta };
            }
            // Handle transfer recipient
            if (txData.type === 'transfer' && txData.toWalletId && w.id === txData.toWalletId) {
              return { ...w, currentBalance: w.currentBalance + txData.amount };
            }
            return w;
          });

          return {
            transactions: [newTx, ...state.transactions],
            wallets: updatedWallets,
          };
        });

        return newTx;
      },

      deleteTransaction: (id) => {
        const state = get();
        const tx = state.transactions.find((t) => t.id === id);
        if (!tx) return;

        set((prevState) => {
          const updatedWallets = prevState.wallets.map((w) => {
            if (w.id === tx.walletId) {
              const reverseDelta =
                tx.type === 'income' ? -tx.amount : tx.amount;
              return { ...w, currentBalance: w.currentBalance + reverseDelta };
            }
            if (tx.type === 'transfer' && tx.toWalletId && w.id === tx.toWalletId) {
              return { ...w, currentBalance: w.currentBalance - tx.amount };
            }
            return w;
          });

          return {
            transactions: prevState.transactions.filter((t) => t.id !== id),
            wallets: updatedWallets,
          };
        });
      },

      resetAll: () => {
        set({
          theme: 'system',
          onboardingCompleted: false,
          activeBookId: '',
          books: [],
          wallets: [],
          transactions: [],
        });
        applyThemeClass('system');
      },
    }),
    {
      name: 'cashku_storage_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
