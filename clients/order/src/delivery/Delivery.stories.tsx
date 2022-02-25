import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Button } from '@material-ui/core';
import { Delivery } from './Delivery';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '../nineSixteen/NineSixteen';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '../common/constants';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '7-Delivery/1-Delivery',
} as Meta;

export default meta;

const ResetLink: React.FunctionComponent = () => {
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    const order = generateOrderWithStatus('DeliveryReady');
    pushGetOrderResponse({ data: { order } });
    navigate(`/order/${order.id}/delivery`);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      back
    </Button>
  );
};

export const Default: Story = (args) => {
  const order = generateOrderWithStatus('DeliveryReady');
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/delivery`]}>
          <Routes>
            <Route path="/order/:orderId/delivery">
              <Delivery timeoutMs={args.timeoutMs} />
            </Route>
            <Route path="/approach">
              <div>
                <p>
                  <strong>Delivery</strong> navigates to{' '}
                  <strong>Approach</strong> after timeout
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

Default.args = {
  timeoutMs: timeouts.STORYBOOK_NAVIGATE_DEFAULT,
};
Default.storyName = meta.title.split('/')[1];
