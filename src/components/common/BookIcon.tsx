import React from 'react';
import { Book, User, Briefcase, Heart, Home, Star, Coffee, ShoppingBag, LucideIcon } from 'lucide-react';
import { BookIconType } from '../../types';

interface BookIconProps {
  icon: BookIconType;
  className?: string;
  size?: number;
}

export const BOOK_ICONS: { type: BookIconType; label: string; icon: LucideIcon }[] = [
  { type: 'book', label: 'Buku', icon: Book },
  { type: 'user', label: 'Pribadi', icon: User },
  { type: 'briefcase', label: 'Usaha / Kerja', icon: Briefcase },
  { type: 'heart', label: 'Keluarga / Pasangan', icon: Heart },
  { type: 'home', label: 'Rumah', icon: Home },
  { type: 'star', label: 'Impian', icon: Star },
  { type: 'coffee', label: 'Hobi / Santai', icon: Coffee },
  { type: 'shopping-bag', label: 'Belanja', icon: ShoppingBag },
];

export const BOOK_COLORS = [
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#06B6D4', // Cyan
  '#64748B', // Slate
];

export const BookIconBadge: React.FC<BookIconProps> = ({ icon, className = '', size = 20 }) => {
  const item = BOOK_ICONS.find((i) => i.type === icon) || BOOK_ICONS[0];
  const IconComponent = item.icon;
  return <IconComponent className={className} size={size} />;
};
