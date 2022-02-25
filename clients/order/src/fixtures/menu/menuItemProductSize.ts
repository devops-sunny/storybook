import { MenuItemProductSize } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { ProductKey } from './productKeys';
import { currency } from './currency';

const CUP_12_OZ = '7f797965-7bcf-4ca0-98d8-17f212e3387e';
const CUP_16_OZ = '862c9fc8-6edd-4209-a579-3c06ac9ad04d';
const CUP_20_OZ = '441ae0c6-9a35-478f-a080-826ecb3b7715';

const SMALL_HOT = 'Small 12 oz';
const LARGE_HOT = 'Large 16 oz';
const SMALL_ICED = 'Small 16 oz';
const LARGE_ICED = 'Large 20 oz';
const ONESIZE = '12 oz';

const ALMOND_MILK_LATTE: MenuItemProductSize[] = [
  {
    id: 'c26cfcb5-6656-45e9-9920-9865d4602d95',
    name: 'almond-milk-latte|12-oz',
    productId: '2e5c35e3-a52d-4add-9a0b-e4b5ce90cccb',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: '9632283e-b0e5-4eda-a176-c9c7ae953c78',
    name: 'almond-milk-latte|16-oz',
    productId: '2e5c35e3-a52d-4add-9a0b-e4b5ce90cccb',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const AMERICANO: MenuItemProductSize[] = [
  {
    id: '49164e72-f120-4d2d-8598-732b6dac6c4a',
    name: 'americano|12-oz',
    productId: 'ac0cc6f4-52a2-4466-b493-58a64f2d306f',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
];

const CAFE_AU_LAIT: MenuItemProductSize[] = [
  {
    id: '60294be6-089a-49e4-b96c-7e14706a51da',
    name: 'cafe-au-lait|12-oz',
    productId: '25cab965-76b5-4bab-a3ca-e1516048c206',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: '2b19db09-eb0d-4e04-ba7c-82e2cb2a3a18',
    name: 'cafe-au-lait|16-oz',
    productId: '25cab965-76b5-4bab-a3ca-e1516048c206',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const CAPPUCCINO: MenuItemProductSize[] = [
  {
    id: 'ef376a8d-da1f-4dc5-ab05-882368ac084c',
    name: 'cappuccino|12-oz',
    productId: '2a3e2289-f9a7-449c-87f3-a065526d64fd',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
];

const CARAMEL_LATTE: MenuItemProductSize[] = [
  {
    id: 'f04942b0-3040-4a1f-84e9-d572ba069d1f',
    name: 'caramel-latte|12-oz',
    productId: '165fb3d1-4707-4393-89fd-d2934d20d247',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: 'e0951c28-9bc4-44db-9581-f2c7407b30cb',
    name: 'caramel-latte|16-oz',
    productId: '165fb3d1-4707-4393-89fd-d2934d20d247',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const CARAMEL_MACCHIATO: MenuItemProductSize[] = [
  {
    id: 'ca173d09-5793-4d49-90a8-2765a378f6fa',
    name: 'caramel-latte-macchiato|12-oz',
    productId: '82589613-5690-4814-bf87-043f37973f55',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '8791d2b4-e23a-4bdd-aedf-3a5864751a2c',
    name: 'caramel-latte-macchiato|16-oz',
    productId: '82589613-5690-4814-bf87-043f37973f55',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const COFFEE: MenuItemProductSize[] = [
  {
    id: 'b40180d7-e608-419a-9d5b-af4f8f4c9440',
    name: 'coffee|12-oz',
    productId: '3544bc7f-6c5d-4f71-8efb-79f122de3479',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 175,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: '222a28ef-f92a-463e-bfe8-7463bb2da92d',
    name: 'coffee|16-oz',
    productId: '3544bc7f-6c5d-4f71-8efb-79f122de3479',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const ESPRESSO: MenuItemProductSize[] = [
  {
    id: '0c1d1dbf-692e-49b3-b77e-42576c6e76a0',
    name: 'espresso|12-oz',
    productId: 'b95947e9-7998-4760-9b80-5a88b7be0438',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
];

const HOT_CHOCOLATE: MenuItemProductSize[] = [
  {
    id: '28b9fc10-a5c7-472e-91bf-68b228aebe31',
    name: 'hot-chocolate|12-oz',
    productId: 'e77dd060-3434-4c75-ba45-7327148beccd',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
];

const ICED_ALMOND_MILK_LATTE: MenuItemProductSize[] = [
  {
    id: '93ede8fa-6e89-4b43-bf7f-438860ade713',
    name: 'iced-almond-milk-latte|16-oz',
    productId: '031c1f18-5d6c-41f9-839e-1f543af6c7a2',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '36775e90-f5d9-41f6-8a92-c4f0dc2518ac',
    name: 'iced-almond-milk-latte|16-oz',
    productId: '031c1f18-5d6c-41f9-839e-1f543af6c7a2',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const ICED_CARAMEL_LATTE: MenuItemProductSize[] = [
  {
    id: '864abe26-f26a-4bcf-83ef-00142887a0a2',
    name: 'iced-caramel-latte|16-oz',
    productId: '1b22b3c4-1290-4c21-a1f5-f572cd8447dd',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '7611c57f-6748-4cd9-bd41-874ac45afc96',
    name: 'iced-caramel-latte|20-oz',
    productId: '1b22b3c4-1290-4c21-a1f5-f572cd8447dd',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const ICED_CARAMEL_MACCHIATO: MenuItemProductSize[] = [
  {
    id: 'bb921bd1-d26b-4b7a-a60d-73d51e92d41e',
    name: 'iced-caramel-latte-macchiato|16-oz',
    productId: 'f94d2ab6-2ad1-4c35-851f-7dc06275cf07',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
  {
    id: '552354d5-6b71-4531-8693-03990356241a',
    name: 'iced-caramel-latte-macchiato|20-oz',
    productId: 'f94d2ab6-2ad1-4c35-851f-7dc06275cf07',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 600,
  },
];

const ICED_COFFEE: MenuItemProductSize[] = [
  {
    id: '3d4dac70-eff8-4fbe-8948-bfc53df28875',
    name: 'iced-coffee|16-oz',
    productId: '18545ea8-99dc-4bd6-a2a1-85c6b9555900',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: '9764786c-797c-49aa-9aa1-bb15802af511',
    name: 'iced-coffee|20-oz',
    productId: '18545ea8-99dc-4bd6-a2a1-85c6b9555900',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const ICED_LATTE: MenuItemProductSize[] = [
  {
    id: '685c15f5-aab4-48a1-9a5c-8c0ada387534',
    name: 'iced-latte|16-oz',
    productId: '262cca33-1d5b-4042-9a0c-0ca4b8fc22bd',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: '0cd8859f-b194-4a7b-bd3b-3ccb8dd396cb',
    name: 'iced-latte|20-oz',
    productId: '262cca33-1d5b-4042-9a0c-0ca4b8fc22bd',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const ICED_VANILLA_LATTE: MenuItemProductSize[] = [
  {
    id: 'd59c1765-f3a4-40d5-8cd8-2e5edaa8d30f',
    name: 'iced-vanilla-latte|16-oz',
    productId: '68670c63-b0a8-44be-a316-d962ec50901e',
    sizeComponentId: CUP_16_OZ,
    displayName: SMALL_ICED,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '9c9308a7-e25f-4e2c-8660-39bc9c7bb2d1',
    name: 'iced-vanilla-latte|20-oz',
    productId: '68670c63-b0a8-44be-a316-d962ec50901e',
    sizeComponentId: CUP_20_OZ,
    displayName: LARGE_ICED,
    price: {
      value: 350,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const LATTE: MenuItemProductSize[] = [
  {
    id: 'd99db775-3e03-43eb-bee6-327b4f7dee79',
    name: 'latte|12-oz',
    productId: 'a953ef9c-9cc1-4c02-b928-b193fb8c08b6',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 200,
  },
  {
    id: 'fb42dc04-5ee3-40a1-a776-c78c0d17fc42',
    name: 'latte|16-oz',
    productId: 'a953ef9c-9cc1-4c02-b928-b193fb8c08b6',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const MOCHA: MenuItemProductSize[] = [
  {
    id: '98d9cc20-f9c0-4522-96a6-2125428e816a',
    name: 'mocha|12-oz',
    productId: 'b7a1f64d-c50f-4dd7-8144-28bfac821727',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: 'a398b689-cd82-4a7a-ae5d-5c0bf7be1bbb',
    name: 'mocha|16-oz',
    productId: 'b7a1f64d-c50f-4dd7-8144-28bfac821727',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 500,
  },
];

const MOCHA_MACCHIATO: MenuItemProductSize[] = [
  {
    id: 'd53fe9b2-8570-44c6-bea3-c9985864217e',
    name: 'mocha-macchiauto|12-oz',
    productId: '41c8ef21-423f-41fb-8d61-ae4765378d95',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
];

const SKINNY_HOT_CHOCOLATE: MenuItemProductSize[] = [
  {
    id: '7d505070-41fe-4133-80e0-9803fc6704ce',
    name: 'skinny-hot-chocolate|12-oz',
    productId: 'e93e15c0-5f21-48b3-9b2b-5dc8dc8ca329',
    sizeComponentId: CUP_12_OZ,
    displayName: ONESIZE,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
];

const STEAMED_MILK: MenuItemProductSize[] = [
  {
    id: '4351f48c-7362-4989-91c8-958485717a2d',
    name: 'steamed-milk|12-oz',
    productId: '3b6cff87-1286-4e2b-a180-59a5e20c4df4',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 200,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '7034b9ba-8299-4e44-94f8-6c7c7bf087cc',
    name: 'steamed-milk|16-oz',
    productId: '3b6cff87-1286-4e2b-a180-59a5e20c4df4',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const VANILLA_LATTE: MenuItemProductSize[] = [
  {
    id: '740570aa-68e4-4177-bfc3-8d3aab361272',
    name: 'vanilla-latte|12-oz',
    productId: 'd4f4ca7e-2435-4302-907a-28bef15402e8',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: 'fd468be3-2d09-4684-a8d4-cfcebfb0f6ea',
    name: 'vanilla-latte|16-oz',
    productId: 'd4f4ca7e-2435-4302-907a-28bef15402e8',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 350,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

const VANILLA_STEAMER: MenuItemProductSize[] = [
  {
    id: '2579a880-3cdc-47fd-876f-3a4f82a49259',
    name: 'vanilla-steamer|12-oz',
    productId: '92bba0ac-ea1e-42fa-a8c6-e0ff1662627c',
    sizeComponentId: CUP_12_OZ,
    displayName: SMALL_HOT,
    price: {
      value: 250,
      iso4217Currency: currency.usd,
    },
    calories: 300,
  },
  {
    id: '58f78df5-23f3-40e0-843e-06e98b19ba09',
    name: 'vanilla-steamer|16-oz',
    productId: '92bba0ac-ea1e-42fa-a8c6-e0ff1662627c',
    sizeComponentId: CUP_16_OZ,
    displayName: LARGE_HOT,
    price: {
      value: 300,
      iso4217Currency: currency.usd,
    },
    calories: 400,
  },
];

export const mockMenuItemProductSize: Record<
  ProductKey,
  MenuItemProductSize[]
> = {
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
