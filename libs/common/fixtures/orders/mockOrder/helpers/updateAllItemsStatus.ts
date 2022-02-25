import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';

export const updateAllItemsStatus = (params: {
  order: Order;
  status: keyof typeof OrderItemStatus;
}): Order => {
  const { order, status } = params;
  const updatedItems = order.items.map((item) => ({
    ...item,
    status,
  }));
  return {
    ...order,
    status: [status],
    items: [...updatedItems],
  };
};
