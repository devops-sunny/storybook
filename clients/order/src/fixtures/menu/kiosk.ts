import { mockMainMenu, shallowMockMainMenu } from './mainMenu';

import { Kiosk } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { mockSubMenu } from './subMenu';
import { mockSuggestMenu } from './suggestMenu';

export const mockKiosk: Kiosk = {
  id: '2fc703f7-f8f7-4ba3-a676-9e612b16a195',
  name: 'alpha-3-demo-kiosk',
  mainMenu: {
    id: shallowMockMainMenu.alpha3.id,
    name: shallowMockMainMenu.alpha3.name,
    items: shallowMockMainMenu.alpha3.items,
  },
  // suggestMenus: [],
};
