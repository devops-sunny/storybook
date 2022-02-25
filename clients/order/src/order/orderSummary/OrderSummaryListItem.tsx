import { Avatar, Box, Button, Typography, useTheme } from '@material-ui/core';
import {
  OrderSummaryItem,
  OrderSummaryModification,
} from '@bb/common/types/tmpTypes/orderItemDetailTypes';

import { formatPrice } from '@bb/common';
import { itemSubtotal } from '@bb/common/fixtures/orders/mockOrder/helpers/getOrderSummaryItem';

export type OrderSummaryListItemProps = {
  orderSummaryItem: OrderSummaryItem;
  onClickEdit: () => void;
};

export function OrderSummaryListItem(props: OrderSummaryListItemProps) {
  const { orderSummaryItem, onClickEdit } = props;
  const {
    id,
    productImageUrl,
    productDisplayName,
    sizeDisplayName,
    productVariationPrice,
    modifications,
  } = orderSummaryItem;
  const { palette, spacing } = useTheme();

  const subtotalPrice = itemSubtotal(productVariationPrice, modifications);

  return (
    <Box
      data-testid="order-summary-list-item"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      paddingX={5}
      paddingBottom={8}>
      <Avatar
        variant={'circular'}
        sx={{
          height: spacing(8),
          width: spacing(8),
          padding: spacing(1),
          borderRadius: '50%',
          backgroundColor: palette.secondary.light,
        }}
        src={productImageUrl}
        alt="product-image"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        textAlign="center"
        flex="1 1 auto"
        paddingX={5}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          {productDisplayName}
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          alignSelf="stretch"
          paddingX={5}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignSelf="stretch"
            flex="1 1 auto">
            <Typography
              variant="h5"
              component="h3"
              color={palette.text.primary}
              gutterBottom>
              {sizeDisplayName}
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              color={palette.text.primary}
              gutterBottom>
              {formatPrice(productVariationPrice)}
            </Typography>
          </Box>
          {modifications.map((modSummary: OrderSummaryModification) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignSelf="stretch"
              flex="1 1 auto"
              key={modSummary.displayName}
              data-testid="order-summary-list-item-mod">
              <Typography
                variant="h5"
                component="h4"
                color={palette.text.secondary}
                gutterBottom>
                {modSummary.displayName}
              </Typography>
              <Typography
                variant="h5"
                component="h4"
                color={palette.text.secondary}
                gutterBottom>
                {formatPrice(modSummary.price, true)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingX={5}
        paddingBottom={8}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          {formatPrice(subtotalPrice)}
        </Typography>
        <Button
          id={`editButton-${id}`}
          variant="text"
          sx={{ display: 'flex', alignItems: 'flex-end' }}
          onClick={onClickEdit}>
          Edit
        </Button>
      </Box>
    </Box>
  );
}
