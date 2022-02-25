import { OrderSummaryItem } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { modificationsView } from './modificationsView';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';

const AMERICANO_12OZ = productVariationViews.find(
  (view) => view.name === 'americano|12-oz',
);
const CAPPUCCINO_12OZ_WHOLE_MILK = productVariationViews.find(
  (view) => view.name === 'cappuccino|12-oz|whole-milk',
);

const NO_MODIFICATIONS: OrderSummaryItem = {
  id: 'ca18a5cb-cf0b-4571-8ac6-d86dd363ef4e',
  productImageUrl: AMERICANO_12OZ!.image.sourceUrl,
  productDisplayName: AMERICANO_12OZ!.productDisplayName,
  sizeDisplayName: AMERICANO_12OZ!.sizeDisplayName,
  productVariationPrice: AMERICANO_12OZ!.price,
  modifications: [],
};

const ONE_MODIFICATION: OrderSummaryItem = {
  id: 'da6a156d-c52d-4b03-a110-af18f62e32b8',
  productImageUrl: CAPPUCCINO_12OZ_WHOLE_MILK!.image.sourceUrl,
  productDisplayName: CAPPUCCINO_12OZ_WHOLE_MILK!.productDisplayName,
  sizeDisplayName: CAPPUCCINO_12OZ_WHOLE_MILK!.sizeDisplayName,
  productVariationPrice: CAPPUCCINO_12OZ_WHOLE_MILK!.price,
  modifications: modificationsView.ONE_MODIFICATION,
};

const TWO_MODIFICATIONS: OrderSummaryItem = {
  ...NO_MODIFICATIONS,
  id: '7c1840d7-6cdc-44b8-9fbc-463826573204',
  modifications: modificationsView.TWO_MODIFICATIONS,
};

const THREE_MODIFICATIONS: OrderSummaryItem = {
  ...ONE_MODIFICATION,
  id: '7a4ed158-600a-4e75-a49b-68ce68d0aa3f',
  modifications: modificationsView.THREE_MODIFICATIONS,
};

export const orderSummaryItem: Record<string, OrderSummaryItem> = {
  NO_MODIFICATIONS,
  ONE_MODIFICATION,
  TWO_MODIFICATIONS,
  THREE_MODIFICATIONS,
};
