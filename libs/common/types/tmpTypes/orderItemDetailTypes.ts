import { Image, Price } from './menuEntityTypes';

export type ProductVariationView = {
  id: string;
  name: string;
  image: Image;
  displayName: string;
  description: string;
  price: Price;
  calories: number;
  productDisplayName: string;
  sizeDisplayName: string;
};

export type OrderSummaryItem = {
  id: string;
  productImageUrl: string;
  productDisplayName: string;
  sizeDisplayName: string;
  productVariationPrice: Price;
  modifications: OrderSummaryModification[];
};

export type OrderSummaryModification = {
  id: string;
  displayName: string;
  price: Price;
};
