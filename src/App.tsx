import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { AppLayout } from './components/layout/AppLayout';
import { BookTab } from './pages/BookTab';
import { WalletTab } from './pages/WalletTab';
import { AnalysisTab } from './pages/AnalysisTab';
import { MoreTab } from './pages/MoreTab';
import { TabType } from './types';

export const App: React.FC = () => {
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const [activeTab, setActiveTab] = useState<TabType>('book');

  if (!onboardingCompleted) {
    return <OnboardingFlow />;
  }

  return (
    <AppLayout activeTab={activeTab} onChangeTab={setActiveTab}>
      {activeTab === 'book' && <BookTab />}
      {activeTab === 'wallet' && <WalletTab />}
      {activeTab === 'analysis' && <AnalysisTab />}
      {activeTab === 'more' && <MoreTab />}
    </AppLayout>
  );
};

export default App;
