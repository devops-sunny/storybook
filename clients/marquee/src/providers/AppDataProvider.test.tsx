import {
  AppDataProvider,
  useAppDataContext,
} from '../providers/AppDataProvider';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { render, screen } from '@testing-library/react';

import { AppMockDataProvider } from './AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from './AppMockDataProvider/AppMockDataSubjectsProvider';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockUser } from '@bb/common/fixtures/users/mockUser';

const mockOrders: Order[] = [mockOrder().value(), mockOrder().value()];
const mockUsers: User[] = [mockUser().value(), mockUser().value()];

const AppDataConsumer = () => {
  const { orders, users } = useAppDataContext();
  return (
    <>
      <strong>Orders</strong>
      <pre data-testid="orders">{JSON.stringify(orders)}</pre>
      <strong>Users</strong>
      <pre data-testid="users">{JSON.stringify(users)}</pre>
    </>
  );
};

const renderProvided = (orders: Order[], users: User[]) => {
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider orders={orders} users={users}>
          <AppDataConsumer />
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <AppDataProvider /> with orders and users', () => {
  describe('when it mounts', () => {
    it('it provides the orders', () => {
      renderProvided(mockOrders, mockUsers);
      expect(screen.getByTestId('orders')).toHaveTextContent(
        JSON.stringify(mockOrders),
      );
    });
    it('it provides the users', () => {
      renderProvided(mockOrders, mockUsers);
      expect(screen.getByTestId('users')).toHaveTextContent(
        JSON.stringify(mockUsers),
      );
    });
  });
});

describe('given <AppDataProvider /> with NO orders and NO users', () => {
  describe('when it mounts', () => {
    it('it provides an empty array of orders', () => {
      renderProvided([], []);
      expect(screen.getByTestId('orders')).toHaveTextContent('[]');
    });
    it('it provides an empty array of users', () => {
      renderProvided([], []);
      expect(screen.getByTestId('orders')).toHaveTextContent('[]');
    });
  });
});
