export type ThemeMode = 'system' | 'light' | 'dark';

export type BookIconType = 'book' | 'user' | 'briefcase' | 'heart' | 'home' | 'star' | 'coffee' | 'shopping-bag';

export interface Book {
  id: string;
  name: string;
  icon: BookIconType;
  color: string;
  isDefault: boolean;
  createdAt: string;
}

export type WalletType = 'bank' | 'ewallet' | 'cash' | 'other';

export interface Wallet {
  id: string;
  bookId: string;
  name: string;
  type: WalletType;
  initialBalance: number;
  currentBalance: number;
  currency: string; // e.g. 'IDR'
  icon: string;
  color: string;
  accountNumber?: string;
  createdAt: string;
}

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  bookId: string;
  walletId: string;
  toWalletId?: string; // for transfer
  type: TransactionType;
  amount: number;
  category: string;
  date: string; // ISO string
  notes?: string;
  createdAt: string;
}

export type TabType = 'book' | 'wallet' | 'analysis' | 'more';

export interface UserPreferences {
  theme: ThemeMode;
  onboardingCompleted: boolean;
  activeBookId: string | null;
  currency: string;
}
