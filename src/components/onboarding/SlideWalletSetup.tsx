import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Banknote, 
  Coins, 
  ChevronRight, 
  RefreshCw, 
  X, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { WalletType } from '../../types';
import { WALLET_PRESETS, WalletIconBadge } from '../common/WalletIcon';
import { formatCurrency } from '../../utils/formatters';

interface SlideWalletSetupProps {
  data: {
    name: string;
    type: WalletType;
    initialBalance: number;
    currency: string;
    icon: string;
    color: string;
  };
  onChange: (data: {
    name: string;
    type: WalletType;
    initialBalance: number;
    currency: string;
    icon: string;
    color: string;
  }) => void;
  error?: string;
}

const ACCOUNT_TYPES: { type: WalletType; label: string; desc: string; defaultIcon: string; defaultColor: string }[] = [
  { type: 'bank', label: 'Debit Card / Bank', desc: 'BCA, Mandiri, BRI, BNI, Jago, dll.', defaultIcon: 'Landmark', defaultColor: '#0060AF' },
  { type: 'cash', label: 'Cash / Tunai', desc: 'Uang fisik di dompet atau saku', defaultIcon: 'Banknote', defaultColor: '#10B981' },
  { type: 'ewallet', label: 'E-Wallet', desc: 'GoPay, OVO, DANA, ShopeePay', defaultIcon: 'Smartphone', defaultColor: '#00AED6' },
  { type: 'other', label: 'Kartu Kredit', desc: 'Limit & cicilan kartu kredit', defaultIcon: 'CreditCard', defaultColor: '#8B5CF6' },
];

