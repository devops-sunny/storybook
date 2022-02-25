import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { OrderSuggestMenu } from './OrderSuggestMenu';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';

const renderOrderSuggestMenuWithMockRoutes = () => {
  const order = mockOrder().value();

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/menu/menuA`]}>
            <Routes>
              <Route
                path="/order/:orderId/menu/menuA"
                element={<OrderSuggestMenu />}
              />
              <Route
                path="/order/:orderId/product/:productVariationId"
                element={<h1>order item modification</h1>}
              />
              <Route
                path="/order/:orderId/menu/menuB"
                element={<h1>order full menu</h1>}
              />
              <Route path="/approach" element={<h1>approach</h1>} />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <OrderSuggestMenu/>', () => {
  describe('when it mounts', () => {
    it('renders the Order Menu Suggest view', () => {
      renderOrderSuggestMenuWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /Order: Menu Suggest/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user selects a suggested product', () => {
    it('renders the Order: Menu Suggest w/ Size Popover view skeleton', () => {
      renderOrderSuggestMenuWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', {
          name: /user selects suggested product/i,
        }),
      );

      expect(
        screen.getByRole('heading', {
          name: 'Order: Menu Suggest w/ Size Popover',
        }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user touches full menu button', () => {
    it('navigates to order full menu', () => {
      renderOrderSuggestMenuWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', {
          name: /user touches a full menu button/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /order full menu/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user taps Back button', () => {
    it('navigates to approach', () => {
      renderOrderSuggestMenuWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: /user taps Back button/i }),
      );

      expect(
        screen.getByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <OrderSuggestMenu/> in popover state', () => {
  beforeEach(() => {
    renderOrderSuggestMenuWithMockRoutes();
    fireEvent.click(
      screen.getByRole('button', {
        name: /user selects suggested product/i,
      }),
    );
  });

  describe('when a user selects a product with size', () => {
    it('navigates to order item modification', () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: /user selects a product with size/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /order item modification/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user taps outside the size popover', () => {
    it('renders the Order: Menu Suggest view skeleton', () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: /user taps outside size popover/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: 'Order: Menu Suggest' }),
      ).toBeInTheDocument();
    });
  });
});
