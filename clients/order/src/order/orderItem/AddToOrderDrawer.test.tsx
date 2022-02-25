import { screen, waitFor } from '@testing-library/react';

import { AddToOrderDrawer } from './AddToOrderDrawer';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';

const mockClickOrderAnother = jest.fn();
const mockClickCheckout = jest.fn();

const CONFIRMATION_MSG =
  'Got it! #orderItemName# was added to your order. What would you like to do next?';
const ORDER_ITEM_NAME = 'Soy Latte with Caramel, Light Mocha, and extra shot';

const defaultProps = {
  confirmationCopy: CONFIRMATION_MSG,
  orderItemName: ORDER_ITEM_NAME,
  onClickOrderAnother: mockClickOrderAnother,
  onClickCheckout: mockClickCheckout,
  loading: false,
};

describe('given <AddToOrderDrawer /> with required props and open=true', () => {
  describe('when it mounts', () => {
    it('shows the drawer', () => {
      <AddToOrderDrawer {...defaultProps} open={true} />;

      waitFor(() =>
        expect(screen.getByTestId('add-to-order-drawer')).toBeInTheDocument(),
      );
    });

    it('it renders the provided confirmation copy', () => {
      <AddToOrderDrawer {...defaultProps} open={true} />;

      waitFor(() =>
        expect(
          screen.getByText(
            CONFIRMATION_MSG.replace('#orderItemName#', ORDER_ITEM_NAME),
          ),
        ).toBeInTheDocument(),
      );
    });

    it('it renders the provided order item name', () => {
      <AddToOrderDrawer {...defaultProps} open={true} />;

      waitFor(() =>
        expect(screen.getByText(ORDER_ITEM_NAME)).toBeInTheDocument(),
      );
    });
  });
});

describe('given <AddToOrderDrawer /> with required props and open=false', () => {
  describe('when it mounts', () => {
    it('does NOT show the drawer', () => {
      <AddToOrderDrawer {...defaultProps} open={false} />;

      waitFor(() =>
        expect(
          screen.getByTestId('add-to-order-drawer'),
        ).not.toBeInTheDocument(),
      );
    });
  });
});

describe('given <AddToOrderDrawer /> with optional props and loading', () => {
  describe('when it mounts', () => {
    it('renders a skeleton element', () => {
      <AddToOrderDrawer {...defaultProps} open={true} />;

      waitFor(() =>
        expect(screen.getByTestId('add-to-order-skeleton')).toBeInTheDocument(),
      );
    });
  });
});
