import { Meta, Story } from '@storybook/react';

import { ActionBar } from '@bb/common/actionBar/ActionBar';
import { Button } from '@material-ui/core';

const meta = {
  title: 'Common/Action Bar',
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <ActionBar>
      <Button variant="contained" onClick={args.onClick}>
        Back
      </Button>
      <Button variant="contained" onClick={args.onClick}>
        Cancel Order
      </Button>
      <Button variant="contained" onClick={args.onClick}>
        Order Summary
      </Button>
    </ActionBar>
  );
};

Default.storyName = meta.title.split('/')[1];
