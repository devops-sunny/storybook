import {
  mockOrdersResponseAfterAllOrdersUpdate,
  mockOrdersResponseAfterOneOrderUpdate,
} from '@bb/common/fixtures/orders/mockOrdersResponse';

import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';

describe('Given an array with no orders', () => {
  const order1: Order = mockOrder()
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
    .value();
  const order2: Order = mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-3`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-4`,
        },
      },
    })
    .value();
  const orders: Order[] = [];
  const updatedOrder1: Order = mockOrder({ order: order1 })
    .updateAllItemsStatus({ status: 'ProductionInProgress' })
    .value();
  const updatedOrder2: Order = mockOrder({ order: order2 })
    .updateAllItemsStatus({ status: 'ProductionReady' })
    .value();
  const updatedOrders: Order[] = [{ ...updatedOrder1 }, { ...updatedOrder2 }];

  describe('when mockOrdersResponseAfterAllOrdersUpdate is called with two orders', () => {
    it('returns an Orders response with the provided orders', () => {
      const res = mockOrdersResponseAfterAllOrdersUpdate({
        orders,
        updatedOrders,
      });
      expect(res).toEqual({
        data: {
          orders: [...updatedOrders],
        },
      });
    });
  });
  describe('when mockOrdersResponseAfterOneOrderUpdate is called with an order', () => {
    it('returns an Orders response with the provided order', () => {
      const res = mockOrdersResponseAfterOneOrderUpdate({
        orders,
        updatedOrder: updatedOrder1,
      });
      expect(res).toEqual({
        data: {
          orders: [{ ...updatedOrder1 }],
        },
      });
    });
  });
});

describe('Given an array with two orders', () => {
  const order1: Order = mockOrder()
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
    .value();
  const order2: Order = mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-3`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-4`,
        },
      },
    })
    .value();
  const orders: Order[] = [{ ...order1 }, { ...order2 }];
  const updatedOrder1: Order = mockOrder({ order: order1 })
    .updateAllItemsStatus({ status: 'ProductionInProgress' })
    .value();
  const updatedOrder2: Order = mockOrder({ order: order2 })
    .updateAllItemsStatus({ status: 'ProductionReady' })
    .value();
  const updatedOrders: Order[] = [{ ...updatedOrder1 }, { ...updatedOrder2 }];

  describe('when mockOrdersResponseAfterAllOrdersUpdate is called with two orders', () => {
    it('returns an Orders response with ONLY the provided orders', () => {
      const res = mockOrdersResponseAfterAllOrdersUpdate({
        orders,
        updatedOrders,
      });
      expect(res).toEqual({
        data: {
          orders: [{ ...updatedOrders[0] }, { ...updatedOrders[1] }],
        },
      });
    });
  });
  describe('when mockOrdersResponseAfterOneOrderUpdate is called with an order', () => {
    it('returns an Orders response with the provided order as order[0]', () => {
      const res = mockOrdersResponseAfterOneOrderUpdate({
        orders,
        updatedOrder: updatedOrder1,
      });
      expect(res).toEqual({
        data: {
          orders: [{ ...updatedOrder1 }, { ...order2 }],
        },
      });
    });
  });
});
