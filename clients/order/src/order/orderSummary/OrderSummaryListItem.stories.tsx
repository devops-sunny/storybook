import { Meta, Story } from '@storybook/react';
import {
  OrderSummaryListItem,
  OrderSummaryListItemProps,
} from './OrderSummaryListItem';

import { orderSummaryItem } from '@bb/common/fixtures/orderItem/orderSummaryItem';

const meta: Meta<OrderSummaryListItemProps> = {
  title: '4-Order/Components/Order Summary List Item',
  argTypes: {
    onClickEdit: { action: 'onClickEdit' },
    orderSummaryItem: {
      control: 'select',
      options: [
        'no modifications',
        'one modification',
        'two modifications',
        'three modifications',
      ],
      mapping: {
        'no modifications': orderSummaryItem.NO_MODIFICATIONS,
        'one modification': orderSummaryItem.ONE_MODIFICATION,
        'two modifications': orderSummaryItem.TWO_MODIFICATIONS,
        'three modifications': orderSummaryItem.THREE_MODIFICATIONS,
      },
    },
  },
  args: {
    orderSummaryItem: 'no modifications',
  },
} as Meta;

export default meta;

export const Default: Story<OrderSummaryListItemProps> = (args) => {
  return <OrderSummaryListItem {...args} />;
};

Default.storyName = 'Order Summary List Item';
