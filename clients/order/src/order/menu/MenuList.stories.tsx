import { MenuList, MenuListProps } from './MenuList';
import { Meta, Story } from '@storybook/react';

import { MenuItem } from './MenuItem';
import { mockMainMenuAlpha3 } from '@bb/order/fixtures/menu/mainMenu';

const meta = {
  title: '4-Order/Components/Menu List',
  argTypes: {
    onItemClick: { action: 'onClick' },
  },
} as Meta;

export default meta;

export const Default: Story<MenuListProps> = (args) => {
  return <MenuList {...args} />;
};

Default.storyName = 'Menu List';

Default.args = {
  description: mockMainMenuAlpha3.description,
  items: mockMainMenuAlpha3.items,
  renderItem: MenuItem,
};
