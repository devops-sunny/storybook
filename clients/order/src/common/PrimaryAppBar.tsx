import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { CheckoutButton } from './checkoutButton/CheckoutButton';
import React from 'react';
import { useAppConfigContext } from '@bb/common';
import { useLongPress } from 'use-long-press';

type Props = {
  title: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function PrimaryAppBar(props: Props) {
  const { title, leading } = props;

  const { setAppConfigDialogIsOpen } = useAppConfigContext();

  const longPressHandlers = useLongPress(() => setAppConfigDialogIsOpen(true), {
    threshold: 3000,
  });

  const trailing = props.trailing ?? <CheckoutButton edge="end" />;

  return (
    <AppBar position="sticky" {...longPressHandlers}>
      <Toolbar>
        {leading}
        <Typography variant="h6" component="h1" sx={{ flex: 1 }}>
          {title}
        </Typography>
        {trailing}
      </Toolbar>
    </AppBar>
  );
}
