import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { ConfirmHandoff } from './ConfirmHandoff';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '@bb/order/nineSixteen/NineSixteen';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '@bb/order/common/constants';

const meta = {
  title: '5-Confirm/3-Handoff',
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const order = generateOrderWithStatus('Configuration');
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/order/${order.id}/handoff`]}>
          <Routes>
            <Route path="/order/:orderId/handoff">
              <ConfirmHandoff timeoutMs={args.timeoutMs} />
            </Route>
            <Route path="/attract">
              <div>
                <p>
                  <strong>Handoff</strong> navigates to <strong>Attract</strong>{' '}
                  after timeout
                </p>
                <Link to={`/order/${order.id}/handoff`}>back</Link>
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
