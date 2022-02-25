import { MenuItemList, MenuItemListProps } from './MenuItemList';
import { Meta, Story } from '@storybook/react';

import { Menu } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { MenuItem } from './MenuItem';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';

const meta = {
  title: '4-Order/Components/Menu Item List',
  argTypes: {
    submenu: {
      control: 'select',
      options: ['group one', 'group two', 'group three', 'group four'],
      mapping: {
        'group one': mockSubMenu.groupOne,
        'group two': mockSubMenu.groupTwo,
        'group three': mockSubMenu.groupThree,
        'group four': mockSubMenu.groupFour,
      },
    },
    onItemClick: { action: 'onClick' },
  },
} as Meta;

export default meta;

export const Default: Story<MenuItemListProps & { submenu: Menu }> = (args) => {
  return (
    <MenuItemList
      description={args.submenu.description}
      items={args.submenu.items}
      renderItem={args.renderItem}
      onItemClick={args.onItemClick}
    />
  );
};

Default.storyName = 'Menu Item List';

Default.args = {
  submenu: 'group one' as any,
  renderItem: MenuItem,
};
