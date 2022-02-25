import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';
import {
  MockedAppDataProvider,
  useAppDataContext,
} from '../../providers/AppDataProvider/AppDataProvider';

import { Button } from '@material-ui/core';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { WaitHere } from './WaitHere';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { timeouts } from '../../common/constants';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: '6-Wait/1-Stand Here',
} as Meta;

export default meta;

function ResetLink(props: React.PropsWithChildren<{ to: string }>) {
  const { children, to } = props;
  const { currentOrder } = useAppDataContext();
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentOrder) {
      pushGetOrderResponse({
        data: {
          order: mockOrder({ order: currentOrder })
            .updateAllItemsStatus({ status: 'Configuration' })
            .value(),
        },
      });
      navigate(to);
    }
  };

  return (
    <Button variant="text" onClick={handleClick}>
      {children}
    </Button>
  );
}

export const Default: Story = (args) => {
  const order = generateOrderWithStatus('Configuration');
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/wait`]}>
          <Routes>
            <Route path="/order/:orderId/wait">
              <WaitHere timeoutMs={args.timeoutMs} />
            </Route>
            <Route path="/order/:orderId/progress">
              <div>
                <p>
                  <strong>Wait: Here</strong> navigates to{' '}
                  <strong>Wait: Progress</strong> after timeout or when order
                  item status updates
                </p>
                <ResetLink to={`/order/${order.id}/wait`}>back</ResetLink>
              </div>
            </Route>
            <Route path="/order/:orderId/delivery">
              <div>
                <p>
                  <strong>Wait: Here</strong> navigates to{' '}
                  <strong>Delivery</strong> when order status is ready for
                  delivery
                </p>
                <ResetLink to={`/order/${order.id}/wait`}>back</ResetLink>
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
