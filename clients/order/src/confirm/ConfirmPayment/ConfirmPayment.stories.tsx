import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagDefaultArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { Button } from '@material-ui/core';
import { ConfirmPayment } from './ConfirmPayment';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '@bb/order/common/constants';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '5-Confirm/2-Payment',
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
} as Meta;

export default meta;

const ResetLink: React.FunctionComponent = () => {
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    const order = generateOrderWithStatus('Configuration');
    pushGetOrderResponse({ data: { order } });
    navigate(`/order/${order.id}/payment`);
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
        <AppFeaturesProvider
          features={args.features}
          key={JSON.stringify({
            features: args.features,
          })}>
          <MemoryRouter initialEntries={[`/order/${order.id}/payment`]}>
            <Routes>
              <Route path="/order/:orderId/payment">
                <ConfirmPayment timeoutMs={args.afterSuccessTimeoutMs} />
              </Route>
              <Route path="/order/:orderId/wait">
                <div>
                  <p>
                    <strong>Confirm: Payment</strong> navigates to{' '}
                    <strong>Wait: Here</strong> when timeout is reached
                  </p>
                  <ResetLink />
                </div>
              </Route>
              <Route path="/order/:orderId/summary">
                <div>
                  <p>
                    <strong>Confirm: Payment</strong> navigates to{' '}
                    <strong>Confirm: Order Summary</strong> when user touches
                    Cancel
                  </p>
                  <ResetLink />
                </div>
              </Route>
              <Route path="/order/:orderId/handoff">
                <div>
                  <p>
                    <pre>Option B</pre>
                    <strong>Confirm: Payment</strong> navigates to{' '}
                    <strong>Confirm: Handoff</strong> when timeout is reached
                  </p>
                  <ResetLink />
                </div>
              </Route>
            </Routes>
          </MemoryRouter>
        </AppFeaturesProvider>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.args = {
  afterSuccessTimeoutMs: timeouts.NAVIGATE_AFTER_ACTION,
  ...storybookFeatureFlagDefaultArg,
};
Default.storyName = meta.title.split('/')[1];
