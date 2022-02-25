import { Order, OrderItem } from '@bb/common/types/tmpTypes/entityTypes';
import {
  OrderItemStatus,
  OrderItemStatusKey,
} from '@bb/common/types/tmpTypes/enums';

export const updateFirstItemStatus = (params: {
  order: Order;
  status: keyof typeof OrderItemStatus;
}): Order => {
  const { order, status } = params;

  const updatedFirstItem: OrderItem | undefined = order.items.length
    ? <OrderItem>{
        ...order.items[0],
        status: status,
      }
    : undefined;

  const updatedItems: OrderItem[] = updatedFirstItem
    ? [updatedFirstItem, ...order.items.slice(1)]
    : [];

  // updated order status is a derived array of unique values from all of the items' status
  const updatedStatus: OrderItemStatusKey[] = [
    ...new Set(updatedItems.map((item) => item.status)),
  ];

  return {
    ...order,
    status: [...updatedStatus],
    items: [...updatedItems],
  };
};
