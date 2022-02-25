import { Meta, Story } from '@storybook/react';
import {
  mockOrders,
  mockProducers,
  mockUsers,
} from '@bb/marquee/fixtures/mockData';

import { AppDataProvider } from '../../providers/AppDataProvider';
import { AppModeProvider } from '../../providers/AppModeProvider';
import { PickupAvailability } from './PickupAvailability';

const meta = {
  title: 'Pickup Availability',
  argTypes: {
    orders: {
      options: [
        'NO orders ready for delivery',
        'two orders ready for delivery',
        'two orders being delivered to identifed app users',
      ],
      mapping: {
        'NO orders ready for delivery': mockOrders.deliveryReady.none,
        'two orders ready for delivery': mockOrders.deliveryReady.two,
        'two orders being delivered to identifed app users':
          mockOrders.deliveryQueued.two,
      },
      control: {
        type: 'select',
      },
    },
    users: {
      options: [
        'NO identified users',
        'two identified users',
        'one identified user LEFT',
        'one identified user RIGHT',
      ],
      mapping: {
        'NO identified users': mockUsers.identified.none,
        'two identified users': mockUsers.identified.two,
        'one identified user LEFT': mockUsers.identified.one.left,
        'one identified user RIGHT': mockUsers.identified.one.right,
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
    users={args.users}
    orders={args.orders}
    producers={mockProducers}
    // key to remount on any provider state change
    key={JSON.stringify({
      users: args.users,
      orders: args.orders,
      producers: mockProducers,
    })}>
    <AppModeProvider>
      <PickupAvailability />
    </AppModeProvider>
  </AppDataProvider>
);

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  users: 'NO identified users',
  orders: 'NO orders ready for delivery',
};
