import {
  OrderSummaryItem,
  OrderSummaryModification,
} from '@bb/common/types/tmpTypes/orderItemDetailTypes';

import { OrderItem } from '@bb/common/types/tmpTypes/entityTypes';
import { Price } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { currency } from '@bb/order/fixtures/menu/currency';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';

export const itemSubtotal = (
  productVariationPrice: Price,
  modifications: OrderSummaryModification[],
) => {
  let sub = productVariationPrice.value;
  modifications.forEach((mod) => (sub += mod.price.value));
  return {
    value: sub,
    iso4217Currency: productVariationPrice.iso4217Currency,
  };
};

export const getOrderSummaryItem = (params: {
  orderItem: OrderItem;
}): OrderSummaryItem => {
  const { orderItem } = params;

  const productVariationView = productVariationViews.find(
    (view) =>
      view.name === orderItem.modifiedProductVariation.productVariation.name,
  );
  // @TODO - this is @DEBT. It must be removed when no longer using mocked data
  if (!productVariationView)
    throw new Error(
      'an order item has an unknown product variation name and cannot be decorated with mocked data',
    );

  const modificationsView = orderItem.modifiedProductVariation.modifications;

  const productVariationPrice: Price = {
    value: productVariationView.price.value,
    iso4217Currency: currency.usd,
  };

  const orderSummaryItem: OrderSummaryItem = {
    id: orderItem.id,
    productImageUrl: productVariationView.image.sourceUrl,
    productDisplayName: productVariationView.productDisplayName,
    sizeDisplayName: productVariationView.sizeDisplayName,
    productVariationPrice: productVariationPrice,
    modifications: modificationsView,
  };
  return orderSummaryItem;
};
