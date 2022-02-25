import { Order, OrderItem } from '@bb/common/types/tmpTypes/entityTypes';

import { OrderSummaryModification } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { v4 as uuidv4 } from 'uuid';

export const addItem = (params: {
  order: Order;
  modifiedProductVariation: {
    id: string;
    productVariation: {
      id: string;
      name: string;
    };
    modifications?: Array<OrderSummaryModification>;
  };
}): Order => {
  const {
    order,
    modifiedProductVariation,
    modifiedProductVariation: { productVariation },
  } = params;
  const newItem: OrderItem = {
    id: uuidv4(),
    modifiedProductVariation: {
      id: modifiedProductVariation.id,
      productVariation: {
        id: productVariation.id,
        name: productVariation.name,
      },
      modifications: modifiedProductVariation.modifications ?? [],
    },
    status: 'Configuration',
    validConditions: [],
    invalidConditions: [
      'ModificationsAreValid',
      'ComponentsAreAvailable',
      'ProductVariationIsProducible',
    ],
    completeConditions: [],
    incompleteConditions: [
      'ModificationsAreValid',
      'ComponentsAreAvailable',
      'ProductVariationIsProducible',
    ],
  };
  return {
    ...order,
    items: [...order.items, newItem],
    status: [...new Set([...order.status, newItem.status])], // unique
    validConditions: [], // since the new item is not validated, we clear this
    invalidConditions: [
      ...new Set([...order.invalidConditions, ...newItem.invalidConditions]),
    ],
    completeConditions: [], // since the new item is not validated, we clear this
    incompleteConditions: [
      ...new Set([
        ...order.incompleteConditions,
        ...newItem.incompleteConditions,
      ]),
    ],
  };
};
