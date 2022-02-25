import { Meta, Story } from '@storybook/react';

import { PickupProgress } from './PickupProgress';

const meta = {
  title: 'pickupProgress',
  args: {
    timeout: 30000,
    progress: 0,
    color: 'secondary',
    bgColor: 'secondaryDark',
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <PickupProgress
      key={JSON.stringify(args)}
      timeout={args.timeout}
      progress={args.progress}
      color={args.color}
      bgColor={args.bgColor}
    />
  );
};

Default.storyName = meta.title.split('/')[1];
