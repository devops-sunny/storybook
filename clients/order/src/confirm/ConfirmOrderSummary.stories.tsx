import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Button } from '@material-ui/core';
import { ConfirmOrderSummary } from './ConfirmOrderSummary';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '../nineSixteen/NineSixteen';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '5-Confirm/1-Order Summary',
} as Meta;

export default meta;

const ResetLink: React.FunctionComponent = () => {
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    const order = generateOrderWithStatus('Configuration');
    pushGetOrderResponse({ data: { order } });
    navigate(`/order/${order.id}/summary`);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      back
    </Button>
  );
};

export const Default: Story = (args) => {
  const order = generateOrderWithStatus('Configuration');

  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/summary`]}>
          <Routes>
            <Route path="/order/:orderId/summary">
              <ConfirmOrderSummary />
            </Route>
            <Route path="/order/:orderId/payment">
              <div>
                <p>
                  <strong>Confirm: Summary</strong> navigates to{' '}
                  <strong>Confirm: Payment</strong> when user touches Confirm
                  and Pay
                </p>
                <ResetLink />
              </div>
            </Route>
            <Route path="/order/:orderId/menu/menuB">
              <div>
                <p>
                  <strong>Confirm: Summary</strong> navigates to{' '}
                  <strong>Order: Full Menu</strong> when user touches Back
                </p>
                <ResetLink />
              </div>
            </Route>
            <Route path="/order/:orderId/order-item/:orderItemId">
              <div>
                <p>
                  <strong>Confirm: Summary</strong> navigates to{' '}
                  <strong>Order: Item Modification</strong> when user touches
                  Edit Item
                </p>
                <ResetLink />
              </div>
            </Route>
            <Route path="/approach">
              <div>
                <p>
                  <strong>Confirm: Summary</strong> navigates to{' '}
                  <strong>Approach</strong> when user touches Cancel
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
