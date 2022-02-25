import { fireEvent, render, screen } from '@testing-library/react';

import { MenuItemPopover } from './MenuItemPopover';
import { mockMenuItemProductSize } from '@bb/order/fixtures/menu/menuItemProductSize';

const mockClickHandler = jest.fn();

const renderMenuItemPopover = () => {
  render(
    <MenuItemPopover
      productSizes={mockMenuItemProductSize.ALMOND_MILK_LATTE}
      onClick={mockClickHandler}
    />,
  );
};

describe('given <MenuItemPopover /> ', () => {
  describe('when it mounts', () => {
    it('it renders the provided number of buttons', () => {
      renderMenuItemPopover();

      const productSizeButtons = screen.getAllByRole('button');
      expect(productSizeButtons.length).toBe(
        mockMenuItemProductSize.ALMOND_MILK_LATTE.length,
      );
    });

    it('it renders the provided displayName in each button', () => {
      renderMenuItemPopover();

      const productSizeButtons = screen.getAllByRole('button');
      productSizeButtons.forEach((btn, i) => {
        expect(btn.textContent).toContain(
          mockMenuItemProductSize.ALMOND_MILK_LATTE[i]?.displayName,
        );
      });
    });

    it('it renders the provided price appropriately for locale', () => {
      renderMenuItemPopover();

      expect(screen.getByText('$2.50')).toBeInTheDocument();
    });
  });

  describe('MenuItemPopover when a button is clicked', () => {
    renderMenuItemPopover();

    const sizeBtn = screen.getByRole('button', { name: /Small 12 oz/ });
    fireEvent.click(sizeBtn);

    expect(mockClickHandler).toHaveBeenCalledWith(
      mockMenuItemProductSize.ALMOND_MILK_LATTE[0],
    );
  });
});
