import { Order } from '../../types/tmpTypes/entityTypes';
import { RemoveItemFromOrderMutationResponse } from '../../types/tmpTypes/responseTypes';
import { mockOrder } from './mockOrder/mockOrder';

export const mockRemoveItemOrderResponse = (params: {
  order: Order;
  orderItemId: string;
}): RemoveItemFromOrderMutationResponse => {
  const { order, orderItemId } = params;

  return {
    data: {
      orderItemId,
      order: {
        ...mockOrder({ order }).removeItem({ orderItemId }).value(),
      },
    },
  };
};
