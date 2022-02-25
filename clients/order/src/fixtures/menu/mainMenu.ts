import { mockSubMenu, mockSubMenuItem, shallowMockSubMenu } from './subMenu';

import { Menu } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { menuItemImage } from './menuItemImage';

export const mockMainMenuAlpha3: Menu = {
  id: 'ebdd68a0-0202-4996-bb60-8a34e1bef310',
  name: 'alpha-3-demo-kiosk-main-menu',
  items: [
    mockSubMenuItem.groupOne,
    mockSubMenuItem.groupTwo,
    mockSubMenuItem.groupThree,
    mockSubMenuItem.groupFour,
  ],
  displayName: "Today's Menu",
  description:
    '20 words Lorem Ipsum for Main Menu: Cras dapibus suscipit diam ac efficitur. Etiam imperdiet augue ut ligula luctus, at faucibus dui sagittis. Interdum et malesuada fames.',
  image: menuItemImage._EMPTY_PLACEHOLDER,
};

export const mockMainMenu = {
  alpha3: mockMainMenuAlpha3,
};

export const shallowMockMainMenu = {
  alpha3: {
    ...mockMainMenuAlpha3,
    items: [
      shallowMockSubMenu.groupOne,
      shallowMockSubMenu.groupTwo,
      shallowMockSubMenu.groupThree,
      shallowMockSubMenu.groupFour,
    ],
  },
};
