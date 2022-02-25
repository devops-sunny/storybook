import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { SubMenu } from './SubMenu';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';

const meta = {
  title: '4-Order/3-Sub Menu',
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
  },
  args: {
    submenu: 'group one' as any,
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const order = mockOrder().value();

  const kioskMenus = {
    subMenus: {
      [mockSubMenu.groupOne.id]: mockSubMenu.groupOne,
      [mockSubMenu.groupTwo.id]: mockSubMenu.groupTwo,
      [mockSubMenu.groupThree.id]: mockSubMenu.groupThree,
      [mockSubMenu.groupFour.id]: mockSubMenu.groupFour,
    },
  };
  return (
    <MockedAppDataProvider
      key={JSON.stringify(args.submenu)}
      order={order}
      kioskMenus={kioskMenus as any}
      debug>
      <NineSixteen>
        <MemoryRouter
          initialEntries={[`/order/${order.id}/menu/${args.submenu.id}`]}
          initialIndex={0}>
          <Routes>
            <Route path="/order/:orderId/menu/:menuId" element={<SubMenu />} />
            <Route path="/order/:orderId/product/:productId">
              <div>
                <p>
                  <strong>Order: Sub Menu w/Size Popover </strong> navigates to{' '}
                  <strong>Order: Item Modification</strong> when user selects a
                  product size
                </p>
                <Link to={`/order/${order.id}/menu/${args.submenu.id}`}>
                  back
                </Link>
              </div>
            </Route>
            <Route path={`/order/${order.id}/menu/menuA`}>
              <div>
                <p>
                  <strong>Order: Sub Menu</strong> navigates to{' '}
                  <strong>Order: Full menu</strong> when user taps back button
                </p>
                <Link to={`/order/${order.id}/menu/${args.submenu.id}`}>
                  back
                </Link>
              </div>
            </Route>
            <Route path="/attract">
              <div>
                <p>
                  <strong>Order: Sub Menu</strong> navigates to{' '}
                  <strong>Attract</strong> when user taps Cancel button
                </p>
                <Link to={`/order/${order.id}/menu/${args.submenu.id}`}>
                  back
                </Link>
              </div>
            </Route>{' '}
          </Routes>
        </MemoryRouter>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.storyName = meta.title.split('/')[1];
