import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../withProviders';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import {
  generateAnonymousUser,
  generateAppUserWithOrder,
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateOrderWithIdandStatus,
  generateWalkupUserWithOrder,
} from '../AppGqlDataProvider/helpers';
import { render, screen } from '@testing-library/react';

import { AppFeatures } from '@bb/common/providers/appFeaturesProvider/types';
import { AppModeProvider } from './AppModeProvider';
import { AppRouter } from '../../AppRouter';
import { mockExperimentalFeatures } from '@bb/common/providers/appFeaturesProvider/features.mocks';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

const renderAppModeProviderWithRoutes = (props: {
  orders: Order[];
  user?: User;
  features?: AppFeatures;
}) => {
  render(
    <UnitTestMockProviders features={props.features}>
      <MockedAppDataProviders orders={props.orders} user={props.user}>
        <AppModeProvider>
          <AppRouter />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

describe('given <AppModeProvider />', () => {
  describe('when no orders on the Kiosk have status DeliveryReady', () => {
    it('renders the Idle view', () => {
      renderAppModeProviderWithRoutes({
        orders: [generateOrderWithIdandStatus('o1', 'DeliveryPresented')],
      });

      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when 1 or more orders on the Kiosk have Production statuses AND direct delivery', () => {
    it('renders the Production view', () => {
      renderAppModeProviderWithRoutes({
        orders: [
          generateDirectDeliverOrderWithIdandStatusItemCount(
            'o1',
            'ProductionReady',
            1,
            'mock-producer-id',
          ),
        ],
        user: generateWalkupUserWithOrder('o1'),
        features: mockExperimentalFeatures.features,
      });

      expect(
        screen.getByRole('heading', { name: /We're on it!/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when 1 or more orders on the Kiosk have Production statuses AND a user is present & identified as an app user', () => {
    it('renders the Idle view', () => {
      renderAppModeProviderWithRoutes({
        orders: [generateOrderWithIdandStatus('o1', 'ProductionInProgress')],
        user: generateAppUserWithOrder('o1'),
        features: mockExperimentalFeatures.features,
      });

      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when 1 or more orders on the Kiosk have status DeliveryReady AND a user is NOT present', () => {
    it('renders the Attract view', () => {
      renderAppModeProviderWithRoutes({
        orders: [
          generateOrderWithIdandStatus('o1', 'DeliveryQueued'),
          generateOrderWithIdandStatus('o2', 'DeliveryReady'),
          generateOrderWithIdandStatus('o3', 'DeliveryQueued'),
        ],
      });

      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when 1 or more orders on the Kiosk have status DeliveryReady AND a user is present but not identified', () => {
    it('renders the Greet view', () => {
      renderAppModeProviderWithRoutes({
        orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')],
        user: generateAnonymousUser(),
      });

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when 1 or more orders on the Kiosk have status DeliveryReady AND a user is present & identified ', () => {
    it('renders the Deliver view', () => {
      renderAppModeProviderWithRoutes({
        orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')],
        user: generateAppUserWithOrder('o1'),
      });

      expect(
        screen.getByRole('heading', { name: /deliver/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when an order has status DeliveryQueued OR DeliveryInProgress OR DeliveryPresented AND a user is present & identified', () => {
    it('renders the Deliver view', () => {
      renderAppModeProviderWithRoutes({
        orders: [
          generateOrderWithIdandStatus('o1', 'ProductionInProgress'),
          mockOrder({
            order: generateOrderWithIdandStatus('o2', 'DeliveryInProgress'),
          })
            .updateFirstItemStatus({ status: 'DeliveryPresented' })
            .value(),
        ],
        user: generateAppUserWithOrder('o2'),
      });

      expect(
        screen.getByRole('heading', { name: /deliver/i }),
      ).toBeInTheDocument();
    });
  });
});
