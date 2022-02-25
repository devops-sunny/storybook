import { MenuItem, MenuItemAvatarSize, MenuItemProps } from './MenuItem';
import { Meta, Story } from '@storybook/react';

import { menuItemImage } from '@bb/order/fixtures/menu/menuItemImage';

const meta = {
  title: '4-Order/Components/Menu Item',
  argTypes: {
    onClick: { action: 'onClick' },
    size: {
      control: 'select',
      options: ['not set', 'sub-menu', 'product'],
      mapping: {
        'not set': undefined,
        'sub-menu': MenuItemAvatarSize.SUB_MENU,
        product: MenuItemAvatarSize.PRODUCT,
      },
    },
  },
} as Meta;

export default meta;

export const Default: Story<MenuItemProps> = (args) => {
  return <MenuItem {...args} />;
};

Default.storyName = 'Product Menu Item';
Default.args = {
  id: menuItemImage.AMERICANO.id,
  imageUrl: menuItemImage.AMERICANO.sourceUrl,
  name: menuItemImage.AMERICANO.name,
  size: 'product' as any,
};

export const Big: Story<MenuItemProps> = (args) => {
  return <MenuItem {...args} />;
};

Big.storyName = 'Submenu Menu Item';
Big.args = {
  ...Default.args,
  size: 'sub-menu' as any,
};

export const NoImage: Story<MenuItemProps> = (args) => {
  return <MenuItem {...args} />;
};

NoImage.args = {
  ...Default.args,
  imageUrl: 'missing',
  accessibleName: 'AMERICANO ALT',
  size: 'not set' as any,
};
