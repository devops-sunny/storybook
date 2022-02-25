import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';

export const fallbackOrder: Order = mockOrder()
  .addItem({
    modifiedProductVariation: {
      id: uuidv4(),
      productVariation: {
        id: uuidv4(),
        name: `product-variation-1`,
      },
    },
  })
  .validateAllItems({
    validations: [
      {
        condition: 'ComponentsAreAvailable',
        isComplete: true,
        isValid: true,
      },
      { condition: 'ModificationsAreValid', isComplete: true, isValid: true },
      {
        condition: 'ProductVariationIsProducible',
        isComplete: true,
        isValid: true,
      },
    ],
  })
  .value();