const CURRENCIES = [
  { code: 'IDR', label: 'Indonesian Rupiah (IDR)', symbol: 'Rp' },
  { code: 'USD', label: 'US Dollar (USD)', symbol: '$' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$' },
  { code: 'MYR', label: 'Malaysian Ringgit (MYR)', symbol: 'RM' },
  { code: 'EUR', label: 'Euro (EUR)', symbol: '€' },
];

export const SlideWalletSetup: React.FC<SlideWalletSetupProps> = ({
  data,
  onChange,
  error,
}) => {
  const [balanceText, setBalanceText] = useState<string>(
    data.initialBalance > 0 ? String(data.initialBalance) : ''
  );
  const [isTypeSwitchOpen, setIsTypeSwitchOpen] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [isCurrencyPickerOpen, setIsCurrencyPickerOpen] = useState(false);

  const activeTypeObj = ACCOUNT_TYPES.find((t) => t.type === data.type) || ACCOUNT_TYPES[0];
  const activeCurrencyObj = CURRENCIES.find((c) => c.code === data.currency) || CURRENCIES[0];

  const handleBalanceChange = (val: string) => {
    const cleanNum = val.replace(/[^0-9]/g, '');
    setBalanceText(cleanNum);
    onChange({
      ...data,
      initialBalance: parseFloat(cleanNum) || 0,
    });
  };

  const handleSelectType = (accType: typeof ACCOUNT_TYPES[0]) => {
    onChange({
      ...data,
      type: accType.type,
      icon: accType.defaultIcon,
      color: accType.defaultColor,
    });
    setIsTypeSwitchOpen(false);
  };

  const handleSelectPreset = (preset: typeof WALLET_PRESETS[0]) => {
    onChange({
      ...data,
      name: preset.defaultName,
      type: preset.type,
      icon: preset.type === 'bank' ? 'Landmark' : preset.type === 'ewallet' ? 'Smartphone' : 'Banknote',
      color: preset.color,
    });
    setIsIconPickerOpen(false);
  };

  return (
    <div className="flex flex-col px-6 pt-2 pb-4 animate-fadeIn">
      {/* Centered Debit Card Illustration & Type Switch Pill */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="w-24 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-800 text-white p-2.5 shadow-lg relative overflow-hidden flex flex-col justify-between border border-white/10">
          <div className="flex justify-between items-start">
            <div className="w-5 h-3.5 rounded bg-amber-400/85 border border-amber-300/40 shadow-inner" />
            <CreditCard size={14} className="text-white/60" />
          </div>
          <div className="flex justify-between items-end text-[9px] font-mono tracking-widest text-slate-300">
            <span>•••• 8899</span>
            <span className="text-[8px] uppercase font-sans text-brand-400 font-bold">{data.currency}</span>
          </div>
        </div>

        {/* Interactive Sub-label pill to switch account type */}
        <button
          type="button"
          onClick={() => setIsTypeSwitchOpen(true)}
          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <span>{activeTypeObj.label}</span>
          <RefreshCw size={11} className="text-brand-600 dark:text-brand-400" />
        </button>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-2.5">
          Set up your account
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          Masukkan informasi akun atau rekening pertama Anda.
        </p>
      </div>

      {/* Card List Fields */}
      <div className="mt-5 bg-white dark:bg-surface-cardDark rounded-2xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
        {/* Field 1: Account Name */}
        <div className="flex items-center gap-3.5 p-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Wallet size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="accountNameInput" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Account Name
            </label>
            <input
              id="accountNameInput"
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="mis. BCA, Mandiri, Cash"
              className="w-full mt-0.5 bg-transparent text-sm font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Field 2: Balance */}
        <div className="flex items-center gap-3.5 p-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Banknote size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="balanceInput" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Balance
            </label>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-slate-400">
                {activeCurrencyObj.symbol}
              </span>
              <input
                id="balanceInput"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={balanceText}
                onChange={(e) => handleBalanceChange(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-sm font-bold tabular-nums text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
          </div>
        </div>

        {/* Field 3: Icon (tap to open picker) */}
        <button
          type="button"
          onClick={() => setIsIconPickerOpen(true)}
          className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: data.color }}
            >
              <WalletIconBadge type={data.type} iconName={data.icon} size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Icon
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {data.name || 'Pilih Ikon'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-xs font-medium text-slate-400">Pilih</span>
            <ChevronRight size={18} />
          </div>
        </button>

        {/* Field 4: Currency (tap to open picker) */}
        <button
          type="button"
          onClick={() => setIsCurrencyPickerOpen(true)}
          className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Coins size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Currency
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate max-w-[190px]">
                {activeCurrencyObj.label}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-xs font-medium text-slate-400">{data.currency}</span>
            <ChevronRight size={18} />
          </div>
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 flex items-center gap-1 px-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}

      {/* Helper text */}
      <p className="mt-2 text-[11px] text-slate-400 px-1">
        Saldo terdaftar: <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(data.initialBalance, data.currency)}</span>
      </p>

      {/* Account Type Switcher Modal */}
      {isTypeSwitchOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 dark:border-slate-800 space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Ganti Jenis Akun
              </h3>
              <button
                type="button"
                onClick={() => setIsTypeSwitchOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {ACCOUNT_TYPES.map((t) => {
                const isSelected = data.type === t.type;
                return (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => handleSelectType(t)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {t.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {t.desc}
                      </div>
                    </div>
                    {isSelected && <Check size={16} className="text-brand-600 dark:text-brand-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Icon & Preset Picker Modal */}
      {isIconPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pilih Preset Akun / Dompet
              </h3>
              <button
                type="button"
                onClick={() => setIsIconPickerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {WALLET_PRESETS.map((preset) => {
                const isSelected = data.name === preset.defaultName;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-600 font-bold ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: preset.color }}
                    >
                      <WalletIconBadge type={preset.type} size={16} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Currency Picker Modal */}
      {isCurrencyPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-surface-cardDark rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 dark:border-slate-800 space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pilih Mata Uang
              </h3>
              <button
                type="button"
                onClick={() => setIsCurrencyPickerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1.5">
              {CURRENCIES.map((c) => {
                const isSelected = data.currency === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onChange({ ...data, currency: c.code });
                      setIsCurrencyPickerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{c.label}</span>
                    </div>
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">{c.symbol}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
