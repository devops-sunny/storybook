import { MenuItem } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { ProductKey } from './productKeys';
import { menuItemImage } from './menuItemImage';
import { mockMenuItemProduct } from './menuItemProduct';
import { mockMenuItemProductSize } from './menuItemProductSize';

const ALMOND_MILK_LATTE: MenuItem = {
  id: 'c0cab37c-0606-42aa-9ead-1da0bb10cb56',
  name: 'almond-milk-late',
  product: mockMenuItemProduct.ALMOND_MILK_LATTE,
  displayName: 'Almond Milk Latte',
  description:
    '15 words Lorem Ipsum for Almond Milk Latte: Proident voluptate ipsum culpa veniam sunt tempor commodo commodo do ex sint.',
  image: menuItemImage.ALMOND_MILK_LATTE,
  productSizes: mockMenuItemProductSize.ALMOND_MILK_LATTE,
};

const AMERICANO: MenuItem = {
  id: '79e1e60b-d6ed-45d1-bbb1-93de50e51770',
  name: 'americano',
  product: mockMenuItemProduct.AMERICANO,
  displayName: 'Americano',
  description:
    '15 words Lorem Ipsum for Americano: Cupidatat nostrud irure adipisicing fugiat commodo velit voluptate qui adipisicing sunt nulla et incididunt adipisicing.',
  image: menuItemImage.AMERICANO,
  productSizes: mockMenuItemProductSize.AMERICANO,
};

const CAFE_AU_LAIT: MenuItem = {
  id: '0dd435ce-93c9-4345-a6c6-71ed6fa0e67a',
  name: 'cafe-au-lait',
  product: mockMenuItemProduct.CAFE_AU_LAIT,
  displayName: 'Café au Lait',
  description:
    '15 words Lorem Ipsum for Cafe au Lait: Laboris ullamco et non officia consequat est cillum duis id exercitation.',
  image: menuItemImage.CAFE_AU_LAIT,
  productSizes: mockMenuItemProductSize.CAFE_AU_LAIT,
};

const CAPPUCCINO: MenuItem = {
  id: '2e4590fd-d838-484e-bce6-4037563a6587',
  name: 'cappuccino',
  product: mockMenuItemProduct.CAPPUCCINO,
  displayName: 'Cappuccino',
  description:
    '15 words Lorem Ipsum for Cappuccino: Do sit reprehenderit nulla pariatur fugiat mollit.',
  image: menuItemImage.CAPPUCCINO,
  productSizes: mockMenuItemProductSize.CAPPUCCINO,
};

const CARAMEL_LATTE: MenuItem = {
  id: '3bbce361-57d9-4684-bbc4-07e3f0721d48',
  name: 'caramel latte',
  product: mockMenuItemProduct.CARAMEL_LATTE,
  displayName: 'Caramel Latte',
  description:
    '15 words Lorem Ipsum for Caramel Latte: Id aute nisi ullamco ex nisi eu occaecat labore veniam.',
  image: menuItemImage.CARAMEL_LATTE,
  productSizes: mockMenuItemProductSize.CARAMEL_LATTE,
};

const CARAMEL_MACCHIATO: MenuItem = {
  id: 'e82bd84e-cb9e-4bbe-9bfc-ee3ed4e2ce8f',
  name: 'caramel-macchiato',
  product: mockMenuItemProduct.CARAMEL_MACCHIATO,
  displayName: 'Caramel Macchiato',
  description:
    '15 words Lorem Ipsum for Caramel Macchiato: Anim sunt laboris commodo proident mollit pariatur ad et anim sint.',
  image: menuItemImage.CARAMEL_MACCHIATO,
  productSizes: mockMenuItemProductSize.CARAMEL_MACCHIATO,
};

const COFFEE: MenuItem = {
  id: 'adec3f98-1c93-4ef5-88d7-513d98b478e7',
  name: 'coffee',
  product: mockMenuItemProduct.COFFEE,
  displayName: 'Coffee',
  description:
    '15 words Lorem Ipsum for Coffee: Est dolor nostrud adipisicing amet voluptate in id anim commodo nostrud non.',
  image: menuItemImage.COFFEE,
  productSizes: mockMenuItemProductSize.COFFEE,
};

const ESPRESSO: MenuItem = {
  id: 'a0778f28-2410-454c-81de-be069f0a0679',
  name: 'espresso',
  product: mockMenuItemProduct.ESPRESSO,
  displayName: 'Espresso',
  description:
    '15 words Lorem Ipsum for Espresso: Dolor sunt aliqua laborum laboris cillum labore cupidatat.',
  image: menuItemImage.ESPRESSO,
  productSizes: mockMenuItemProductSize.ESPRESSO,
};

