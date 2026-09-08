import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { BookIconType, ThemeMode, WalletType } from '../../types';
import { SlideWelcome } from './SlideWelcome';
import { SlideBookSetup } from './SlideBookSetup';
import { SlideWalletSetup } from './SlideWalletSetup';
import { SlideThemeSetup } from './SlideThemeSetup';

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>('');
  
  // Stored onboarding values
  const [bookData, setBookData] = useState<{ name: string; icon: BookIconType; color: string }>({
    name: 'Buku Pribadi',
    icon: 'book',
    color: '#10B981',
  });

  const [walletData, setWalletData] = useState<{
    name: string;
    type: WalletType;
    initialBalance: number;
    currency: string;
    icon: string;
    color: string;
  }>({
    name: 'BCA',
    type: 'bank',
    initialBalance: 0,
    currency: 'IDR',
    icon: 'Landmark',
    color: '#0060AF',
  });

  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>('system');

  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const skipOnboarding = useAppStore((s) => s.skipOnboarding);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setError('');
      return;
    }

    if (currentStep === 1) {
      if (!bookData.name.trim()) {
        setError('Nama buku tidak boleh kosong');
        return;
      }
      setError('');
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!walletData.name.trim()) {
        setError('Nama akun tidak boleh kosong');
        return;
      }
      setError('');
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      completeOnboarding(bookData, walletData, selectedTheme);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setError('');
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-surface-light dark:bg-surface-dark flex flex-col justify-between shadow-2xl overflow-hidden">
      {/* Universal Top Bar: Back (kiri) & Skip (kanan) */}
      <div className="pt-safe px-6 pt-4 pb-2 flex items-center justify-between z-10">
        <div>
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Kembali"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>

        {/* Skip button ("Lewati >") */}
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span>Lewati</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto">
        {currentStep === 0 && <SlideWelcome />}

        {currentStep === 1 && (
          <SlideBookSetup
            data={bookData}
            onChange={(newData) => {
              setBookData(newData);
              if (newData.name.trim()) setError('');
            }}
            error={error}
          />
        )}

        {currentStep === 2 && (
          <SlideWalletSetup
            data={walletData}
            onChange={(newData) => {
              setWalletData(newData);
              if (newData.name.trim()) setError('');
            }}
            error={error}
          />
        )}

        {currentStep === 3 && (
          <SlideThemeSetup
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
          />
        )}
      </div>

      {/* Universal Bottom Footer: Progress Dots + Bulat Next Button */}
      <div className="px-6 pb-safe pb-6 pt-2 flex flex-col items-center">
        {/* Progress Indicator: 4 dots */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`transition-all duration-300 rounded-full ${
                currentStep === step
                  ? 'w-6 h-2 bg-brand-600 dark:bg-brand-400'
                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Circular Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white shadow-lg shadow-brand-600/30 flex items-center justify-center transition-all cursor-pointer"
          aria-label={currentStep === 3 ? 'Selesai' : 'Lanjut'}
        >
          {currentStep === 3 ? (
            <Check size={26} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={26} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
};
