import { Image } from '@bb/common/types/tmpTypes/menuEntityTypes';

const ROOT_URL = 'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com';

const _EMPTY_PLACEHOLDER: Image = {
  id: '0c6eb483-0655-4f11-9c80-6accef148a60',
  name: 'empty-placeholder',
  accessibleName: 'no image',
  sourceUrl: `${ROOT_URL}/menu-item--placeholder.png`,
};

const ALMOND_MILK_LATTE: Image = {
  id: '8365e90b-beb4-4ed5-9f1b-212ae234d275',
  name: 'almond-milk-latte',
  accessibleName: 'glass mug of almond milk latte',
  sourceUrl: `${ROOT_URL}/menu-item--latte.png`,
};

const AMERICANO: Image = {
  id: '42001ba5-19ed-42a0-8689-e727e119b450',
  name: 'americano',
  accessibleName: 'mug of coffee americano',
  sourceUrl: `${ROOT_URL}/menu-item--americano.png`,
};

// const CAFE_AU_LAIT: Image = {
//   id: '40f3e3b7-0895-4837-b263-12c5bd985e95',
//   name: 'cafe-au-lait',
//   accessibleName: 'no image',
//   sourceUrl: `${ROOT_URL}/menu-item--placeholder.png`,
// };
const CAFE_AU_LAIT: Image = _EMPTY_PLACEHOLDER;

const CAPPUCCINO: Image = {
  id: '9f4f254d-cc6d-41c0-863a-4a7da4179fec',
  name: 'cappuccino',
  accessibleName: '',
  sourceUrl: `${ROOT_URL}/menu-item--cappuccino.png`,
};

const CARAMEL_LATTE: Image = {
  id: 'e5e8f370-c53a-4586-93c2-f85c080db526',
  name: 'caramel-latte',
  accessibleName: 'glass mug of caramel latte',
  sourceUrl: `${ROOT_URL}/menu-item--latte.png`,
};

// const CARAMEL_MACCHIATO: Image = {
//   id: '28ba68f7-1e41-499a-87b5-446644677ca2',
//   name: 'caramel-macchiato',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const CARAMEL_MACCHIATO: Image = _EMPTY_PLACEHOLDER;

// const COFFEE: Image = {
//   id: '1f832440-c424-468f-aa25-363e4e472bff',
//   name: 'coffee',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const COFFEE: Image = _EMPTY_PLACEHOLDER;

// const ESPRESSO: Image = {
//   id: 'e230e608-37c1-4250-8dbf-915f5cdb72d1',
//   name: 'espresso',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const ESPRESSO: Image = _EMPTY_PLACEHOLDER;

const HOT_CHOCOLATE: Image = {
  id: 'c195e034-b6a1-4441-94c9-e0471c8faff0',
  name: 'hot-chocolate',
  accessibleName: 'glass mug of hot chocolate',
  sourceUrl: `${ROOT_URL}/menu-item--hot-chocolate.png`,
};

// const ICED_ALMOND_MILK_LATTE: Image = {
//   id: '359454a8-2414-4c5b-8690-6396b317718c',
//   name: 'iced-almond-milk-latte',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const ICED_ALMOND_MILK_LATTE: Image = _EMPTY_PLACEHOLDER;

// const ICED_CARAMEL_LATTE: Image = {
//   id: '8e998d44-23ae-437d-ba0c-4156e0c075c0',
//   name: 'iced-caramel-latte',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const ICED_CARAMEL_LATTE: Image = _EMPTY_PLACEHOLDER;

// const ICED_CARAMEL_MACCHIATO: Image = {
//   id: '6e3a7a6f-5da9-417f-8d0b-f2d03df56a8b',
//   name: 'iced-caramel-macchiato',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const ICED_CARAMEL_MACCHIATO: Image = _EMPTY_PLACEHOLDER;

// const ICED_COFFEE: Image = {
//   id: '356abec1-91bf-413e-9292-a2de982b84a8',
//   name: 'iced-coffee',
//   accessibleName: '',
//   sourceUrl: '${ROOT_URL}/menu-item--iced-americano.png',
// };
const ICED_COFFEE: Image = _EMPTY_PLACEHOLDER;

const ICED_LATTE: Image = {
  id: '2343c5e3-160b-4a76-94e5-745d4dc4a426',
  name: 'iced-latte',
  accessibleName: 'glass of iced latte with ice cubes',
  sourceUrl: `${ROOT_URL}/menu-item--iced-latte.png`,
};

const ICED_VANILLA_LATTE: Image = {
  id: '9cf45497-f3e7-45e7-9f24-3a68c4421215',
  name: 'ice-vanilla-latte',
  accessibleName:
    'glass of iced latte with ice cubes and a sprig of vanilla on the side',
  sourceUrl: `${ROOT_URL}/menu-item--iced-vanilla-latte.png`,
};

const LATTE: Image = {
  id: '1c828ea2-b178-462f-8138-bf801a86bf86',
  name: 'latte',
  accessibleName: 'glass mug of latte',
  sourceUrl: `${ROOT_URL}/menu-item--latte.png`,
};

const MOCHA: Image = {
  id: '1c159e22-9c03-4e0c-91fd-3d43fe9c937c',
  name: 'mocha',
  accessibleName: 'mug of mocha dusted with cocoa',
  sourceUrl: `${ROOT_URL}/menu-item--mocha.png`,
};

// const MOCHA_MACCHIATO: Image = {
//   id: '2d5dfd6a-a61d-48bb-979c-72a31bee4409',
//   name: 'mocha-macchiato',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const MOCHA_MACCHIATO: Image = _EMPTY_PLACEHOLDER;

const SKINNY_HOT_CHOCOLATE: Image = {
  id: 'd0dd9967-2e15-4380-9eb1-f5dd3c087a79',
  name: 'skinny-hot-chocolate',
  accessibleName:
    'glass mug of hot chocolate dusted with cocoa with a chocolate square on the side',
  sourceUrl: `${ROOT_URL}/menu-item--hot-chocolate.png`,
};

// const STEAMED_MILK: Image = {
//   id: 'b8f51e2d-5460-4b92-9c04-3ddbafcba39b',
//   name: 'steamed-milk',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const STEAMED_MILK: Image = _EMPTY_PLACEHOLDER;

const VANILLA_LATTE: Image = {
  id: 'b152c6c2-503e-4dbe-8cf6-1f8bbe9a33cb',
  name: 'vanilla-latte',
  accessibleName: '',
  sourceUrl: `${ROOT_URL}/menu-item--vanilla-latte.png`,
};

// const VANILLA_STEAMER: Image = {
//   id: '3e871e43-eb87-49a5-94d2-94a3d915b4ad',
//   name: 'vanilla-steamer',
//   accessibleName: '',
//   sourceUrl: `${ROOT_URL}/`,
// };
const VANILLA_STEAMER: Image = _EMPTY_PLACEHOLDER;

export const menuItemImage = {
  _EMPTY_PLACEHOLDER,
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
