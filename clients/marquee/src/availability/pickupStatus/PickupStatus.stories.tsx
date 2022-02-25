import { Meta, Story } from '@storybook/react';

import { AppDataProvider } from '../../providers/AppDataProvider';
import { AppModeProvider } from '../../providers/AppModeProvider';
import { PickupStatus } from './PickupStatus';
import { PickupStatuses } from './PickupStatus.enum';

const meta = {
  title: 'Pickup Availability/Pickup Status',
  decorators: [
    (Story) => (
      <AppDataProvider users={[]} orders={[]}>
        <AppModeProvider>
          <Story />
        </AppModeProvider>
      </AppDataProvider>
    ),
  ],
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: [
          PickupStatuses.idle,
          PickupStatuses.available,
          PickupStatuses.engaged,
        ],
      },
    },
  },
} as Meta;
export default meta;

export const Default: Story = (args) => {
  return <PickupStatus status={args.status} />;
};

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  status: 'idle',
};
