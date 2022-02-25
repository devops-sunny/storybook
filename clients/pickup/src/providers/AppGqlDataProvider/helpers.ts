import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';

import { OrderItemStatusKey } from '@bb/common/types/tmpTypes/enums';
import { currency } from '@bb/order/fixtures/menu/currency';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

export const generateOrderWithIdandStatus = (
  id: string,
  status: OrderItemStatusKey,
): Order => {
  return {
    ...mockOrder()
      .addItem({
        modifiedProductVariation: {
          id: uuidv4(),
          productVariation: { id: uuidv4(), name: 'product-variation-1' },
        },
      })
      .addItem({
        modifiedProductVariation: {
          id: uuidv4(),
          productVariation: { id: uuidv4(), name: 'product-variation-2' },
        },
      })
      .validateAllItems({ validations: [...validValidations] })
      .updateAllItemsStatus({ status })
      .value(),
    id,
  };
};

export const generateDirectDeliverOrderWithIdandStatusItemCount = (
  id: string,
  status: OrderItemStatusKey,
  count: number,
  producerId: string,
): Order => {
  let order = mockOrder();
  for (let i = 0; i < count; i++) {
    order.addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: { id: uuidv4(), name: `product-variation-${i + 1}` },
        modifications: [
          {
            id: 'foo',
            displayName: 'foo',
            price: { value: 100, iso4217Currency: currency.usd },
          },
          {
            id: 'bar',
            displayName: 'bar',
            price: { value: 50, iso4217Currency: currency.usd },
          },
          {
            id: 'fizzbuzz',
            displayName: 'fizzbuzz',
            price: { value: 250, iso4217Currency: currency.usd },
          },
        ],
      },
    });
  }
  return {
    ...order
      .validateAllItems({ validations: [...validValidations] })
      .updateAllItemsStatus({ status })
      .value(),
    id,
    directDelivery: {
      preferredProducerId: producerId,
    },
  };
};

export const generateAnonymousUser = (): User => {
  return {
    ...mockUser().value(),
  };
};

export const generateWalkupUserWithOrder = (id: string): User => {
  return {
    ...mockUser().createWalkupUser().value(),
    orderId: id,
  };
};

export const generateAppUserWithOrder = (id: string): User => {
  return {
    ...mockUser().createAppUser().value(),
    orderId: id,
  };
};
