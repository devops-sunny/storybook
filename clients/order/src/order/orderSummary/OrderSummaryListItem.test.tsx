import { fireEvent, render, screen } from '@testing-library/react';

import { OrderSummaryListItem } from '@bb/order/order/orderSummary/OrderSummaryListItem';
import { getOrderSummaryItem } from '@bb/common/fixtures/orders/mockOrder/helpers/getOrderSummaryItem';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { modificationsView } from '@bb/common/fixtures/orderItem/modificationsView';
import { v4 as uuidv4 } from 'uuid';

const mockItemClick = jest.fn();
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
const orderSummaryItem = getOrderSummaryItem({ orderItem: order.items[0]! });

const renderOrderSummaryListItem = () => {
  render(
    <OrderSummaryListItem
      orderSummaryItem={orderSummaryItem}
      onClickEdit={mockItemClick()}
    />,
  );
};

describe('given <OrderSummaryListItem /> with required props', () => {
  describe('when it mounts', () => {
    it('renders the provided image', () => {
      renderOrderSummaryListItem();
      const avatar = screen.getByAltText(/product-image/i);
      expect(avatar).toHaveAttribute('src', orderSummaryItem.productImageUrl);
    });

    it('renders the provided product display name', () => {
      renderOrderSummaryListItem();
      expect(
        screen.getByText(orderSummaryItem.productDisplayName),
      ).toBeInTheDocument();
    });

    it('renders the provided size display name', () => {
      renderOrderSummaryListItem();
      expect(
        screen.getByText(orderSummaryItem.sizeDisplayName),
      ).toBeInTheDocument();
    });

    it('renders the subtotal for all items', () => {
      renderOrderSummaryListItem();
      expect(screen.getByText('$2.50')).toBeInTheDocument();
    });

    it('renders all of the provided modifications', () => {
      renderOrderSummaryListItem();
      expect(screen.getAllByTestId('order-summary-list-item-mod').length).toBe(
        orderSummaryItem.modifications.length,
      );
    });

    it('renders an Edit button', () => {
      renderOrderSummaryListItem();
      const editButton = screen.getByRole('button', { name: /Edit/i });
      fireEvent.click(editButton!);

      expect(mockItemClick).toHaveBeenCalled();
    });
  });
});
