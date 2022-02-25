import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { SubMenu } from './SubMenu';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

const renderSubMenuWithMockRoutes = () => {
  const order = mockOrder().value();

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter
            initialEntries={[
              `/order/${order.id}/menu/menuA`,
              `/order/${order.id}/menu/4dd7b291-6813-4395-95fc-8d2fe82d23a9`,
            ]}
            initialIndex={1}>
            <Routes>
              <Route
                path="/order/:orderId/menu/:menuId"
                element={<SubMenu />}
              />
              <Route
                path="/order/:orderId/product/:productId"
                element={<h1>Order: Item Modification</h1>}
              />
              <Route
                path="/order/:orderId/menu/menuA"
                element={<h1>Full Menu</h1>}
              />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <SubMenu />', () => {
  describe('when it loads', () => {
    it('renders the Order: Sub menu default view', () => {
      renderSubMenuWithMockRoutes();
      expect(
        screen.getByText('Drink Group One', { exact: false }),
      ).toBeInTheDocument();
    });
  });

  describe('when user selects a product', () => {
    it('renders Order: Sub Menu w/ Size Popover', async () => {
      renderSubMenuWithMockRoutes();

      const menuItem = screen.getAllByTestId('menu-item-name')[0];
      fireEvent.click(menuItem!);

      expect(screen.getByText('12 oz')).toBeInTheDocument();
    });
  });

  describe('when user taps Back button in Sub Menu view', () => {
    it('navigates to Order: Full Menu', () => {
      renderSubMenuWithMockRoutes();
      fireEvent.click(screen.getByRole('button', { name: /back/i }));

      expect(
        screen.getByRole('heading', { name: /Full Menu/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <SubMenu /> with Popover visible', () => {
  describe('when user selects a product size', () => {
    it('navigates to Order: Item Modification', () => {
      renderSubMenuWithMockRoutes();
      const menuItem = screen.getAllByTestId('menu-item-name')[0];

      fireEvent.click(menuItem!);
      fireEvent.click(screen.getByText('12 oz'));

      expect(
        screen.getByRole('heading', { name: /Order: Item Modification/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user cancels size Popover', () => {
    it('renders Order: Sub Menu subview', () => {
      renderSubMenuWithMockRoutes();

      const menuItem = screen.getAllByTestId('menu-item-name')[0];
      fireEvent.click(menuItem!);

      expect(screen.getByText('12 oz')).toBeInTheDocument();

      fireEvent.click(document.body);

      waitFor(() => expect(screen.getByText('12 oz')).not.toBeInTheDocument());
    });
  });
});
