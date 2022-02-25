import {
  defaultFeatures,
  mockExperimentalFeatures,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';
import { render, screen } from '@testing-library/react';

import { AppDataProvider } from './providers/AppDataProvider';
import { AppFeatures } from '@bb/common/providers/appFeaturesProvider/types';
import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppMockDataProvider } from './providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from './providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppQueryClientProvider } from '@bb/common';
import { MarqueeAppContent } from './AppContent';
import { mockOrders } from './fixtures/mockData';

const renderWithProviders = (options: { features: AppFeatures }) => {
  render(
    <AppQueryClientProvider>
      <AppMockDataSubjectsProvider>
        <AppMockDataProvider>
          <AppFeaturesProvider features={options.features}>
            <AppDataProvider
              orders={[...mockOrders.deliveryReady.one]}
              users={[]}>
              <MarqueeAppContent />
            </AppDataProvider>
          </AppFeaturesProvider>
        </AppMockDataProvider>
      </AppMockDataSubjectsProvider>
    </AppQueryClientProvider>,
  );
};

describe('Given <App> provided with an order with status "delivery ready"', () => {
  describe('when provided with default features', () => {
    it('renders pickup availability', () => {
      renderWithProviders({
        features: defaultFeatures.features,
      });
      expect(screen.queryAllByTestId('pickup-status')[0]).toBeInTheDocument();
    });
    it('renders an announcement of an order ready', () => {
      renderWithProviders({
        features: defaultFeatures.features,
      });
      // match hidden because, although present, the announcement hasn't animated in yet.
      expect(screen.getByRole('alert', { hidden: true })).toHaveTextContent(
        /Order Ready/i,
      );
    });
  });

  describe('when provided with experimental features', () => {
    it('DOES NOT render pickup availability', () => {
      renderWithProviders({
        features: mockExperimentalFeatures.features,
      });
      expect(screen.queryByTestId('pickup-status')).not.toBeInTheDocument();
    });
    it('DOES NOT render an announcement of an order ready', () => {
      renderWithProviders({
        features: mockExperimentalFeatures.features,
      });
      expect(
        screen.queryByRole('alert', { hidden: true }),
      ).not.toBeInTheDocument();
    });
  });
});
