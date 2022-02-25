import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { MockedAppDataProvider } from '../../providers/AppDataProvider/AppDataProvider';
import { WaitHere } from './WaitHere';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '../../common/constants';

const renderWaitHereWithMockRoutes = () => {
  const order = generateOrderWithStatus('ProductionReady');
  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/wait`]}>
            <Routes>
              <Route
                path="/order/:orderId/wait"
                element={<WaitHere timeoutMs={timeouts.UNIT_TEST_DEFAULT} />}
              />
              <Route
                path="/order/:orderId/progress"
                element={<h1>wait order progress</h1>}
              />
              <Route
                path="/order/:orderId/delivery"
                element={<h1>delivery</h1>}
              />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <WaitHere/>', () => {
  describe('when it mounts', () => {
    it('renders the Wait Stand Here view', () => {
      renderWaitHereWithMockRoutes();
      expect(
        screen.getByRole('heading', { name: /Wait: Stand Here/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when component timeout is reached', () => {
    it('navigates to Wait Order Progress', async () => {
      renderWaitHereWithMockRoutes();

      expect(
        await screen.findByRole('heading', { name: /wait order progress/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when order item status updates', () => {
    it('navigates to Wait Order Progress', async () => {
      renderWaitHereWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: 'order item changes status' }),
      );

      expect(
        screen.getByRole('heading', { name: /wait order progress/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when order status is ready for delivery', () => {
    it('navigates to Delivery', () => {
      renderWaitHereWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', {
          name: /order item changes status to ready for delivery/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /delivery/i }),
      ).toBeInTheDocument();
    });
  });
});