const HOT_CHOCOLATE: MenuItem = {
  id: 'c694f383-28d5-4b77-8630-9d81156a2dc9',
  name: 'hot-chocolate',
  product: mockMenuItemProduct.HOT_CHOCOLATE,
  displayName: 'Hot Chocolate',
  description:
    '15 words Lorem Ipsum for Hot Chocolate: Ipsum mollit nisi enim incididunt voluptate.',
  image: menuItemImage.HOT_CHOCOLATE,
  productSizes: mockMenuItemProductSize.HOT_CHOCOLATE,
};

const ICED_ALMOND_MILK_LATTE: MenuItem = {
  id: '82ed2ed0-0c21-45a5-ac6e-5bc9abd4a04d',
  name: 'iced-almond-milk-latte',
  product: mockMenuItemProduct.ICED_ALMOND_MILK_LATTE,
  displayName: 'Iced Almond Milk Latte',
  description:
    '15 words Lorem Ipsum for Iced Almond Milk Latte: Consequat aute id ipsum aliquip nostrud aliquip incididunt do ipsum labore reprehenderit fugiat elit.',
  image: menuItemImage.ICED_ALMOND_MILK_LATTE,
  productSizes: mockMenuItemProductSize.ICED_ALMOND_MILK_LATTE,
};

const ICED_CARAMEL_LATTE: MenuItem = {
  id: '1ed28bf8-0691-4524-9d8f-8998e1caefc5',
  name: 'iced-caramel-latte',
  product: mockMenuItemProduct.ICED_CARAMEL_LATTE,
  displayName: 'Iced Caramel Latte',
  description:
    '15 words Lorem Ipsum for Iced Caramel Latte: Reprehenderit labore ipsum esse eiusmod occaecat do occaecat.',
  image: menuItemImage.ICED_CARAMEL_LATTE,
  productSizes: mockMenuItemProductSize.ICED_CARAMEL_LATTE,
};

const ICED_CARAMEL_MACCHIATO: MenuItem = {
  id: 'eeb54214-e103-48f5-b5f5-ade63ef30ea1',
  name: 'iced-caramel-macchiato',
  product: mockMenuItemProduct.ICED_CARAMEL_MACCHIATO,
  displayName: 'Iced Caramel Macchiato',
  description:
    '15 words Lorem Ipsum for Iced Caramel Macchiato: Aute tempor ea consectetur minim commodo fugiat laboris reprehenderit.',
  image: menuItemImage.ICED_CARAMEL_MACCHIATO,
  productSizes: mockMenuItemProductSize.ICED_CARAMEL_MACCHIATO,
};

const ICED_COFFEE: MenuItem = {
  id: '2fe39784-be2b-4ba5-8fee-edd9c90ebe8f',
  name: 'iced-coffee',
  product: mockMenuItemProduct.ICED_COFFEE,
  displayName: 'Iced Coffee',
  description:
    '15 words Lorem Ipsum for Iced Coffee: Amet sint occaecat nulla voluptate ea.',
  image: menuItemImage.ICED_COFFEE,
  productSizes: mockMenuItemProductSize.ICED_COFFEE,
};

const ICED_LATTE: MenuItem = {
  id: '994ee1b9-5c0c-4f0f-bf9f-bdac7d19e467',
  name: 'iced-latte',
  product: mockMenuItemProduct.ICED_LATTE,
  displayName: 'Iced Latte',
  description:
    '15 words Lorem Ipsum for Iced Latte: Voluptate est do pariatur laborum ipsum culpa laborum in nisi reprehenderit exercitation quis.',
  image: menuItemImage.ICED_LATTE,
  productSizes: mockMenuItemProductSize.ICED_LATTE,
};

const ICED_VANILLA_LATTE: MenuItem = {
  id: '51f3e13e-3ab7-4360-88d3-8cd305b41523',
  name: 'iced-vanilla-latte',
  product: mockMenuItemProduct.ICED_VANILLA_LATTE,
  displayName: 'Iced Vanilla Latte',
  description:
    '15 words Lorem Ipsum for Iced Vanilla Latte: Non sit excepteur ex esse nostrud mollit voluptate.',
  image: menuItemImage.ICED_VANILLA_LATTE,
  productSizes: mockMenuItemProductSize.ICED_VANILLA_LATTE,
};

const LATTE: MenuItem = {
  id: '80250ea7-158e-4bd3-ac71-e0bd69db531f',
  name: 'latte',
  product: mockMenuItemProduct.LATTE,
  displayName: 'Latte',
  description:
    '15 words Lorem Ipsum for Latte: Excepteur fugiat tempor aliquip ut sunt incididunt.',
  image: menuItemImage.LATTE,
  productSizes: mockMenuItemProductSize.LATTE,
};

