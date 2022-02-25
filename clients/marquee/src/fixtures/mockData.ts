import { Order, OrderItemStatus } from '@bb/marquee/generated/graph';

import { Producer } from '@bb/marquee/providers/AppDataProvider';
import { User } from '@bb/common/types/tmpTypes/entityTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';

const producerP1: Producer = Object.freeze({
  id: 'p1',
});
const producerP2: Producer = Object.freeze({
  id: 'p2',
});
export const mockProducers: Producer[] = [producerP1, producerP2];

const orderTwoItemsDeliveryReadyO1: Order = Object.freeze({
  id: 'o1',
  status: [OrderItemStatus.DeliveryReady, OrderItemStatus.DeliveryReady],
  items: [],
  name: 'test order left',
  updatedAt: new Date('Wed, 23 Nov 2021 07:00:00 GMT'),
});
const orderTwoItemsDeliveryReadyO2: Order = Object.freeze({
  id: 'o2',
  status: [OrderItemStatus.DeliveryReady, OrderItemStatus.DeliveryReady],
  items: [],
  name: 'test order right',
  updatedAt: new Date('Wed, 23 Nov 2021 05:00:00 GMT'),
});
const orderTwoItemsDeliveryReadyO3: Order = Object.freeze({
  id: 'o3',
  status: [OrderItemStatus.DeliveryReady, OrderItemStatus.DeliveryReady],
  items: [],
  // no name for walk-up order
  updatedAt: new Date('Wed, 23 Nov 2021 10:00:00 GMT'),
});
const orderTwoItemsDeliveryQueuedO1: Order = Object.freeze({
  id: 'o1',
  status: [OrderItemStatus.DeliveryQueued, OrderItemStatus.DeliveryQueued],
  items: [],
  name: 'test order left',
  updatedAt: new Date('Wed, 23 Nov 2021 07:00:00 GMT'),
});
const orderTwoItemsDeliveryQueuedO2: Order = Object.freeze({
  id: 'o2',
  status: [OrderItemStatus.DeliveryQueued, OrderItemStatus.DeliveryQueued],
  items: [],
  name: 'test order right',
  updatedAt: new Date('Wed, 23 Nov 2021 05:00:00 GMT'),
});

const generateOrderWithTwoItemsDeliveryReady = () => {
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
    .updateAllItemsStatus({ status: 'DeliveryReady' })
    .value();
};

const generateOrderWithTwoItemsDeliveryQueued = () => {
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
    .updateAllItemsStatus({ status: 'DeliveryQueued' })
    .value();
};

export const mockOrders = {
  deliveryReady: {
    none: [],
    one: [
      { ...generateOrderWithTwoItemsDeliveryReady(), name: 'Test Order Right' },
    ],
    two: [
      { ...generateOrderWithTwoItemsDeliveryReady(), name: 'Test Order Left' },
      { ...generateOrderWithTwoItemsDeliveryReady(), name: 'Test Order Left' },
    ],
    three: [
      generateOrderWithTwoItemsDeliveryReady(),
      generateOrderWithTwoItemsDeliveryReady(),
      generateOrderWithTwoItemsDeliveryReady(),
    ],
  },
  deliveryQueued: {
    one: {
      left: [generateOrderWithTwoItemsDeliveryQueued()],
      right: [generateOrderWithTwoItemsDeliveryQueued()],
    },
    two: [
      { ...generateOrderWithTwoItemsDeliveryQueued(), name: 'Test Order Left' },
      {
        ...generateOrderWithTwoItemsDeliveryQueued(),
        name: 'Test Order Right',
      },
    ],
  },
};

const userIdentifiedU1: User = Object.freeze({
  presentAt: new Date(),
  identified: true,
  id: 'u1',
  orderId: mockOrders.deliveryQueued.two[0]?.id,
  producerId: 'p1',
});
const userIdentifiedU2: User = Object.freeze({
  presentAt: new Date(),
  identified: true,
  id: 'u2',
  orderId: mockOrders.deliveryQueued.two[1]?.id,
  producerId: 'p2',
});
export const mockUsers = {
  identified: {
    none: [],
    one: {
      left: [userIdentifiedU1],
      right: [userIdentifiedU2],
    },
    two: [userIdentifiedU1, userIdentifiedU2],
  },
};
