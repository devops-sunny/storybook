import { Box, Button, Typography } from '@material-ui/core';
import { Order, OrderItem } from '@bb/common/types/tmpTypes/entityTypes';
import {
  getOrderSummaryItem,
  itemSubtotal,
} from '@bb/common/fixtures/orders/mockOrder/helpers/getOrderSummaryItem';

import { CurrencyCodeRecord } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { OrderSummaryItem } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { OrderSummaryListItem } from '@bb/order/order/orderSummary/OrderSummaryListItem';
import { currency } from '@bb/order/fixtures/menu/currency';
import { formatPrice } from '@bb/common';

export type OrderSummaryListProps = {
  order: Order | undefined;
  onClickEditItem: (itemId: string) => void;
  onClickCancelOrder: (orderId: string) => void;
  onClickConfirmAndPay: (orderId: string) => void;
  currencyType?: CurrencyCodeRecord;
};

export function OrderSummaryList(props: OrderSummaryListProps) {
  const {
    order,
    onClickEditItem: onItemClick,
    onClickCancelOrder,
    onClickConfirmAndPay,
    currencyType = currency.usd,
  } = props;

  const orderSummaryItems =
    order?.items?.map((item: OrderItem) =>
      getOrderSummaryItem({ orderItem: item }),
    ) || [];

  const buttonsDisabled = !order || order?.items.length === 0;

  const orderSubtotal = (orderSummaryItems: OrderSummaryItem[]) => {
    let sub = 0;
    orderSummaryItems.forEach(
      (orderSummaryItem) =>
        (sub += itemSubtotal(
          orderSummaryItem.productVariationPrice,
          orderSummaryItem.modifications,
        ).value),
    );
    return sub;
  };

  const handleClickCancelOrder = () => {
    if (order) onClickCancelOrder(order.id);
  };

  const handleClickConfirmAndPay = () => {
    if (order) onClickConfirmAndPay(order.id);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      textAlign="center"
      justifyContent="center"
      flex="1 1 auto"
      padding={5}
      bgcolor="AppWorkspace"
      borderRadius={5}
      overflow="hidden">
      <Box
        display="flex"
        flexDirection="column"
        alignSelf="stretch"
        flex="1 1 auto"
        overflow="auto">
        {!order && (
          <Box
            display="flex"
            flex="1 1 auto"
            justifyContent="center"
            alignItems="center">
            <Typography variant="caption">Loading...</Typography>
          </Box>
        )}
        {order?.items.length === 0 && (
          <Box
            display="flex"
            flex="1 1 auto"
            justifyContent="center"
            alignItems="center">
            <Typography variant="caption">No items yet...</Typography>
          </Box>
        )}
        {orderSummaryItems.length > 0 &&
          orderSummaryItems.map((item: OrderSummaryItem) => (
            <Box key={item.id}>
              <OrderSummaryListItem
                orderSummaryItem={item}
                onClickEdit={() => {
                  onItemClick(item.id);
                }}
              />
            </Box>
          ))}
        <Box
          id={'order-total'}
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          textAlign="center"
          justifyContent="flex-end"
          padding={5}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom>
            Order Total{' '}
            {formatPrice({
              value: orderSubtotal(orderSummaryItems),
              iso4217Currency: currencyType,
            })}
          </Typography>
        </Box>
        <Box>
          <Button
            id={`cancelOrderButton`}
            disabled={buttonsDisabled}
            variant="outlined"
            sx={{ marginLeft: 0 }}
            color={'primary'}
            onClick={handleClickCancelOrder}>
            Cancel Order
          </Button>
          <Button
            id={`confirmOrderButton`}
            disabled={buttonsDisabled}
            variant="contained"
            sx={{ marginLeft: 4 }}
            onClick={handleClickConfirmAndPay}>
            Confirm and Pay
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
