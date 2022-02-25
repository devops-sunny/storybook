import { fireEvent, render, screen } from '@testing-library/react';

import { MenuList } from './MenuList';
import { menuItemImage } from '@bb/order/fixtures/menu/menuItemImage';

const mockItemClick = jest.fn();
const menuItems = [
  menuItemImage.ALMOND_MILK_LATTE,
  menuItemImage.AMERICANO,
  menuItemImage.ICED_LATTE,
  menuItemImage.HOT_CHOCOLATE,
  menuItemImage.SKINNY_HOT_CHOCOLATE,
];

const renderMenuList = () => {
  render(
    <MenuList
      description="Main Menu"
      items={menuItems.map((menuImg) => ({
        id: menuImg.id,
        name: menuImg.name,
        displayName: menuImg.name,
        image: menuImg,
        description: '',
      }))}
      renderItem={(props) => (
        <div
          data-testid="menu-item-component"
          onClick={(e) => props.onClick(props.id, e)}></div>
      )}
      onItemClick={mockItemClick}
    />,
  );
};

describe('given <MenuList /> with required props', () => {
  describe('when it mounts', () => {
    it('it renders the provided description', () => {
      renderMenuList();

      expect(screen.getByText(/Main Menu/i)).toBeInTheDocument();
    });

    it('it renders the provided renderItem', () => {
      renderMenuList();

      expect(
        screen.getAllByTestId('menu-item-component')[0],
      ).toBeInTheDocument();
    });

    it('it renders one renderItem per provided items', () => {
      renderMenuList();

      expect(screen.getAllByTestId('menu-item-component').length).toBe(
        menuItems.length,
      );
    });
  });

  describe('when a menu item is clicked', () => {
    it('calls the provided function with the relevant ID', () => {
      renderMenuList();
      const firstMenuItem = screen.getAllByTestId('menu-item-component')[0];
      fireEvent.click(firstMenuItem!);

      expect(mockItemClick).toHaveBeenCalled();
      expect(mockItemClick).toHaveBeenCalledWith(
        '8365e90b-beb4-4ed5-9f1b-212ae234d275',
        expect.objectContaining({
          type: 'click',
        }),
      );
    });
  });
});
