import { AddToOrderDrawer, AddToOrderDrawerProps } from './AddToOrderDrawer';
import { Meta, Story } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { menuItemImage } from '@bb/order/fixtures/menu/menuItemImage';

const meta = {
  title: '4-Order/Components/Add To Order Drawer',
  component: AddToOrderDrawer,
} as Meta;

export default meta;

const onClickOrderAnotherAction = action('App navigates to Main Menu');
const onClickCheckoutAction = action('App navigates to Order Summary');

export const Default: Story<
  AddToOrderDrawerProps & { resetShowDrawer: boolean }
> = (args) => {
  const [showDrawer, setShowDrawer] = useState(false);

  // use the resetShowDrawer control to reset the state
  useEffect(() => {
    if (args.resetShowDrawer) setShowDrawer(false);
  }, [args.resetShowDrawer, setShowDrawer]);

  return (
    <>
      <Button variant="contained" onClick={() => setShowDrawer(true)}>
        Open Drawer
      </Button>
      <AddToOrderDrawer
        {...args}
        open={showDrawer}
        onClickOrderAnother={onClickOrderAnotherAction}
        onClickCheckout={onClickCheckoutAction}
      />
    </>
  );
};

Default.storyName = 'Add To Order Drawer';
Default.argTypes = {
  resetShowDrawer: {
    control: 'check',
    options: ['toggle to reset (hide)'],
    mappings: { 'toggle to reset (hide)': true },
  },
};
Default.args = {
  confirmationCopy:
    'Got it! #orderItemName# was added to your order. What would you like to do next?',
  orderItemName: 'Soy Latte with Caramel, Light Mocha, and extra shot',
  loading: false,
};
