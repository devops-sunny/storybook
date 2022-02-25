import { ProductKey } from './productKeys';

// @TODO, these need to be at the product-variation level.
// maybe just put it into ProductSIzes instead?
export const mockCalories: Record<ProductKey, number> = {
  ALMOND_MILK_LATTE: 100,
  AMERICANO: 200,
  CAFE_AU_LAIT: 300,
  CAPPUCCINO: 400,
  CARAMEL_LATTE: 500,
  CARAMEL_MACCHIATO: 100,
  COFFEE: 200,
  ESPRESSO: 300,
  HOT_CHOCOLATE: 400,
  ICED_ALMOND_MILK_LATTE: 500,
  ICED_CARAMEL_LATTE: 100,
  ICED_CARAMEL_MACCHIATO: 200,
  ICED_COFFEE: 300,
  ICED_LATTE: 400,
  ICED_VANILLA_LATTE: 500,
  LATTE: 100,
  MOCHA: 200,
  MOCHA_MACCHIATO: 300,
  SKINNY_HOT_CHOCOLATE: 400,
  STEAMED_MILK: 100,
  VANILLA_LATTE: 200,
  VANILLA_STEAMER: 300,
};
