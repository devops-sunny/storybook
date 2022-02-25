import { Order, OrderItem } from '../../types/tmpTypes/entityTypes';

import { AddItemToOrderMutationResponse } from '../../types/tmpTypes/responseTypes';
import { mockOrder } from './mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';

export const mockAddItemToOrderResponse = (params: {
  order: Order;
  modifiedProductVariationId: string;
}): AddItemToOrderMutationResponse => {
  const { modifiedProductVariationId, order } = params;
  const newOrder: Order = mockOrder({ order })
    .addItem({
      modifiedProductVariation: {
        id: modifiedProductVariationId,
        productVariation: {
          id: uuidv4(),
          name: `product-variation-1`,
        },
      },
    })
    .value();
  return {
    data: {
      order: newOrder,
      item: newOrder.items[newOrder.items.length - 1] as OrderItem,
    },
  };
};
