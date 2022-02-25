import { Order, OrderItem } from '@bb/common/types/tmpTypes/entityTypes';
import {
  OrderItemStatus,
  OrderItemStatusKey,
} from '@bb/common/types/tmpTypes/enums';

export const updateIndexItemStatus = (params: {
  order: Order;
  itemIndex: number;
  status: keyof typeof OrderItemStatus;
}): Order => {
  const { order, itemIndex, status } = params;

  const updatedItem: OrderItem | undefined = order.items[itemIndex]
    ? <OrderItem>{
        ...order.items[itemIndex],
        status: status,
      }
    : undefined;

  const updatedItems: OrderItem[] = updatedItem
    ? [
        ...order.items.slice(0, itemIndex),
        updatedItem,
        ...order.items.slice(itemIndex + 1),
      ]
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
