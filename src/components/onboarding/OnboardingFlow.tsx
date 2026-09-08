import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { BookIconType, ThemeMode, WalletType } from '../../types';
import { SlideConsent } from './SlideConsent';
import { SlideBookSetup } from './SlideBookSetup';
import { SlideWalletSetup } from './SlideWalletSetup';
import { SlideThemeSetup } from './SlideThemeSetup';
import { SlideWelcomeFinish } from './SlideWelcomeFinish';

export const OnboardingFlow: React.FC = () => {
  // Steps: 0 = Consent, 1 = Setup Buku, 2 = Setup Akun, 3 = Pilih Tema, 4 = Welcome
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>('');
  
  // Form State
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
  const [accentColor, setAccentColor] = useState<string>('#10B981');

  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const skipOnboarding = useAppStore((s) => s.skipOnboarding);

  const handleNextStep = () => {
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
      setError('');
      setCurrentStep(4);
      return;
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleFinish = () => {
    completeOnboarding(
      {
        ...bookData,
        color: accentColor || bookData.color,
      },
      walletData,
      selectedTheme
    );
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  const isFormStep = currentStep >= 1 && currentStep <= 3;

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-surface-light dark:bg-surface-dark flex flex-col justify-between shadow-2xl overflow-hidden">
      {/* Top Bar Configuration per Step */}
      {currentStep === 0 ? (
        /* Step 0 (Consent): Tidak ada top bar */
        <div className="pt-safe" />
      ) : currentStep === 4 ? (
        /* Step 4 (Welcome): Top bar hanya back < ke Tema, tidak ada Lewati */
        <div className="pt-safe px-6 pt-4 pb-2 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-8 h-8" />
        </div>
      ) : (
        /* Step 1, 2, 3: Top bar ada back < dan Lewati */
        <div className="pt-safe px-6 pt-4 pb-2 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Lewati</span>
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto">
        {currentStep === 0 && (
          <SlideConsent onStart={() => setCurrentStep(1)} />
        )}

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
            accentColor={accentColor}
            onSelectAccentColor={setAccentColor}
          />
        )}

        {currentStep === 4 && (
          <SlideWelcomeFinish
            onStart={handleFinish}
            bookName={bookData.name}
            accountName={walletData.name}
            accentColor={accentColor}
          />
        )}
      </div>

      {/* Footer Shell untuk Step 1, 2, 3: Progress Indicator (3 Dots) + Bulat Next Button */}
      {isFormStep && (
        <div className="px-6 pb-safe pb-6 pt-2 flex flex-col items-center animate-fadeIn">
          {/* Progress Dots (3 dots total: 1/3, 2/3, 3/3; dot aktif berbentuk oval/pill memanjang) */}
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1, 2, 3].map((step) => {
              const isActive = currentStep === step;
              return (
                <div
                  key={step}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-7 h-2 shadow-sm'
                      : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                  style={isActive ? { backgroundColor: accentColor } : undefined}
                />
              );
            })}
          </div>

          {/* Circular Next Button: bulat warna aksen terpilih, panah putih > */}
          <button
            type="button"
            onClick={handleNextStep}
            style={{ backgroundColor: accentColor }}
            className="w-14 h-14 rounded-full active:scale-95 text-white shadow-lg flex items-center justify-center transition-transform cursor-pointer"
            aria-label="Lanjut ke langkah berikutnya"
          >
            <ChevronRight size={26} strokeWidth={2.5} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};
