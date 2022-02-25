import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { MockedAppDataProvider } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { OrderItemModification } from './OrderItemModification';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';

const renderOrderItemModificationWithMockRoutes = () => {
  const order = generateOrderWithStatus('Configuration');

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter
            initialEntries={[
              `/order/${order.id}/menu/menuC`,
              `/order/${order.id}/product/a953ef9c-9cc1-4c02-b928-b193fb8c08b6`,
            ]}
            initialIndex={1}>
            <Routes>
              <Route
                path="/order/:orderId/product/:productVariationId"
                element={<OrderItemModification />}
              />
              <Route
                path="/order/:orderId/summary"
                element={<h1>Confirm: Order Summary</h1>}
              />
              <Route
                path="/order/:orderId/menu/menuB"
                element={<h1>Order: Full Menu</h1>}
              />
              <Route
                path="/order/:orderId/menu/menuC"
                element={<h1>Order: Sub Menu</h1>}
              />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <OrderItemModification />', () => {
  describe('when it mounts', () => {
    it.todo('renders the hero image for the provided Product Variation');
    it.todo('renders the display name for the provided Product Variation');
    it.todo('renders the description for the provided Product Variation');
    it.todo('renders the price for the provided Product Variation');
    it.todo('renders the calories for the provided Product Variation');
    it.todo('renders a Back to Menu button');
    it.todo('renders a Cancel Order button');
    it.todo('renders an Add to Order button');
  });

  describe('when Add to Order is clicked', () => {
    it.todo('shows the AddToOrderDrawer');
    it.todo("shows a confirmation message with the Order Item's display name");
    it.todo('shows an Order Another Drink butotn');
    it.todo('shows a Go To Checkout Button');
  });

  describe('when Order Another Drink is clicked', () => {
    it.todo('navigates to /order/:orderId/menu/{mainMenuId}');
  });

  describe('when Go To Checkout is clicked', () => {
    it.todo('navigates to /order/:orderId/summary');
  });

  describe('when Back to Menu is clicked:', () => {
    it.todo('navigates to /order/:orderId/menu/{mainMenuId}');
  });

  describe('when Cancel Order is clicked:', () => {
    it.todo('navigates to /attract');
  });
});
