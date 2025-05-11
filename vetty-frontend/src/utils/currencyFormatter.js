export function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    return '';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
