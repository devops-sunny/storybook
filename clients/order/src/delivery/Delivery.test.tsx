import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '../providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { Delivery } from './Delivery';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '../common/constants';

const renderDeliveryWithMockRoutes = () => {
  const order = generateOrderWithStatus('ProductionReady');

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/delivery`]}>
            <Routes>
              <Route
                path="/order/:orderId/delivery"
                element={<Delivery timeoutMs={timeouts.UNIT_TEST_DEFAULT} />}
              />
              <Route path="/approach" element={<h1>approach</h1>} />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <Delivery/>', () => {
  describe('when it mounts', () => {
    it('renders the Delivery view', () => {
      renderDeliveryWithMockRoutes();
      expect(
        screen.getByRole('heading', { name: /delivery/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when component timeout is reached', () => {
    it('navigates to Approach', async () => {
      renderDeliveryWithMockRoutes();

      expect(
        await screen.findByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });
});
