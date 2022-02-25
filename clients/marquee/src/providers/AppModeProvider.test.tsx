import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { render, screen } from '@testing-library/react';

import { AppDataProvider } from '../providers/AppDataProvider';
import { AppMockDataProvider } from './AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from './AppMockDataProvider/AppMockDataSubjectsProvider';
import { OrderItemStatus } from '../generated/graph';
import { generateAnonymousUser } from '@bb/pickup/providers/AppGqlDataProvider/helpers';

const mockOrders = [
  { id: 'foo', status: [OrderItemStatus.Validation] },
  { id: 'fizz', status: [OrderItemStatus.Validation] },
];
const mockUsers = [generateAnonymousUser(), generateAnonymousUser()];

const AppModeConsumer = () => {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Attract:
      return <h1>Attract</h1>;
    case AppMode.Approach:
      return <h1>Approach</h1>;
  }
};

const renderProvided = (orders?: Order[], users?: User[]) => {
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider orders={orders || []} users={users || []}>
          <AppModeProvider>
            <AppModeConsumer />
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <AppModeProvider /> with users', () => {
  describe('when it mounts', () => {
    it('it provides the Approach mode', () => {
      renderProvided([], mockUsers);
      expect(
        screen.getByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <AppModeProvider /> with NO users', () => {
  describe('when it mounts', () => {
    it('it provides the Attract mode', () => {
      renderProvided([], []);
      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });
});
