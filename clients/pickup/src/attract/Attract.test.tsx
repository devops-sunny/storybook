import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../providers/withProviders';
import { fireEvent, render, screen } from '@testing-library/react';

import { Attract } from './Attract';
import { generateOrderWithIdandStatus } from '../providers/AppGqlDataProvider/helpers';

function AttractViewMockRoutes() {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Greet:
      return <h1>Greet</h1>;
    case AppMode.Idle:
      return <h1>Idle</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderAttractViewWithMockRoutes = () => {
  render(
    <UnitTestMockProviders>
      <MockedAppDataProviders
        orders={[generateOrderWithIdandStatus('o1', 'DeliveryReady')]}>
        <AppModeProvider>
          <AttractViewMockRoutes />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

describe('given <Attract />', () => {
  describe('when a view loads', () => {
    it('renders the Attract view', () => {
      renderAttractViewWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps', () => {
    it('renders the Greet view', () => {
      renderAttractViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', { name: /user taps on screen/i }),
      );

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user is sensed in proximity', () => {
    it('renders the Greet view', () => {
      renderAttractViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', { name: /user is sensed in proximity/i }),
      );

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when all orders have status updated to delivered', () => {
    it('renders the Idle view', () => {
      renderAttractViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', { name: /order is delivered elsewhere/i }),
      );

      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
  });
});