const MOCHA: MenuItem = {
  id: '82ffc8f2-17e0-4ecd-ae78-f2750417b2b2',
  name: 'mocha',
  product: mockMenuItemProduct.MOCHA,
  displayName: 'Mocha',
  description:
    '15 words Lorem Ipsum for Mocha: Veniam nulla officia voluptate dolor exercitation mollit aliqua fugiat incididunt dolor deserunt cupidatat id.',
  image: menuItemImage.MOCHA,
  productSizes: mockMenuItemProductSize.MOCHA,
};

const MOCHA_MACCHIATO: MenuItem = {
  id: '8f391948-66f4-4b82-a5f4-30f72e869de7',
  name: 'mocha-macchiato',
  product: mockMenuItemProduct.MOCHA_MACCHIATO,
  displayName: 'Mocha Macchiato',
  description:
    '15 words Lorem Ipsum for Mocha Macchiato: Ullamco irure in excepteur excepteur qui amet ullamco consectetur ad sunt velit laborum voluptate duis.',
  image: menuItemImage.MOCHA_MACCHIATO,
  productSizes: mockMenuItemProductSize.MOCHA_MACCHIATO,
};

const SKINNY_HOT_CHOCOLATE: MenuItem = {
  id: 'd41d6fac-ff33-4966-9394-4f39b174c704',
  name: 'skinny-hot-chocolate',
  product: mockMenuItemProduct.SKINNY_HOT_CHOCOLATE,
  displayName: 'Skinny Hot Chocolate',
  description:
    '15 words Lorem Ipsum for Skinny Hot Chocolate: Pariatur ut id minim duis dolor nostrud Lorem non voluptate labore Lorem deserunt.',
  image: menuItemImage.SKINNY_HOT_CHOCOLATE,
  productSizes: mockMenuItemProductSize.SKINNY_HOT_CHOCOLATE,
};

const STEAMED_MILK: MenuItem = {
  id: '8fa6ec34-f03d-4e1e-be1d-9eefe867c79b',
  name: 'steamed-milk',
  product: mockMenuItemProduct.STEAMED_MILK,
  displayName: 'Steamed Milk',
  description:
    '15 words Lorem Ipsum for Steamed Milk: Occaecat elit sunt consectetur in nisi ullamco aliqua nisi exercitation fugiat pariatur duis Lorem aliqua.',
  image: menuItemImage.STEAMED_MILK,
  productSizes: mockMenuItemProductSize.STEAMED_MILK,
};

const VANILLA_LATTE: MenuItem = {
  id: 'afec528c-73f9-4190-93f9-3f24e36f854f',
  name: 'vanilla-latte',
  product: mockMenuItemProduct.VANILLA_LATTE,
  displayName: 'Vanilla Latte',
  description:
    '15 words Lorem Ipsum for Vanilla Latte: Sit nisi in consectetur est ea cillum dolor minim elit sit.',
  image: menuItemImage.VANILLA_LATTE,
  productSizes: mockMenuItemProductSize.VANILLA_LATTE,
};

const VANILLA_STEAMER: MenuItem = {
  id: '7a43dc28-3014-4e81-b325-c3279c2d47a0',
  name: 'vanilla-steamer',
  product: mockMenuItemProduct.VANILLA_STEAMER,
  displayName: 'Vanilla Steamer',
  description:
    '15 words Lorem Ipsum for Vanilla Steamer: Eiusmod ullamco enim sit voluptate eu pariatur officia labore adipisicing duis deserunt.',
  image: menuItemImage.VANILLA_STEAMER,
  productSizes: mockMenuItemProductSize.VANILLA_STEAMER,
};

export const mockMenuItem: Record<ProductKey, MenuItem> = {
  ALMOND_MILK_LATTE,
  AMERICANO,
  CAFE_AU_LAIT,
  CAPPUCCINO,
  CARAMEL_LATTE,
  CARAMEL_MACCHIATO,
  COFFEE,
  ESPRESSO,
  HOT_CHOCOLATE,
  ICED_ALMOND_MILK_LATTE,
  ICED_CARAMEL_LATTE,
  ICED_CARAMEL_MACCHIATO,
  ICED_COFFEE,
  ICED_LATTE,
  ICED_VANILLA_LATTE,
  LATTE,
  MOCHA,
  MOCHA_MACCHIATO,
  SKINNY_HOT_CHOCOLATE,
  STEAMED_MILK,
  VANILLA_LATTE,
  VANILLA_STEAMER,
};
