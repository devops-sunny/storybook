import {
  AppDataProvider,
  AppDataProviderProps,
} from '../../providers/AppDataProvider';
import {
  mockOrders,
  mockProducers,
  mockUsers,
} from '@bb/marquee/fixtures/mockData';
import { render, screen } from '@testing-library/react';

import { AppMockDataProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppModeProvider } from '../../providers/AppModeProvider';
import { PickupAvailability } from './PickupAvailability';

const renderWithProviders = (params: AppDataProviderProps) => {
  const { orders = [], users = [], producers = mockProducers } = params;
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider orders={orders} users={users} producers={producers}>
          <AppModeProvider>
            <PickupAvailability />
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <PickupAvailability /> with provided kiosk state', () => {
  describe('when the kiosk has NO orders with status DeliveryReady AND NO identified users on either side', () => {
    it('renders two PickupStatus-es with Idle', () => {
      renderWithProviders({ orders: [], users: [] });
      expect(screen.getAllByRole('heading', { name: /idle/i })).toHaveLength(2);
    });
  });

  describe('when the kiosk has one or more orders with status DeliveryReady AND NO identified users on either side', () => {
    it('renders two PickupStatus-es with Available', () => {
      renderWithProviders({
        orders: mockOrders.deliveryReady.two,
        users: [],
      });
      expect(
        screen.getAllByRole('heading', { name: /available/i }),
      ).toHaveLength(2);
    });
  });

  describe('when the kiosk is delivering to an identified user on the left AND NO identified user on right', () => {
    it('renders left PickupStatus with Engaged with the appropriate Order Name', () => {
      renderWithProviders({
        orders: mockOrders.deliveryQueued.two,
        users: mockUsers.identified.one.left,
      });
      const statuses = screen.getAllByRole('heading', { name: /engaged/i });
      expect(statuses).toHaveLength(1);
      expect(statuses[0]).toHaveTextContent(/test order left/i);
    });
  });

  describe('when the kiosk has NO identified user on the left AND is delivering to an identified user on right', () => {
    it('renders right PickupStatus with Engaged with the appropriate Order Name', () => {
      renderWithProviders({
        orders: mockOrders.deliveryQueued.two,
        users: mockUsers.identified.one.right,
      });
      const statuses = screen.getAllByRole('heading', { name: /engaged/i });
      expect(statuses).toHaveLength(1);
      expect(statuses[0]).toHaveTextContent(/test order right/i);
    });
  });

  describe('when the kiosk has NO Orders with status DeliveryReady AND Identified User on Left', () => {
    it('renders left PickupStatus with Engaged with NO Order Name and right Idle', () => {
      renderWithProviders({
        orders: mockOrders.deliveryReady.none,
        users: mockUsers.identified.one.left,
      });
      expect(screen.getAllByRole('heading', { name: /engaged/i })).toHaveLength(
        1,
      );
      expect(screen.getAllByRole('heading', { name: /idle/i })).toHaveLength(1);
    });
  });

  describe('when the kiosk has NO Orders with status DeliveryReady AND Identified User on Right', () => {
    it('renders right PickupStatus with Engaged with NO Order Name and left Idle', () => {
      renderWithProviders({
        orders: mockOrders.deliveryReady.none,
        users: mockUsers.identified.one.right,
      });
      expect(screen.getAllByRole('heading', { name: /engaged/i })).toHaveLength(
        1,
      );
      expect(screen.getAllByRole('heading', { name: /idle/i })).toHaveLength(1);
    });
  });
});
