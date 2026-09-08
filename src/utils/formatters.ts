/**
 * Utility formater mata uang Rupiah dan angka
 */
export function formatCurrency(amount: number, currency: string = 'IDR'): string {
  if (currency === 'IDR') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format angka ringkas tanpa simbol mata uang
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Format waktu singkat (HH:MM)
 */
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Buat ID acak sederhana
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
