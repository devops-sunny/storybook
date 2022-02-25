import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { fallbackOrder } from './fallbackOrder';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockOrdersResponse } from '@bb/common/fixtures/orders/mockOrdersResponse';

export const updateAllOrdersDeliveryCompleted = (orders: Order[]) => {
  const updatedOrders: Order[] = orders.length
    ? orders
    : [{ ...fallbackOrder }];
  return {
    ...mockOrdersResponse([
      ...updatedOrders.map((order: Order) => {
        return mockOrder({ order })
          .updateAllItemsStatus({ status: 'DeliverySucceeded' })
          .value();
      }),
    ]),
  };
};
