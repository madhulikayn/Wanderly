export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(2);
};

export const formatDateRange = (startDateStr: string, endDateStr: string): string => {
  if (!startDateStr || !endDateStr) return '';
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startFormatted = start.toLocaleDateString('en-US', options);
  const endFormatted = end.toLocaleDateString('en-US', { ...options, year: 'numeric' });
  
  return `${startFormatted} – ${endFormatted}`;
};
