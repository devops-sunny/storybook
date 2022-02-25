import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Greet } from './Greet';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '../nineSixteen/NineSixteen';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { timeouts } from '../common/constants';

const meta = {
  title: '3-Greet/1-Greet',
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const order = mockOrder().value();
  return (
    <MockedAppDataProvider order={order} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={[`/greet/${order.id}`]}>
          <Routes>
            <Route path="/greet/:orderId">
              <Greet timeoutMs={args.timeoutMs} />
            </Route>
            <Route path="/order/:orderId/menu/:menuId">
              <div>
                <p>
                  <strong>Greet</strong> navigates to{' '}
                  <strong>Order: Suggest</strong> after timeout or when user
                  touches screen
                </p>
                <Link to={`/greet/${order.id}`}>back</Link>
              </div>
            </Route>
            <Route path="/approach">
              <div>
                <p>
                  <strong>Greet</strong> navigates to <strong>Approach</strong>{' '}
                  when user touches Cancel
                </p>
                <Link to={`/greet/${order.id}`}>back</Link>
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
