import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { fallbackOrder } from './fallbackOrder';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockOrdersResponseAfterOneOrderUpdate } from '@bb/common/fixtures/orders/mockOrdersResponse';

export const updateFirstOrderReadyForDelivery = (orders: Order[]) => {
  return {
    ...mockOrdersResponseAfterOneOrderUpdate({
      orders,
      updatedOrder: {
        ...mockOrder({ order: orders[0] ? orders[0] : { ...fallbackOrder } })
          .updateAllItemsStatus({ status: 'DeliveryReady' })
          .value(),
      },
    }),
  };
};
