import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { OrderItemModification } from './OrderItemModification';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

const meta = {
  title: '4-Order/4-Item Modification',
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const order = mockOrder().value();
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter
          initialEntries={[
            `/order/${order.id}/product/5713582d-b715-42a4-895b-08bdd238964f`,
          ]}
          initialIndex={0}>
          <Routes>
            <Route path="/order/:orderId/product/:productVariationId">
              <OrderItemModification />
            </Route>
            <Route path="/order/:orderId/summary">
              <div>
                <p>
                  <strong>Order: Modification</strong> navigates to{' '}
                  <strong>Confirm: Order Summary</strong> when a user taps Add
                  to Order
                </p>
                <Link
                  to={`/order/${order.id}/product/5713582d-b715-42a4-895b-08bdd238964f`}>
                  back
                </Link>
              </div>
            </Route>
            <Route path="/order/:orderId/menu/ebdd68a0-0202-4996-bb60-8a34e1bef310">
              <div>
                <p>
                  <strong>Order: Modification</strong> navigates to{' '}
                  <strong>Order: Full Menu</strong> when a user taps Back to
                  Menu button
                </p>
                <Link
                  to={`/order/${order.id}/product/5713582d-b715-42a4-895b-08bdd238964f`}>
                  back
                </Link>
              </div>
            </Route>
            <Route path="/attract">
              <div>
                <p>
                  <strong>Order: Modification</strong> navigates to{' '}
                  <strong>Attract</strong> when a user cancels the order
                </p>
                <Link
                  to={`/order/${order.id}/product/5713582d-b715-42a4-895b-08bdd238964f`}>
                  back
                </Link>
              </div>
            </Route>
          </Routes>
        </MemoryRouter>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.storyName = meta.title.split('/')[1];
