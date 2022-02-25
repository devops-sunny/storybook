import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Button } from '@material-ui/core';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { OrderSuggestMenu } from './OrderSuggestMenu';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '4-Order/1-Menu Suggest',
} as Meta;

export default meta;

const ResetLink: React.FunctionComponent = () => {
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    const order = mockOrder().value();
    pushGetOrderResponse({ data: { order } });
    navigate(`/order/${order.id}/menu/menuA`);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      back
    </Button>
  );
};

export const Default: Story = (args) => {
  const order = mockOrder().value();
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/menu/menuA`]}>
          <Routes>
            <Route path="/order/:orderId/menu/menuA">
              <OrderSuggestMenu />
            </Route>
            <Route path="/order/:orderId/product/:productVariationId">
              <div>
                <p>
                  <strong>Order: Suggest</strong> navigates to{' '}
                  <strong>Order: Item Modification</strong> when user selects
                  suggested product with size
                </p>
                <ResetLink />
              </div>
            </Route>
            <Route path="/order/:orderId/menu/menuB">
              <div>
                <p>
                  <strong>Order: Suggest</strong> navigates to{' '}
                  <strong>Order: Full Menu</strong> when user touches Full Menu
                </p>
                <ResetLink />
              </div>
            </Route>
            <Route path="/approach">
              <div>
                <p>
                  <strong>Order: Suggest</strong> navigates to{' '}
                  <strong>Approach</strong> when user taps Back button
                </p>
                <ResetLink />
              </div>
            </Route>
          </Routes>
        </MemoryRouter>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.storyName = meta.title.split('/')[1];
