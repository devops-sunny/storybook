import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Button } from '@material-ui/core';
import { FullMenu } from './FullMenu';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { mockKiosk } from '@bb/order/fixtures/menu/kiosk';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '4-Order/2-Full Menu',
} as Meta;

export default meta;

const ResetLink: React.FunctionComponent = () => {
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    const order = mockOrder().value();
    pushGetOrderResponse({ data: { order } });
    navigate(`/order/${order.id}/menu/menuB`);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      back
    </Button>
  );
};

export const Default: Story = () => {
  const order = mockOrder().value();
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/menu/menuB`]}>
          <Routes>
            <Route path="/order/:orderId/menu/menuB" element={<FullMenu />} />
            {mockKiosk?.mainMenu.items.map((item) => (
              <Route key={item.id} path={`/order/:orderId/menu/${item.id}`}>
                <div>
                  <p>
                    <strong>Order: Full Menu</strong> navigates to{' '}
                    <strong>Order: Sub menu :: {item.id}</strong> when user
                    selects a sub-menu
                  </p>
                  <ResetLink />
                </div>
              </Route>
            ))}
            <Route path="/attract">
              <div>
                <p>
                  <strong>Order: Full Menu</strong> navigates to{' '}
                  <strong>Attract</strong> when user taps Back/Cancel button
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
