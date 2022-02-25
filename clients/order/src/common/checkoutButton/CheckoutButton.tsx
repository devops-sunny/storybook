import { Badge, IconButton, IconButtonProps } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import ShoppingBagIcon from '@material-ui/icons/ShoppingBag';
import { useAppDataContext } from '../../providers/AppDataProvider/AppDataProvider';
import { useCheckoutButtonQuery } from '@bb/order/generated/graph';

export type CheckoutButtonProps = Omit<
  IconButtonProps<typeof RouterLink>,
  'component' | 'to'
>;

export function CheckoutButton(props: CheckoutButtonProps) {
  const { currentOrder } = useAppDataContext();

  const [{ data }] = useCheckoutButtonQuery({
    variables: { orderId: currentOrder?.id! },
    pause: currentOrder?.id ? false : true,
  });

  const itemCount = data?.order.items.length;

  return (
    <IconButton
      color="inherit"
      {...props}
      component={RouterLink}
      to="/order/b034183c-6109-437c-9bdc-a0eb108df780/summary">
      <Badge badgeContent={itemCount} color="error">
        <ShoppingBagIcon />
      </Badge>
    </IconButton>
  );
}
