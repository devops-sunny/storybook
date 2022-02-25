import { Menu } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { menuItemImage } from './menuItemImage';
import { mockMenuItem } from './menuItem';

const mockSuggestMenuAlpha3: Menu = {
  id: 'c08a62eb-4393-45ba-8d9b-4bdf4ab1369a',
  name: 'alpha-3-demo-sub-menu-group-4',
  displayName: 'Drink Group Four',
  description:
    '10 words lorem ipsum for Suggest Menu: Donec viverra tempus dolor, id semper massa laoreet a. Sed.',
  image: menuItemImage._EMPTY_PLACEHOLDER,
  items: [mockMenuItem.COFFEE, mockMenuItem.CAPPUCCINO, mockMenuItem.LATTE],
};

export const mockSuggestMenu = {
  alpha3: mockSuggestMenuAlpha3,
};
