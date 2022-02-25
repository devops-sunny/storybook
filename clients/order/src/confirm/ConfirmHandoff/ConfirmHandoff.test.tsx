import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { AppQueryClientProvider } from '@bb/common';
import { ConfirmHandoff } from './ConfirmHandoff';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { defaultFeatures } from '@bb/common/providers/appFeaturesProvider/features.mocks';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '@bb/order/common/constants';

const renderHandoffWithMockRoutes = () => {
  const order = generateOrderWithStatus('ProductionReady');

  render(
    <AppQueryClientProvider>
      <AppFeaturesProvider features={defaultFeatures.features}>
        <AppMockDataSubjectsProvider>
          <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
            <MockedAppDataProvider order={order}>
              <MemoryRouter initialEntries={[`/order/${order.id}/handoff`]}>
                <Routes>
                  <Route
                    path="/order/:orderId/handoff"
                    element={
                      <ConfirmHandoff timeoutMs={timeouts.UNIT_TEST_DEFAULT} />
                    }
                  />
                  <Route path="/attract" element={<h1>attract</h1>} />
                </Routes>
              </MemoryRouter>
            </MockedAppDataProvider>
          </AppGqlDataProvider>
        </AppMockDataSubjectsProvider>
      </AppFeaturesProvider>
    </AppQueryClientProvider>,
  );
};

describe('given <ConfirmHandoff/>', () => {
  describe('when it mounts', () => {
    it('renders the Confirm Handoff view', () => {
      renderHandoffWithMockRoutes();
      expect(
        screen.getByRole('heading', { name: /confirm: handoff/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when component timeout is reached', () => {
    it('navigates to Attract', async () => {
      renderHandoffWithMockRoutes();

      expect(
        await screen.findByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });
});
