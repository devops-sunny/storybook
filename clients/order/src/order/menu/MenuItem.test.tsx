import { MenuItem, MenuItemProps } from './MenuItem';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { menuItemImage } from '@bb/order/fixtures/menu/menuItemImage';

const mockClickHandler = jest.fn();

const defaultProps: MenuItemProps = {
  id: menuItemImage.AMERICANO.id,
  imageUrl: menuItemImage.AMERICANO.sourceUrl,
  name: menuItemImage.AMERICANO.name,
  accessibleName: menuItemImage.AMERICANO.accessibleName,
  onClick: mockClickHandler,
};

describe('given <MenuItem /> with required props', () => {
  describe('when it mounts', () => {
    it('renders the provided image', () => {
      render(<MenuItem {...defaultProps} />);

      const menuItemImgEl = screen.getByRole('img');
      expect(menuItemImgEl).toHaveAttribute(
        'src',
        menuItemImage.AMERICANO.sourceUrl,
      );
      expect(screen.getByTestId('menu-item-name')).toHaveTextContent(
        menuItemImage.AMERICANO.name,
      );
    });
  });

  describe('when it is clicked', () => {
    it('calls the provided click handler', () => {
      render(<MenuItem {...defaultProps} />);

      const menuItemImgEl = screen.getByRole('img');
      fireEvent.click(menuItemImgEl);
      expect(mockClickHandler).toBeCalledTimes(1);
    });
  });
});

describe('given <MenuItem /> with optional props', () => {
  describe('when it mounts', () => {
    it('it provides accessible text with the provided accessible name', () => {
      render(<MenuItem {...defaultProps} imageUrl="broken" />);

      waitFor(() =>
        expect(
          screen.getByText(menuItemImage.AMERICANO.accessibleName),
        ).toBeInTheDocument(),
      );
    });
  });
});
