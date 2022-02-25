import { Meta, Story } from '@storybook/react';

import { Announcer } from './Announcer';
import { AppDataProvider } from '../providers/AppDataProvider';
import { AppModeProvider } from '../providers/AppModeProvider';
import { Box } from '@material-ui/system';
import { mockOrders } from '@bb/marquee/fixtures/mockData';

const meta = {
  title: 'Announcer/Announcer',
  argTypes: {
    orders: {
      options: [
        'NO orders ready for delivery',
        'one named order ready for delivery',
        'two named orders ready for delivery',
        'three orders (one un-named) ready for delivery',
      ],
      mapping: {
        'NO orders ready for delivery': mockOrders.deliveryReady.none,
        'one named order ready for delivery': mockOrders.deliveryReady.one,
        'two named orders ready for delivery': mockOrders.deliveryReady.two,
        'three orders (one un-named) ready for delivery':
          mockOrders.deliveryReady.three,
      },
      control: {
        type: 'select',
      },
    },
  },
} as Meta;
export default meta;

export const Default: Story = (args) => (
  <AppDataProvider
    orders={args.orders}
    users={[]}
    // key to remount on any provider state change
    key={JSON.stringify({
      orders: args.orders,
    })}>
    <AppModeProvider>
      <Announcer
        showDuration={args.showDuration}
        transitionDuration={args.transitionDuration}>
        <Box bgcolor="red" flex="1 1 auto" />
      </Announcer>
    </AppModeProvider>
  </AppDataProvider>
);

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  orders: 'NO orders ready for delivery',
  showDuration: 1000,
  transitionDuration: 500,
};
