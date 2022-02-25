import { Order } from '../../types/tmpTypes/entityTypes';
import { OrderItemStatusKey } from '../../types/tmpTypes/enums';
import { OrderQueryResponse } from '../../types/tmpTypes/responseTypes';

// ProduceOrder returns all Order Items status in ProductionReady
// currently naively assumes all items are valid, and does not mock error response
export const mockProduceOrderResponse = (params: {
  order: Order;
}): OrderQueryResponse => {
  const { order } = params;
  const newItems = order.items.map((item) => ({
    ...item,
    status: 'ProductionReady' as OrderItemStatusKey,
  }));
  return {
    data: {
      order: {
        ...order,
        status: ['ProductionReady'],
        items: [...newItems],
      },
    },
  };
};
