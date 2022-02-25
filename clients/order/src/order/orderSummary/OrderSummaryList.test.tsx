import { fireEvent, render, screen } from '@testing-library/react';

import { OrderSummaryList } from './OrderSummaryList';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { modificationsView } from '@bb/common/fixtures/orderItem/modificationsView';
import { v4 as uuidv4 } from 'uuid';

const mockItemClick = jest.fn();
const emptyOrder = mockOrder().value();
const order = {
  ...mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: 'd95b2e36-21c8-47c7-b35c-57de1e846ab3',
          name: 'americano|12-oz',
        },
        modifications: modificationsView.TWO_MODIFICATIONS as any,
      },
    })
    .value(),
};
const renderUndefinedOrderSummaryList = () => {
  render(
    <OrderSummaryList
      order={undefined}
      onClickEditItem={mockItemClick}
      onClickCancelOrder={mockItemClick}
      onClickConfirmAndPay={mockItemClick}
    />,
  );
};

const renderEmptyOrderSummaryList = () => {
  render(
    <OrderSummaryList
      order={emptyOrder}
      onClickEditItem={mockItemClick}
      onClickCancelOrder={mockItemClick}
      onClickConfirmAndPay={mockItemClick}
    />,
  );
};

const renderOrderSummaryList = () => {
  render(
    <OrderSummaryList
      order={order}
      onClickEditItem={mockItemClick}
      onClickCancelOrder={mockItemClick}
      onClickConfirmAndPay={mockItemClick}
    />,
  );
};

describe('given <OrderSummaryList /> with required props and an order with items', () => {
  describe('when it mounts', () => {
    it('renders a localized Sub Total Price that is the sum of Order Item prices', () => {
      renderOrderSummaryList();
      // @TODO
      const totalEl = document.getElementById('order-total');
      expect(totalEl).toBeInTheDocument();
      //TODO - compare total values
    });

    it('renders an OrderSummaryListItem for each Order Item', () => {
      renderOrderSummaryList();
      expect(screen.getAllByTestId('order-summary-list-item').length).toBe(
        order.items.length,
      );
    });

    it('renders a Cancel Order button that when clicked calls the provided function', () => {
      renderOrderSummaryList();
      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      fireEvent.click(cancelButton!);

      expect(mockItemClick).toHaveBeenCalled();
    });

    it('renders a Confirm and Pay button that when clicked calls the provided function', () => {
      renderOrderSummaryList();
      const confirmButton = screen.getByRole('button', {
        name: /Confirm and Pay/i,
      });
      fireEvent.click(confirmButton!);

      expect(mockItemClick).toHaveBeenCalled();
    });
  });
});

describe('Given <OrderSummaryList> with an undefined order', () => {
  describe('when it mounts', () => {
    it('it renders "loading…', () => {
      renderUndefinedOrderSummaryList();
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
    it('renders a disabled Cancel button', () => {
      renderUndefinedOrderSummaryList();
      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      expect(cancelButton).toBeDisabled();
    });
    it('renders a disabled Confirm and Pay button', () => {
      renderUndefinedOrderSummaryList();
      const confirmButton = screen.getByRole('button', {
        name: /Confirm and Pay/i,
      });
      expect(confirmButton).toBeDisabled();
    });
  });
});

describe('Given <OrderSummaryList> with an empty order', () => {
  describe('when it mounts', () => {
    it('it renders "no items yet…', () => {
      renderEmptyOrderSummaryList();
      expect(screen.getByText(/no items yet/i)).toBeInTheDocument();
    });
    it('renders a disabled Cancel button', () => {
      renderEmptyOrderSummaryList();
      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      expect(cancelButton).toBeDisabled();
    });
    it('renders a disabled Confirm and Pay button', () => {
      renderEmptyOrderSummaryList();
      const confirmButton = screen.getByRole('button', {
        name: /Confirm and Pay/i,
      });
      expect(confirmButton).toBeDisabled();
    });
  });
});
