import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { BookIconType, ThemeMode, WalletType } from '../../types';
import { SlideWelcome } from './SlideWelcome';
import { SlideBookSetup } from './SlideBookSetup';
import { SlideWalletSetup } from './SlideWalletSetup';
import { SlideThemeSetup } from './SlideThemeSetup';

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  
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

  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const skipOnboarding = useAppStore((s) => s.skipOnboarding);

  const handleFinish = (theme: ThemeMode) => {
    completeOnboarding(bookData, walletData, theme);
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-surface-light dark:bg-surface-dark flex flex-col justify-between shadow-2xl overflow-hidden">
      {/* Top Bar with Step Dots & Skip button */}
      <div className="pt-safe px-6 pt-4 flex items-center justify-between z-10">
        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep === step
                  ? 'w-6 bg-brand-600 dark:bg-brand-400'
                  : currentStep > step
                  ? 'w-2 bg-brand-300 dark:bg-brand-800'
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Skip button ("Lewati, atur nanti") - Available on all slides */}
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Lewati, atur nanti
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center pb-safe">
        {currentStep === 0 && (
          <SlideWelcome onNext={() => setCurrentStep(1)} />
        )}

        {currentStep === 1 && (
          <SlideBookSetup
            initialName={bookData.name}
            initialIcon={bookData.icon}
            initialColor={bookData.color}
            onNext={(data) => {
              setBookData(data);
              setCurrentStep(2);
            }}
            onBack={() => setCurrentStep(0)}
          />
        )}

        {currentStep === 2 && (
          <SlideWalletSetup
            initialName={walletData.name}
            initialType={walletData.type}
            initialBalance={walletData.initialBalance}
            initialCurrency={walletData.currency}
            onNext={(data) => {
              setWalletData(data);
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <SlideThemeSetup
            onFinish={handleFinish}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
};
