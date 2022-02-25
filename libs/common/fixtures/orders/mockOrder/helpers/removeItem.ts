import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemValidityConditionKey } from '@bb/common/types/tmpTypes/enums';

export const removeItem = (params: {
  order: Order;
  orderItemId: string;
}): Order => {
  const { order, orderItemId } = params;
  const orderItemIndex = order.items.findIndex(
    (item: any) => item.id === orderItemId,
  );

  const newItems = [
    ...order.items.slice(0, orderItemIndex),
    ...order.items.slice(orderItemIndex + 1),
  ];

  // new status is a derived array of unique values from all of the items' status
  const newStatus = [...new Set(newItems.map((item) => item.status))];

  // (in)valid conditions
  const newValidConditions: OrderItemValidityConditionKey[] = [
    ...new Set(newItems.flatMap((item) => item.validConditions)),
  ];

  const newInvalidConditions = [
    ...new Set(newItems.flatMap((item) => item.invalidConditions)),
  ];

  // (in)complete conditions
  const newCompleteConditions = [
    ...new Set(newItems.flatMap((item) => item.completeConditions)),
  ];
  const newIncompleteConditions = [
    ...new Set(newItems.flatMap((item) => item.incompleteConditions)),
  ];

  return {
    ...order,
    items: [
      ...order.items.slice(0, orderItemIndex),
      ...order.items.slice(orderItemIndex + 1),
    ],
    status: [...newStatus],
    validConditions: [...newValidConditions],
    invalidConditions: [...newInvalidConditions],
    completeConditions: [...newCompleteConditions],
    incompleteConditions: [...newIncompleteConditions],
  };
};
