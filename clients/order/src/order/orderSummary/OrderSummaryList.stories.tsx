import { Meta, Story } from '@storybook/react';
import { OrderSummaryList, OrderSummaryListProps } from './OrderSummaryList';

import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { modificationsView } from '@bb/common/fixtures/orderItem/modificationsView';
import { v4 as uuidv4 } from 'uuid';

const meta: Meta<OrderSummaryListProps> = {
  title: '4-Order/Components/Order Summary List',
  argTypes: {
    onClickEditItem: { action: 'onClickEditItem' },
    onClickCancelOrder: { action: 'onClickCancelOrder' },
    onClickConfirmAndPay: { action: 'onClickConfirmAndPay' },
    order: {
      control: 'select',
      options: ['no order', 'order with no items', 'order with two items'],
      mapping: {
        'no order': undefined,
        'order with no items': mockOrder().value(),
        'order with two items': {
          ...mockOrder()
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: {
                  id: 'd95b2e36-21c8-47c7-b35c-57de1e846ab3',
                  name: 'americano|12-oz',
                },
                modifications: modificationsView.TWO_MODIFICATIONS as any,
              },
            })
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: {
                  id: '7f9a6269-d742-40e8-b780-20f740fa71ed',
                  name: 'cappuccino|12-oz|whole-milk',
                },
                modifications: modificationsView.THREE_MODIFICATIONS as any,
              },
            })
            .value(),
        },
      },
    },
  },
  args: {
    order: 'order with two items',
  },
} as Meta;

export default meta;

export const Default: Story<OrderSummaryListProps> = (args) => {
  return <OrderSummaryList {...args} />;
};

Default.storyName = 'Order Summary List';
