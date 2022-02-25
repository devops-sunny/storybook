import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatus } from '../generated/graph';
import { OrderItemStatusKey } from '@bb/common/types/tmpTypes/enums';
import { isNotNullish } from '@bb/common';

export const matchesAllOrderItemStatus = (params: {
  currentOrder: Order | undefined;
  matchStatus: OrderItemStatusKey;
}) => {
  return params.currentOrder?.status
    .filter(isNotNullish)
    .every((status: OrderItemStatusKey) => status === params.matchStatus);
};
