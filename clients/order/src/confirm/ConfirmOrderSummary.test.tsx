import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '../providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { ConfirmOrderSummary } from './ConfirmOrderSummary';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';

const renderConfirmOrderSummaryWithMockRoutes = () => {
  const order = generateOrderWithStatus('ProductionReady');

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/summary`]}>
            <Routes>
              <Route
                path="/order/:orderId/summary"
                element={<ConfirmOrderSummary />}
              />
              <Route
                path="/order/:orderId/payment"
                element={<h1>confirm payment</h1>}
              />
              <Route
                path="/order/:orderId/menu/menuB"
                element={<h1>order full menu</h1>}
              />
              <Route
                path="/order/:orderId/order-item/:orderItemId"
                element={<h1>order item modification</h1>}
              />
              <Route path="/approach" element={<h1>approach</h1>} />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <ConfirmOrderSummary/>', () => {
  describe('when it mounts', () => {
    it('renders the Confirm Order Summary view', () => {
      renderConfirmOrderSummaryWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /Confirm: Order Summary/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps confirm and pay', () => {
    it('navigates to confirm payment', () => {
      renderConfirmOrderSummaryWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: /user taps confirm and pay/i }),
      );

      expect(
        screen.getByRole('heading', { name: /confirm payment/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps back', () => {
    it('navigates to order full menu', () => {
      renderConfirmOrderSummaryWithMockRoutes();
      fireEvent.click(screen.getByRole('button', { name: /user taps back/i }));

      expect(
        screen.getByRole('heading', { name: /order full menu/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps edit item', () => {
    it('navigates to order item modification', () => {
      renderConfirmOrderSummaryWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', {
          name: /user taps edit item/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /order item modification/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps cancel', () => {
    it('navigates to approach', () => {
      renderConfirmOrderSummaryWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: /user taps cancel/i }),
      );

      expect(
        screen.getByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });
});
