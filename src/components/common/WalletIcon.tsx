import React from 'react';
import { Landmark, Smartphone, Banknote, CreditCard, PiggyBank, Wallet } from 'lucide-react';
import { WalletType } from '../../types';

interface WalletIconProps {
  iconName?: string;
  type?: WalletType;
  className?: string;
  size?: number;
}

export const WALLET_PRESETS = [
  { id: 'cash', label: 'Tunai', type: 'cash' as WalletType, icon: Banknote, defaultName: 'Cash', color: '#10B981' },
  { id: 'bca', label: 'BCA', type: 'bank' as WalletType, icon: Landmark, defaultName: 'BCA', color: '#0060AF' },
  { id: 'mandiri', label: 'Mandiri', type: 'bank' as WalletType, icon: Landmark, defaultName: 'Mandiri', color: '#003D79' },
  { id: 'bri', label: 'BRI', type: 'bank' as WalletType, icon: Landmark, defaultName: 'BRI', color: '#00529B' },
  { id: 'bni', label: 'BNI', type: 'bank' as WalletType, icon: Landmark, defaultName: 'BNI', color: '#F26522' },
  { id: 'gopay', label: 'GoPay', type: 'ewallet' as WalletType, icon: Smartphone, defaultName: 'GoPay', color: '#00AED6' },
  { id: 'ovo', label: 'OVO', type: 'ewallet' as WalletType, icon: Smartphone, defaultName: 'OVO', color: '#4C3494' },
  { id: 'dana', label: 'DANA', type: 'ewallet' as WalletType, icon: Smartphone, defaultName: 'DANA', color: '#118EEA' },
  { id: 'shopeepay', label: 'ShopeePay', type: 'ewallet' as WalletType, icon: Smartphone, defaultName: 'ShopeePay', color: '#EE4D2D' },
  { id: 'savings', label: 'Tabungan', type: 'bank' as WalletType, icon: PiggyBank, defaultName: 'Tabungan Khusus', color: '#EC4899' },
  { id: 'card', label: 'Kartu Kredit', type: 'other' as WalletType, icon: CreditCard, defaultName: 'Kartu Kredit', color: '#8B5CF6' },
];

export const WalletIconBadge: React.FC<WalletIconProps> = ({ iconName, type = 'cash', className = '', size = 20 }) => {
  if (iconName === 'Landmark' || type === 'bank') {
    return <Landmark className={className} size={size} />;
  }
  if (iconName === 'Smartphone' || type === 'ewallet') {
    return <Smartphone className={className} size={size} />;
  }
  if (iconName === 'Banknote' || type === 'cash') {
    return <Banknote className={className} size={size} />;
  }
  if (iconName === 'CreditCard') {
    return <CreditCard className={className} size={size} />;
  }
  if (iconName === 'PiggyBank') {
    return <PiggyBank className={className} size={size} />;
  }
  return <Wallet className={className} size={size} />;
};
