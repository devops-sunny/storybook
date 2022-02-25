import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  defaultFeatures,
  mockExperimentalFeatures,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeatures } from '@bb/common/providers/appFeaturesProvider/types';
import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { AppQueryClientProvider } from '@bb/common';
import { ConfirmPayment } from './ConfirmPayment';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';

const renderWithMockRoutes = (features: AppFeatures) => {
  const order = generateOrderWithStatus('ProductionReady');

  render(
    <AppQueryClientProvider>
      <AppFeaturesProvider features={features}>
        <AppMockDataSubjectsProvider>
          <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
            <MockedAppDataProvider order={order}>
              <MemoryRouter initialEntries={[`/order/${order.id}/payment`]}>
                <Routes>
                  <Route
                    path="/order/:orderId/payment"
                    element={<ConfirmPayment timeoutMs={50} />}
                  />
                  <Route
                    path="/order/:orderId/summary"
                    element={<h1>confirm: order summary</h1>}
                  />
                  <Route
                    path="/order/:orderId/wait"
                    element={<h1>wait: here</h1>}
                  />
                  <Route
                    path="/order/:orderId/handoff"
                    element={<h1>confirm: handoff</h1>}
                  />
                </Routes>
              </MemoryRouter>
            </MockedAppDataProvider>
          </AppGqlDataProvider>
        </AppMockDataSubjectsProvider>
      </AppFeaturesProvider>
    </AppQueryClientProvider>,
  );
};

const setupPaymentProcessing = (features: AppFeatures) => {
  renderWithMockRoutes(features);
  fireEvent.click(
    screen.getByRole('button', {
      name: /user pays by inserting card in terminal/i,
    }),
  );
};

const setupPaymentSuccess = async (features: AppFeatures) => {
  // we need to async...await testing library selectors on any behavior that triggers GQL query updates
  // see Kent C Dodds for reference: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warningz
  setupPaymentProcessing(features);
  fireEvent.click(
    await screen.findByRole('button', {
      name: /payment request returns success/i,
    }),
  );
};

describe('given <ConfirmPayment/>', () => {
  describe('when it mounts', () => {
    it('renders the Confirm Payment view', () => {
      renderWithMockRoutes(defaultFeatures.features);

      expect(
        screen.getByRole('heading', { name: /confirm: payment/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user pays by inserting card in terminal', () => {
    it('renders Confirm: Payment Processing', () => {
      renderWithMockRoutes(defaultFeatures.features);
      fireEvent.click(
        screen.getByRole('button', {
          name: /user pays by inserting card in terminal/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /confirm: payment processing/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user pays by tapping mobile NFC on terminal', () => {
    it('renders Confirm: Payment Processing', () => {
      renderWithMockRoutes(defaultFeatures.features);
      fireEvent.click(
        screen.getByRole('button', {
          name: /user pays by tapping mobile NFC/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /confirm: payment processing/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user taps cancel', () => {
    it('navigates to confirm: summary', () => {
      renderWithMockRoutes(defaultFeatures.features);
      fireEvent.click(
        screen.getByRole('button', { name: /user taps Cancel/i }),
      );

      expect(
        screen.getByRole('heading', { name: /confirm: order summary/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <ConfirmPayment/> in Payment Processing state', () => {
  describe('when payment request returns success', () => {
    it('renders Payment Success', () => {
      // I cannot resolve the act() warning due to the produceOrder mutation
      setupPaymentProcessing(defaultFeatures.features);
      act(() => {
        fireEvent.click(
          screen.getByRole('button', {
            name: /payment request returns success/i,
          }),
        );
      });

      expect(
        screen.getByRole('heading', { name: /confirm: payment success/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <ConfirmPayment/> in Payment Success state provided with default features', () => {
  describe('when timeout expires', () => {
    it('navigates to Wait: Here', async () => {
      setupPaymentProcessing(defaultFeatures.features);
      fireEvent.click(
        screen.getByRole('button', {
          name: /payment request returns success/i,
        }),
      );

      expect(
        await screen.findByRole('heading', { name: /wait: here/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <ConfirmPayment/> in Payment Success state provided with experimental features', () => {
  describe('when timeout expires', () => {
    it('navigates to Confirm: Handoff', async () => {
      setupPaymentProcessing(mockExperimentalFeatures.features);
      fireEvent.click(
        screen.getByRole('button', {
          name: /payment request returns success/i,
        }),
      );

      expect(
        await screen.findByRole('heading', { name: /confirm: handoff/i }),
      ).toBeInTheDocument();
    });
  });
});
