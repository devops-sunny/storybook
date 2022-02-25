import { Drawer, Fab, Typography } from '@material-ui/core';

import { useAppDataContext } from './AppDataProvider';
import { useState } from 'react';

export const AppDataProviderDebug = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { users, orders } = useAppDataContext();

  const drawerWidth = 320;

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
        <Typography variant="h5">App Data Provider</Typography>
        <pre>
          USERS:
          <br />
          {JSON.stringify(users, null, 2)}
        </pre>
        <pre>
          ORDERS:
          <br />
          {JSON.stringify(orders, null, 2)}
        </pre>
      </Drawer>
    </>
  );
};
