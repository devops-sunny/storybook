import {
  AppDataProvider,
  AppDataProviderProps,
} from '../providers/AppDataProvider';
import { render, screen } from '@testing-library/react';

import { Announcer } from './Announcer';
import { AppMockDataProvider } from '../providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '../providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppModeProvider } from '../providers/AppModeProvider';
import { mockOrders } from '@bb/marquee/fixtures/mockData';

const renderWithProviders = (params: AppDataProviderProps) => {
  const { orders = [] } = params;
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider orders={orders} users={[]}>
          <AppModeProvider>
            <Announcer />
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('Given an <Announcer/> provided with No Orders with Status "Delivery Ready"', () => {
  describe('when it renders', () => {
    it('it DOES NOT show a snackbar', () => {
      renderWithProviders({
        orders: [...mockOrders.deliveryReady.none],
        users: [],
      });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});

describe('Given an <Announcer/> provided with one named Order with Status "Delivery Ready"', () => {
  describe('when it renders', () => {
    it('it shows a snackbar that matches the completed order', () => {
      renderWithProviders({
        orders: [...mockOrders.deliveryReady.one],
        users: [],
      });
      expect(screen.getByRole('alert')).toHaveTextContent(/Test Order Right/i);
    });
  });
});

describe('Given an <Announcer/> provided with two named Orders with Status "Delivery Ready"', () => {
  describe('when it renders', () => {
    it('it shows a snackbar for the just-completed order', () => {
      renderWithProviders({
        orders: [...mockOrders.deliveryReady.two],
        users: [],
      });
      expect(screen.getByRole('alert')).toHaveTextContent(/Test Order Left/i);
    });
  });
});

describe('Given an <Announcer/> provided with latest Order with Status "Delivery Ready" is un-named', () => {
  describe('when it renders', () => {
    it('it shows a snackbar "for Walk-up"', () => {
      renderWithProviders({
        orders: [...mockOrders.deliveryReady.three],
        users: [],
      });
      expect(screen.getByRole('alert')).toHaveTextContent(/Walk-up/i);
    });
  });
});
