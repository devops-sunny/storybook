import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { FullMenu } from './FullMenu';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { mockKiosk } from '@bb/order/fixtures/menu/kiosk';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

const renderFullMenuWithMockRoutes = () => {
  const order = mockOrder().value();

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/menu/menuB`]}>
            <Routes>
              <Route path="/order/:orderId/menu/menuB" element={<FullMenu />} />
              {mockKiosk?.mainMenu.items.map((item) => (
                <Route
                  key={item.id}
                  path={`/order/:orderId/menu/${item.id}`}
                  element={<h1>Order: Sub Menu</h1>}
                />
              ))}
              <Route path="/attract" element={<h1>attract</h1>} />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <FullMenu />', () => {
  describe('when it mounts', () => {
    it('renders the Order: Full Menu view', () => {
      renderFullMenuWithMockRoutes();
      expect(screen.getByText(/Main Menu/i)).toBeInTheDocument();
    });
  });

  describe('when user selects a sub-menu', () => {
    it('navigates to Order: Sub Menu', () => {
      renderFullMenuWithMockRoutes();

      const menuItem = screen.getAllByTestId('menu-item-name')[0];
      if (menuItem) {
        fireEvent.click(menuItem);
      }

      expect(
        screen.getByRole('heading', { name: /Order: Sub Menu/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user taps Back button', () => {
    it('navigates to Attract', () => {
      renderFullMenuWithMockRoutes();
      fireEvent.click(screen.getByRole('button', { name: /back/i }));

      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });
});
