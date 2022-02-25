import { MenuItemPopover, MenuItemPopoverProps } from './MenuItemPopover';
import { Meta, Story } from '@storybook/react';

import { currency } from '@bb/order/fixtures/menu/currency';
import { mockMenuItemProductSize } from '@bb/order/fixtures/menu/menuItemProductSize';

const meta = {
  title: '4-Order/Components/Menu Item Popover',
  argTypes: {
    onClick: { action: 'onClick' },
    productSizes: {
      control: {
        type: 'select',
      },
      options: ['hot drink USA', 'iced drink USA', 'iced drink UK'],
      mapping: {
        'hot drink USA': mockMenuItemProductSize.ALMOND_MILK_LATTE,
        'iced drink USA': mockMenuItemProductSize.ICED_ALMOND_MILK_LATTE,
        'iced drink UK': [
          {
            ...mockMenuItemProductSize.ICED_ALMOND_MILK_LATTE[0],
            price: {
              value: 200,
              iso4217Currency: currency.gbp,
            },
          },
          {
            ...mockMenuItemProductSize.ICED_ALMOND_MILK_LATTE[1],
            price: {
              value: 250,
              iso4217Currency: currency.gbp,
            },
          },
        ],
      },
    },
  },
} as Meta;

export default meta;

export const Default: Story<MenuItemPopoverProps> = (args) => {
  return <MenuItemPopover {...args} />;
};

Default.storyName = 'Menu Item Popover';
Default.args = {
  productSizes: 'hot drink USA' as any,
};
