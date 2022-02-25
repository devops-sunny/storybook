import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';

export type OrderStatusTransitionParams = {
  previousOrderState: Order | undefined;
  currentOrderState: Order | undefined;
};

export const didItemStatusChange = (
  params: OrderStatusTransitionParams,
): boolean[] => {
  const { previousOrderState: previousOrder, currentOrderState: currentOrder } =
    params;
  return (
    previousOrder?.items.map((item, index) => {
      return item?.status !== currentOrder?.items[index]?.status;
    }) || []
  );
};

export const didItemStatusChangeToReadyForDelivery = (
  params: OrderStatusTransitionParams,
): boolean[] => {
  const { previousOrderState: previousOrder, currentOrderState: currentOrder } =
    params;
  return (
    previousOrder?.items.map((item, index) => {
      return (
        item?.status !== currentOrder?.items[index]?.status &&
        currentOrder?.items[index]?.status === OrderItemStatus.DeliveryReady
      );
    }) || []
  );
};
