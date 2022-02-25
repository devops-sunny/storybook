import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  OrderItemStatus,
  useFocusedOrderQuery,
  useFocusedOrderUpdatesSubscription,
} from '@bb/marquee/generated/graph';

import { isNotNullish } from '@bb/common';
import { useAppContext } from '../AppProvider';
import { useEffect } from 'react';

export function FocusedOrderDialog() {
  const { focusedOrderId, setFocusedOrderId } = useAppContext();

  const [{ data }] = useFocusedOrderQuery({
    variables: { orderId: focusedOrderId! },
    pause: !focusedOrderId,
  });

  useFocusedOrderUpdatesSubscription({
    variables: { orderId: focusedOrderId! },
    pause: !focusedOrderId,
  });

  const order = data?.order;

  useEffect(() => {
    if (
      order?.status.length === 1 &&
      order?.status[0] === OrderItemStatus.DeliveryCompleted
    ) {
      setFocusedOrderId(undefined);
    }
  }, [order?.status, setFocusedOrderId]);

  if (!order) {
    return null;
  }

  return (
    <Dialog open={Boolean(focusedOrderId)}>
      <DialogTitle>Current Order</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem divider disableGutters>
            <ListItemText primary="order" secondary={order.id} />
            {order.status.map((value) => (
              <Chip key={value} label={value} sx={{ ml: 1 }} />
            ))}
          </ListItem>
          {order.items.length === 0 ? (
            <ListItem disableGutters>
              <ListItemText
                secondary="This order has no items"
                secondaryTypographyProps={{ component: 'em' }}
              />
            </ListItem>
          ) : (
            order.items
              .filter(isNotNullish)
              .map(({ id, status, modifiedProductVariation }) => (
                <ListItem key={id} disableGutters>
                  <ListItemText
                    primary={
                      modifiedProductVariation.productVariation.product.name
                    }
                    secondary={id}
                  />
                  <Chip label={status} />
                </ListItem>
              ))
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
}
