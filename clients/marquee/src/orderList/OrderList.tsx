import { Box, List, Typography } from '@material-ui/core';
import {
  OrderItemStatus,
  useOrderListQuery,
  useOrderListUpdateSubscription,
} from '@bb/marquee/generated/graph';
import { isNotNullish, useAppConfig } from '@bb/common';

import { OrderListItem } from './OrderListItem';
import { useMemo } from 'react';

const visibleOrderItemStatuses: Array<OrderItemStatus> = [
  OrderItemStatus.ProductionReady,
  OrderItemStatus.ProductionQueued,
  OrderItemStatus.ProductionInProgress,
  OrderItemStatus.ProductionCompleted,
  OrderItemStatus.DeliveryReady,
  OrderItemStatus.DeliveryQueued,
  OrderItemStatus.DeliveryInProgress,
  OrderItemStatus.DeliveryPresented,
];

export function OrderList() {
  const { storefrontId } = useAppConfig();

  const [{ data }] = useOrderListQuery({
    variables: { storefrontId },
  });

  useOrderListUpdateSubscription({ variables: { storefrontId } });

  const orders = useMemo(
    () =>
      data?.orders
        .filter(isNotNullish)
        .filter(({ status }) =>
          status.some((value) => visibleOrderItemStatuses.includes(value)),
        ),
    [data?.orders],
  );

  if (!orders) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Typography variant="h4" component="div">
          No orders in the queue!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {orders.map((order) => (
        <OrderListItem order={order} key={order.id} />
      ))}
    </List>
  );
}
