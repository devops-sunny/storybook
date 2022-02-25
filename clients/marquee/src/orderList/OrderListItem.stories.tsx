import { Meta, Story } from '@storybook/react';
import {
  OrderListItemPresentation,
  OrderListItemPresentationProps,
} from './OrderListItem';

import { OrderItemStatus } from '@bb/marquee/generated/graph';

const meta: Meta = {
  title: 'Order List/Item',
  component: OrderListItemPresentation,
  argTypes: {
    onClickDeliverOrderButton: { action: 'clicked' },
  },
};

export default meta;

const Template: Story<OrderListItemPresentationProps> = (args) => (
  <OrderListItemPresentation {...args} />
);

export const Default = Template.bind({});

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  order: {
    id: 'whatever',
    items: [],
    status: [OrderItemStatus.ProductionCompleted],
  },
  DeliverOrderButtonProps: {
    disabled: false,
  },
};
