import { Menu, SubMenu } from '@bb/common/types/tmpTypes/menuEntityTypes';

import { menuItemImage } from './menuItemImage';
import { mockMenuItem } from './menuItem';
import { mockMenuItemProduct } from './menuItemProduct';

const mockSubMenuGroupOne: SubMenu = {
  id: '4dd7b291-6813-4395-95fc-8d2fe82d23a9',
  name: 'alpha-3-demo-sub-menu-group-1',
  displayName: 'Drink Group One',
  description:
    '20 words lorem ipsum for Drink Group One: Morbi pretium nulla at arcu rhoncus, vel faucibus tellus imperdiet. Nam nisi enim, vulputate a arcu nec, convallis posuere lorem.',
  image: menuItemImage.CAPPUCCINO,
};
const mockMenuGroupOne: Menu = {
  ...mockSubMenuGroupOne,
  items: [
    mockMenuItem.AMERICANO,
    mockMenuItem.CAPPUCCINO,
    mockMenuItem.ESPRESSO,
    mockMenuItem.MOCHA_MACCHIATO,
    mockMenuItem.HOT_CHOCOLATE,
    mockMenuItem.SKINNY_HOT_CHOCOLATE,
  ],
};

const mockSubMenuGroupTwo: SubMenu = {
  id: 'a3260db5-8f85-43af-bf7e-054f7348649d',
  name: 'alpha-3-demo-sub-menu-group-2',
  displayName: 'Drink Group Two',
  description:
    '20 words lorem ipsum for Drink Group Two: Curabitur pretium turpis risus, quis porttitor elit interdum id. Etiam eu orci convallis, egestas est ut, vehicula orci. Integer imperdiet.',
  image: menuItemImage.VANILLA_LATTE,
};

const mockMenuGroupTwo: Menu = {
  ...mockSubMenuGroupTwo,
  items: [
    mockMenuItem.LATTE,
    mockMenuItem.ALMOND_MILK_LATTE,
    mockMenuItem.CARAMEL_LATTE,
    mockMenuItem.VANILLA_LATTE,
    mockMenuItem.CARAMEL_MACCHIATO,
    mockMenuItem.MOCHA_MACCHIATO,
  ],
};

const mockSubMenuGroupThree: SubMenu = {
  id: '3b3eda61-792d-4687-8782-43b8ce381d77',
  name: 'alpha-3-demo-sub-menu-group-3',
  displayName: 'Drink Group Three',
  description:
    '20 words lorem ipsum for Drink Group Three: Vestibulum ut est quis tortor lacinia gravida a eget justo. Vivamus euismod, purus in mollis facilisis, purus enim viverra mi..',
  image: menuItemImage.ICED_COFFEE,
};

const mockMenuGroupThree: Menu = {
  ...mockSubMenuGroupThree,
  items: [
    mockMenuItem.ICED_COFFEE,
    mockMenuItem.ICED_LATTE,
    mockMenuItem.ICED_ALMOND_MILK_LATTE,
    mockMenuItem.ICED_CARAMEL_LATTE,
    mockMenuItem.ICED_VANILLA_LATTE,
    mockMenuItem.ICED_CARAMEL_MACCHIATO,
  ],
};

const mockSubMenuGroupFour: SubMenu = {
  id: 'cf7a68aa-eb9c-4b16-90ab-3eafbb880e0b',
  name: 'alpha-3-demo-sub-menu-group-4',
  displayName: 'Drink Group Four',
  description:
    '20 words lorem ipsum for Drink Group Four: Pellentesque ut elit non tellus posuere aliquet. Aliquam dui lectus, auctor non venenatis sed, vulputate nec dui. Suspendisse dapibus augue..',
  image: menuItemImage.HOT_CHOCOLATE,
};

const mockMenuGroupFour: Menu = {
  ...mockSubMenuGroupFour,
  items: [
    mockMenuItem.COFFEE,
    mockMenuItem.AMERICANO,
    mockMenuItem.CAFE_AU_LAIT,
    mockMenuItem.MOCHA,
    mockMenuItem.STEAMED_MILK,
    mockMenuItem.VANILLA_STEAMER,
  ],
};

export const mockSubMenuItem = {
  groupOne: mockSubMenuGroupOne,
  groupTwo: mockSubMenuGroupTwo,
  groupThree: mockSubMenuGroupThree,
  groupFour: mockSubMenuGroupFour,
};

const shallowMenuGroupOne = {
  id: mockMenuGroupOne.id,
  name: mockMenuGroupOne.name,
};
const shallowMenuGroupTwo = {
  id: mockMenuGroupTwo.id,
  name: mockMenuGroupTwo.name,
};
const shallowMenuGroupThree = {
  id: mockMenuGroupThree.id,
  name: mockMenuGroupThree.name,
};
const shallowMenuGroupFour = {
  id: mockMenuGroupFour.id,
  name: mockMenuGroupFour.name,
};

export const shallowMockSubMenu = {
  groupOne: shallowMenuGroupOne,
  groupTwo: shallowMenuGroupTwo,
  groupThree: shallowMenuGroupThree,
  groupFour: shallowMenuGroupFour,
};

export const mockSubMenu = {
  groupOne: mockMenuGroupOne,
  groupTwo: mockMenuGroupTwo,
  groupThree: mockMenuGroupThree,
  groupFour: mockMenuGroupFour,
};
