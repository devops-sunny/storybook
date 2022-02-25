import { OrderItemStatus } from '@bb/order/generated/graph';

export const orderResponse = {
  data: {
    order: {
      id: 'b034183c-6109-437c-9bdc-a0eb108df780',
      status: [OrderItemStatus.Validation],
      items: [
        {
          id: 'a437a8c1-5282-4f73-a9ea-6db1038d5014',
          status: OrderItemStatus.Validation,
        },
        //
        {
          id: 'a437a8c1-7382-4f73-a9ea-6db1038d5014',
          status: OrderItemStatus.Validation,
        },
        {
          id: 'a437a8c1-1284-4f73-a9ea-6db1038d5014',
          status: OrderItemStatus.Validation,
        },
        {
          id: 'a437a8c1-9372-4f73-a9ea-6db1038d5014',
          status: OrderItemStatus.Validation,
        },
        //
      ],
    },
  },
};
