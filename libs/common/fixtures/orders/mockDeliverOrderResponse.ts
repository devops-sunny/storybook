import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatusKey } from '@bb/common/types/tmpTypes/enums';
import { OrderQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';

export const mockDeliverOrderResponse = (params: {
  order: Order;
}): OrderQueryResponse => {
  const { order } = params;
  return {
    data: {
      order: {
        ...order,
        status: ['DeliveryReady'],
        items: [
          ...order.items.map((item) => ({
            ...item,
            status: 'DeliveryReady' as OrderItemStatusKey,
          })),
        ],
      },
    },
  };
};
