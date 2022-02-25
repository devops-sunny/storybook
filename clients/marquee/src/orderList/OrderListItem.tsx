import {
  Box,
  Button,
  ButtonProps,
  Chip,
  ListItem,
  Typography,
} from '@material-ui/core';
import {
  OrderItemStatus,
  OrderListOrderFieldsFragment,
  useDeliverOrderMutation,
} from '@bb/marquee/generated/graph';
import { isNotNullish, useAppConfig } from '@bb/common';

import { useAppContext } from '../AppProvider';
import { useEffect } from 'react';

export type OrderListItemProps = {
  order: OrderListOrderFieldsFragment;
};

export function OrderListItem(props: OrderListItemProps) {
  const [{ fetching, data }, deliverOrder] = useDeliverOrderMutation();

  const { setFocusedOrderId } = useAppContext();

  const { producerId } = useAppConfig();

  useEffect(() => {
    const order = data?.deliverOrder.order;

    if (order) {
      setFocusedOrderId(order.id);
    }
  }, [data?.deliverOrder.order, setFocusedOrderId]);

  return (
    <OrderListItemPresentation
      {...props}
      onClickDeliverOrderButton={(orderId) => {
        if (!data && !fetching) {
          deliverOrder({ orderId, producerId });
        }
      }}
      DeliverOrderButtonProps={{
        disabled: fetching,
      }}
    />
  );
}

export type OrderListItemPresentationProps = OrderListItemProps & {
  onClickDeliverOrderButton?: (orderId: string) => void;
  DeliverOrderButtonProps?: ButtonProps;
};

export function OrderListItemPresentation(
  props: OrderListItemPresentationProps,
) {
  const { order, onClickDeliverOrderButton, DeliverOrderButtonProps } = props;

  const { id, status, items } = order;

  const orderIsDeliverable =
    status.length === 1 && status[0] === OrderItemStatus.ProductionCompleted;

  return (
    <ListItem key={id}>
      <Box flex={1}>
        <Typography>order ({id})</Typography>
        <ul>
          {items.filter(isNotNullish).map((item) => (
            <Typography
              key={item.id}
              component="li"
              variant="body2"
              color="textSecondary">
              {item.modifiedProductVariation?.productVariation?.product?.name} (
              {item.id})
            </Typography>
          ))}
        </ul>
      </Box>
      {orderIsDeliverable ? (
        <Button
          {...DeliverOrderButtonProps}
          color="primary"
          onClick={() => onClickDeliverOrderButton?.(id)}>
          Deliver Order
        </Button>
      ) : (
        status.map((value) => <Chip key={value} label={value} sx={{ ml: 1 }} />)
      )}
    </ListItem>
  );
}
