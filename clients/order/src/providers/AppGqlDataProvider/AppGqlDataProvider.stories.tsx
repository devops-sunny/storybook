import { Meta, Story } from '@storybook/react';

import { KioskQueryExample } from './storyComponents/queries/KioskQueryExample';
import { MainMenuQueryExample } from './storyComponents/queries/MainMenuQueryExample';
import { MenuItemProduct } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { MutationsExample } from './storyComponents/mutations/MutationsExample';
import { NotMockedMutationExample } from './storyComponents/mutations/NotMockedMutationExample';
import { NotMockedQueryExample } from './storyComponents/queries/NotMockedQueryExample';
import { OrderQueryExample } from './storyComponents/queries/OrderQueryExample';
import { ProductVariationContentQueryByIdExample } from './storyComponents/queries/ProductVariationContentQueryByIdExample';
import { ProductVariationContentQueryByNameExample } from './storyComponents/queries/ProductVariationContentQueryByNameExample';
import { SubMenuQueryExample } from './storyComponents/queries/SubMenuQueryExample';
import { SubMenusQueryExample } from './storyComponents/queries/SubMenusQueryExample';
import { mockKiosk } from '@bb/order/fixtures/menu/kiosk';
import { mockMainMenu } from '@bb/order/fixtures/menu/mainMenu';
import { mockMenuItemProduct } from '@bb/order/fixtures/menu/menuItemProduct';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';

const meta: Meta = {
  title: 'Order App/Mock Data Provider',
};

export default meta;

export const MockedOrderQuery: Story = () => {
  return <OrderQueryExample />;
};

export const MockedKioskQuery: Story = (args) => {
  return <KioskQueryExample kioskId={args.kiosk} />;
};
MockedKioskQuery.argTypes = {
  kiosk: {
    control: {
      type: 'select',
    },
    options: ['alpha-3 demo kiosk', 'none'],
    mapping: {
      'alpha-3 demo kiosk': mockKiosk.id,
      none: 'UNDEFINED',
    },
  },
};
MockedKioskQuery.args = {
  kiosk: 'alpha-3 demo kiosk',
};

export const MockedMenuQuery: Story = (args) => {
  return <MainMenuQueryExample menuId={args.menu} />;
};
MockedMenuQuery.argTypes = {
  menu: {
    control: {
      type: 'select',
    },
    options: ['alpha-3 demo menu', 'none'],
    mapping: {
      'alpha-3 demo menu': mockMainMenu.alpha3.id,
      none: 'UNDEFINED',
    },
  },
};
MockedMenuQuery.args = {
  menu: 'alpha-3 demo menu',
};

export const MockedSubmenuQuery: Story = (args) => {
  return <SubMenuQueryExample menuId={args.menu} />;
};
MockedSubmenuQuery.argTypes = {
  menu: {
    control: {
      type: 'select',
    },
    options: [
      'group 1 sub-menu',
      'group 2 sub-menu',
      'group 3 sub-menu',
      'group 4 sub-menu',
      'none',
    ],
    mapping: {
      'group 1 sub-menu': mockSubMenu.groupOne.id,
      'group 2 sub-menu': mockSubMenu.groupTwo.id,
      'group 3 sub-menu': mockSubMenu.groupThree.id,
      'group 4 sub-menu': mockSubMenu.groupFour.id,
      none: 'UNDEFINED',
    },
  },
};
MockedSubmenuQuery.args = {
  menu: 'group 1 sub-menu',
};

export const MockedSubmenusQuery: Story = (args) => {
  return <SubMenusQueryExample menuIds={args.menus} />;
};
MockedSubmenusQuery.argTypes = {
  menus: {
    control: {
      type: 'select',
    },
    options: ['alpha-3 sub-menus', 'none'],
    mapping: {
      'alpha-3 sub-menus': [
        mockSubMenu.groupOne.id,
        mockSubMenu.groupTwo.id,
        mockSubMenu.groupThree.id,
        mockSubMenu.groupFour.id,
      ],
      none: [],
    },
  },
};
MockedSubmenusQuery.args = {
  menus: 'alpha-3 sub-menus',
};

export const MockProductVariationContentQueryByName: Story = (args) => {
  return (
    <ProductVariationContentQueryByNameExample
      productVariationName={args.productVariation}
    />
  );
};
MockProductVariationContentQueryByName.argTypes = {
  productVariation: {
    control: {
      type: 'select',
    },
    options: Object.values(mockMenuItemProduct).reduce<string[]>(
      (acc: string[], curr: MenuItemProduct) => {
        return [
          ...acc,
          ...curr.productVariationIds.map(
            (productVariation) => productVariation.name,
          ),
        ];
      },
      [],
    ),
  },
};
MockProductVariationContentQueryByName.args = {
  productVariation: 'americano|12-oz',
};

export const MockProductVariationContentQueryById: Story = (args) => {
  return (
    <ProductVariationContentQueryByIdExample
      productVariationId={args.productVariation}
    />
  );
};
MockProductVariationContentQueryById.argTypes = {
  productVariation: {
    control: {
      type: 'select',
    },
    options: Object.values(mockMenuItemProduct).reduce<string[]>(
      (acc: string[], curr: MenuItemProduct) => {
        return [
          ...acc,
          ...curr.productVariationIds.map(
            (productVariation) => productVariation.id,
          ),
        ];
      },
      [],
    ),
  },
};
MockProductVariationContentQueryById.args = {
  productVariation: 'd95b2e36-21c8-47c7-b35c-57de1e846ab3',
};

export const MockedMutationCreateOrder: Story = () => {
  return <MutationsExample />;
};

export const RealQueryRequest: Story = () => {
  return <NotMockedQueryExample />;
};

export const RealMutationRequest: Story = () => {
  return <NotMockedMutationExample />;
};
