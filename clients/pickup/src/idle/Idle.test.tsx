import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../providers/withProviders';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import {
  defaultFeatures,
  mockExperimentalFeatures,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';
import {
  generateAppUserWithOrder,
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateOrderWithIdandStatus,
  generateWalkupUserWithOrder,
} from '../providers/AppGqlDataProvider/helpers';
import { render, screen } from '@testing-library/react';

import { AppFeatures } from '@bb/common/providers/appFeaturesProvider/types';
import { Idle } from './Idle';

function IdleViewTestRoutes() {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Idle:
      return <Idle />;
    case AppMode.Attract:
      return <h1>Attract</h1>;
    case AppMode.Delivery:
      return <h1>Delivery</h1>;
    case AppMode.Production:
      return <h1>Production</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderAppModeProviderWithRoutes = (props: {
  orders: Order[];
  user?: User;
  features?: AppFeatures;
}) => {
  const { features = defaultFeatures.features, ...rest } = props;
  render(
    <UnitTestMockProviders features={props.features}>
      <MockedAppDataProviders {...rest}>
        <AppModeProvider>
          <IdleViewTestRoutes />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

describe('given <Idle />', () => {
  describe('when app loads', () => {
    it('renders Idle as the default view', () => {
      renderAppModeProviderWithRoutes({
        orders: [],
      });

      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when an App Order completes production', () => {
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

  describe('when a Walk-up Order begins production', () => {
    it('renders the Production view', () => {
      renderAppModeProviderWithRoutes({
        orders: [
          generateDirectDeliverOrderWithIdandStatusItemCount(
            'o1',
            'ProductionReady',
            2,
            'mock-producer-id',
          ),
        ],
        user: generateWalkupUserWithOrder('o1'),
        features: mockExperimentalFeatures.features,
      });

      expect(
        screen.getByRole('heading', { name: /production/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a Walk-up Order completes production', () => {
    it('renders the Delivery view', () => {
      renderAppModeProviderWithRoutes({
        orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')],
        user: generateAppUserWithOrder('o1'),
      });

      expect(
        screen.getByRole('heading', { name: /delivery/i }),
      ).toBeInTheDocument();
    });
  });
});
