import { Price } from './tmpTypes/menuEntityTypes';

export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function formatPrice(price: Price, signed?: boolean): string {
  const localizedPrice = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: price.iso4217Currency.code,
  }).format(price.value / 10 ** price.iso4217Currency.digits);
  /* ** is exponentiation, we want to apply the decimals for display based on an integer currency value (to avoid floating point rounding errors in value math) */
  if (!signed) return localizedPrice;
  return price.value >= 0 ? `+${localizedPrice}` : `-${localizedPrice}`;
}
