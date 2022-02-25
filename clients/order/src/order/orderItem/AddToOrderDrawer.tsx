import { Box, Button, Drawer, Skeleton, Typography } from '@material-ui/core';

export type AddToOrderDrawerProps = {
  open: boolean;
  confirmationCopy: string;
  orderItemName: string;
  onClickOrderAnother: () => void;
  onClickCheckout: () => void;
  loading?: boolean;
};

const ITEM_NAME_PLACEHOLDER = '#orderItemName#';

export function AddToOrderDrawer(props: AddToOrderDrawerProps) {
  const {
    open,
    confirmationCopy,
    orderItemName,
    onClickOrderAnother,
    onClickCheckout,
    loading,
  } = props;

  const ConfirmationMessage = () => {
    return (
      <>
        <Typography variant="body1">
          {confirmationCopy.substring(
            0,
            confirmationCopy.indexOf(ITEM_NAME_PLACEHOLDER),
          )}
          <b>{orderItemName}</b>
          {confirmationCopy.substring(
            confirmationCopy.indexOf(ITEM_NAME_PLACEHOLDER) +
              ITEM_NAME_PLACEHOLDER.length,
          )}
        </Typography>
      </>
    );
  };

  return (
    <Drawer anchor="bottom" open={open}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex="0 0 25vh"
        paddingX={2}
        paddingY={4}
        data-testid="add-to-order-drawer">
        {loading ? (
          <AddToOrderSkeleton />
        ) : (
          <>
            <ConfirmationMessage />
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button variant="outlined" onClick={onClickOrderAnother}>
                Order Another Drink
              </Button>
              <Box marginRight={2} />
              <Button variant="contained" onClick={onClickCheckout}>
                Go to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

function AddToOrderSkeleton() {
  return (
    <Box data-testid="add-to-order-skeleton">
      <Skeleton animation="wave" />
      <Box display="flex" justifyContent="center">
        <Skeleton
          animation="wave"
          width={160}
          height={40}
          sx={{ marginRight: 2 }}
        />
        <Skeleton animation="wave" width={160} height={40} />
      </Box>
    </Box>
  );
}
