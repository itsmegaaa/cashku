import React, { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { WalletType } from '../../types';
import { WALLET_PRESETS, WalletIconBadge } from '../common/WalletIcon';
import { formatCurrency } from '../../utils/formatters';

interface SlideWalletSetupProps {
  initialName?: string;
  initialType?: WalletType;
  initialBalance?: number;
  initialCurrency?: string;
  onNext: (data: {
    name: string;
    type: WalletType;
    initialBalance: number;
    currency: string;
    icon: string;
    color: string;
  }) => void;
  onBack?: () => void;
}

const CURRENCY_OPTIONS = [
  { code: 'IDR', label: 'IDR (Rupiah Indonesia)' },
  { code: 'USD', label: 'USD (US Dollar)' },
  { code: 'SGD', label: 'SGD (Singapore Dollar)' },
  { code: 'MYR', label: 'MYR (Malaysian Ringgit)' },
  { code: 'EUR', label: 'EUR (Euro)' },
];

export const SlideWalletSetup: React.FC<SlideWalletSetupProps> = ({
  initialName = 'BCA',
  initialType = 'bank',
  initialBalance = 0,
  initialCurrency = 'IDR',
  onNext,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('bca');
  const [name, setName] = useState(initialName);
  const [walletType, setWalletType] = useState<WalletType>(initialType);
  const [balanceInput, setBalanceInput] = useState<string>(initialBalance > 0 ? String(initialBalance) : '');
  const [currency, setCurrency] = useState(initialCurrency);
  const [color, setColor] = useState('#0060AF');
  const [touched, setTouched] = useState(false);

  const numericBalance = parseFloat(balanceInput.replace(/[^0-9]/g, '')) || 0;
  const isValid = name.trim().length > 0;

  const handleSelectPreset = (preset: typeof WALLET_PRESETS[0]) => {
    setSelectedPreset(preset.id);
    setName(preset.defaultName);
    setWalletType(preset.type);
    setColor(preset.color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    onNext({
      name: name.trim(),
      type: walletType,
      initialBalance: numericBalance,
      currency,
      icon: walletType === 'bank' ? 'Landmark' : walletType === 'ewallet' ? 'Smartphone' : 'Banknote',
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full justify-between px-6 pt-3 pb-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Akun atau Dompet Pertama
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Tentukan rekening bank, dompet digital, atau uang tunai yang pertama kali ingin dipantau.
        </p>

        {/* Quick Presets */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Pilihan Cepat
          </label>
          <div className="flex flex-wrap gap-2">
            {WALLET_PRESETS.slice(0, 6).map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <WalletIconBadge type={preset.type} size={14} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Name Input */}
        <div className="mt-4">
          <label htmlFor="walletName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Nama Akun / Dompet <span className="text-red-500">*</span>
          </label>
          <input
            id="walletName"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTouched(true);
            }}
            placeholder="Contoh: BCA Tabungan, GoPay, Dompet Saku"
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              touched && !isValid
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 dark:border-slate-700 focus:ring-brand-500'
            }`}
          />
          {touched && !isValid && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={14} />
              Nama akun tidak boleh kosong.
            </p>
          )}
        </div>

        {/* Balance Input with numeric keypad */}
        <div className="mt-4">
          <label htmlFor="initialBalance" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Saldo Awal Saat Ini
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
              Rp
            </div>
            <input
              id="initialBalance"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={balanceInput}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setBalanceInput(val);
              }}
              placeholder="0"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 text-lg font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Terbaca: <span className="font-semibold text-brand-600 dark:text-brand-400">{formatCurrency(numericBalance, currency)}</span>
          </p>
        </div>

        {/* Currency Dropdown */}
        <div className="mt-4">
          <label htmlFor="currencySelect" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Mata Uang
          </label>
          <select
            id="currencySelect"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold shadow-md transition-all text-base min-h-[50px] cursor-pointer ${
            isValid
              ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/25 active:scale-[0.98]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Lanjut ke Pilihan Tema</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};
