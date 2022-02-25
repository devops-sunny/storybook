import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrdersQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';

export const mockOrdersResponse = (orders: Order[]): OrdersQueryResponse => {
  return {
    data: {
      orders,
    },
  };
};

export const mockOrdersResponseAfterAllOrdersUpdate = (params: {
  orders: Order[];
  updatedOrders: Order[];
}): OrdersQueryResponse => {
  const { orders, updatedOrders } = params;
  return {
    data: {
      orders: [...updatedOrders],
    },
  };
};

export const mockOrdersResponseAfterOneOrderUpdate = (params: {
  orders: Order[];
  updatedOrder: Order;
}): OrdersQueryResponse => {
  const { orders, updatedOrder } = params;
  return {
    data: {
      orders: [{ ...updatedOrder }, ...orders.slice(1)],
    },
  };
};
