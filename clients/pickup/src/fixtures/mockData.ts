import { OrderItemStatus } from '@bb/pickup/generated/graph';
import { User } from '@bb/common/types/tmpTypes/entityTypes';

export const orderTwoItemsDeliveryReady = Object.freeze({
  id: 'o1',
  status: [OrderItemStatus.DeliveryReady, OrderItemStatus.DeliveryReady],
});

export const orderTwoItemsDeliveryQueued = Object.freeze({
  id: 'o1',
  status: [OrderItemStatus.DeliveryQueued, OrderItemStatus.DeliveryQueued],
});

export const orderTwoItemsProductionReady = Object.freeze({
  id: 'o1',
  status: [OrderItemStatus.ProductionReady, OrderItemStatus.ProductionReady],
});

export const userIdentified = Object.freeze({
  name: 'u1',
  identified: true,
  orderId: 'o1',
});
