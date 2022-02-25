import { Box, Drawer, Fab, IconButton, Typography } from '@material-ui/core';

import { Close } from '@material-ui/icons';
import { useAppDataContext } from './AppDataProvider';
import { useState } from 'react';

export const AppDataProviderDebug = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    currentOrderId,
    currentOrder,
    user,
    orders,
    storefrontId,
    storefrontName,
    producerId,
    producerSerial,
  } = useAppDataContext();

  const drawerWidth = '50%';

  return (
    <>
      <Fab
        color="secondary"
        size="small"
        sx={{ zIndex: 1 }}
        onClick={() => setOpen(!open)}>
        {'{…}'}
      </Fab>
      <Drawer
        variant="temporary"
        anchor="left"
        hideBackdrop
        open={open}
        onClose={() => setOpen(!open)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">App Data Provider</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Box flex="1 1 auto" overflow="auto">
          <pre>
            STOREFRONT:
            <br />
            <strong>{storefrontName}</strong> <br />
            {storefrontId}
          </pre>
          <pre>
            PRODUCER:
            <br />
            <strong>{producerSerial}</strong>
            <br />
            {producerId}
          </pre>
          <pre>
            CURRENT ORDER:
            <br />
            {JSON.stringify(currentOrderId)}
            <br />
            {JSON.stringify(currentOrder, null, 2)}
          </pre>
          <pre>
            USER:
            <br />
            {JSON.stringify(user, null, 2)}
          </pre>
          <pre>
            ORDERS:
            <br />
            {JSON.stringify(orders, null, 2)}
          </pre>
        </Box>
      </Drawer>
    </>
  );
};
