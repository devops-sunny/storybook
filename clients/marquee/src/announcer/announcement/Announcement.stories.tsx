import { Meta, Story } from '@storybook/react';

import { Announcement } from './Announcement';

const meta = {
  title: 'Announcer/Announcement',
  argTypes: {
    hasOrder: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;
export default meta;

export const Default: Story = (args) => (
  <Announcement
    orderName={args.hasOrder ? args.orderName : undefined}
    showDuration={args.timeoutMs}
  />
);

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  hasOrder: false,
  orderName: '',
  timeoutMs: 2000,
};
