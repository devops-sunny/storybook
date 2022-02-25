import { OrderItemStatusKey } from '@bb/common/types/tmpTypes/enums';
import { mockOrder } from '../mockOrder';
import { v4 as uuidv4 } from 'uuid';

export const generateOrderWithStatus = (status: OrderItemStatusKey) => {
  return mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-1`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-2`,
        },
      },
    })
    .updateAllItemsStatus({ status })
    .value();
};

export const generateOrderConfiguration = () => {
  return mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-1`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-2`,
        },
      },
    })
    .updateAllItemsStatus({ status: 'ProductionReady' })
    .value();
};

export const generateOrderProductionReady = () => {
  return mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-1`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-2`,
        },
      },
    })
    .updateAllItemsStatus({ status: 'ProductionReady' })
    .value();
};
