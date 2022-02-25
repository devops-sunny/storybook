import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatusKey } from '@bb/common/types/tmpTypes/enums';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

// @TEMP
export type ImmutablyUpdateOrderStatusParams = {
  itemStatus: OrderItemStatusKey;
  itemIndex: number;
  orders: Order[];
  orderIndex: number;
};
export function immutablyUpdateOrderStatus(
  params: ImmutablyUpdateOrderStatusParams,
): Order[] {
  const { itemStatus, itemIndex, orders, orderIndex } = params;
  const order: Order = {
    ...orders[orderIndex],
  } as Order;
  if (order.status) {
    const modifiedOrder: Order = mockOrder({ order })
      .updateIndexItemStatus({
        index: itemIndex,
        status: itemStatus,
      })
      .value();
    const modifiedOrders: Order[] = [
      ...orders.slice(0, orderIndex),
      modifiedOrder,
      ...orders.slice(orderIndex + 1),
    ];
    return modifiedOrders;
  }
  return orders;
}
