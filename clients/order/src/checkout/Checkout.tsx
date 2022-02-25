import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Fab,
  FabProps,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  CheckoutQuery,
  useCheckoutQuery,
  useProduceOrderMutation,
} from '@bb/order/generated/graph';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import { PrimaryAppBar } from '../common/PrimaryAppBar';
import { isNotNullish } from '@bb/common';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';

export function Checkout() {
  const { currentOrder, setCurrentOrder } = useAppDataContext();

  const navigate = useNavigate();

  const [errorIsDismissed, setErrorIsDismissed] = useState(true);

  const [{ data }] = useCheckoutQuery({
    variables: { orderId: currentOrder?.id! },
    pause: currentOrder?.id ? false : true,
    requestPolicy: 'network-only',
  });

  const [
    {
      data: produceOrderData,
      error: produceOrderError,
      fetching: produceOrderFetching,
    },
    produceOrder,
  ] = useProduceOrderMutation();

  useEffect(() => {
    if (produceOrderError) {
      setErrorIsDismissed(false);
    }
  }, [produceOrderError]);

  useEffect(() => {
    if (produceOrderData) {
      setCurrentOrder(undefined);
      const timeoutId = window.setTimeout(() => navigate(`/`), 3000);

      return () => window.clearTimeout(timeoutId);
    }
  }, [setCurrentOrder, navigate, produceOrderData]);

  if (!currentOrder) {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <PrimaryAppBar
          title="Checkout"
          leading={
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 1 }}
              component={RouterLink}
              to="/">
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <Container
          sx={{
            py: 2,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography align="center">
            There's nothing in your order!
            <br />
            <Link to="/" component={RouterLink}>
              Add an item
            </Link>
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <CheckoutPresentation
        data={data}
        onPlaceOrder={() => {
          if (data?.order) {
            produceOrder({ orderId: data.order.id });
          }
        }}
        PlaceOrderButtonProps={{ disabled: produceOrderFetching }}
      />
      <Snackbar open={produceOrderError && !errorIsDismissed}>
        <Alert severity="error" onClose={() => setErrorIsDismissed(true)}>
          {produceOrderError?.message ?? (
            <>Failed to produce your order, please try again!</>
          )}
        </Alert>
      </Snackbar>
      <Dialog open={Boolean(produceOrderData)}>
        <DialogContent>Your order has been placed!</DialogContent>
      </Dialog>
    </>
  );
}

export type CheckoutPresentationProps = {
  data?: CheckoutQuery;
  onPlaceOrder: () => void;
  PlaceOrderButtonProps?: FabProps;
};

export function CheckoutPresentation(props: CheckoutPresentationProps) {
  const { data, onPlaceOrder, PlaceOrderButtonProps } = props;

  const { spacing } = useTheme();

  if (!data) {
    return (
      <PrimaryAppBar
        title="Loading..."
        leading={
          <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        }
      />
    );
  }
  return (
    <>
      <PrimaryAppBar
        title="Checkout"
        leading={
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 1 }}
            component={RouterLink}
            to="/">
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Stack spacing={1} divider={<Divider />}>
          {data?.order?.items.filter(isNotNullish).map(
            ({
              id,
              modifiedProductVariation: {
                productVariation: { product, rules },
              },
            }) => (
              <Box key={id} py={2} px={1}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Box>
                  {rules.filter(isNotNullish).map(({ value, component }) => (
                    <Chip
                      key={component.name}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                      label={`
                          ${
                            isNotNullish(value)
                              ? `${value} ${component.unitOfMeasure.name} of `
                              : ''
                          }
                          ${component.name}
                      `}
                    />
                  ))}
                </Box>
              </Box>
            ),
          )}
        </Stack>
        <Box my={2} textAlign="center">
          <Button component={RouterLink} to="/">
            Add an Item
          </Button>
        </Box>
      </Container>
      <Fab
        {...PlaceOrderButtonProps}
        onClick={onPlaceOrder}
        variant="extended"
        color="secondary"
        sx={{
          position: 'absolute',
          bottom: spacing(2),
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}>
        <CheckIcon sx={{ mr: 1 }} />
        Place Order
      </Fab>
    </>
  );
}
