import { OrderSummaryModification } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { currency } from '@bb/order/fixtures/menu/currency';
import { v4 as uuidv4 } from 'uuid';

const ONE_MODIFICATION: OrderSummaryModification[] = [
  {
    id: uuidv4(),
    displayName: 'Chocolate Syrup',
    price: { value: 50, iso4217Currency: currency.usd },
  },
];

const TWO_MODIFICATIONS: OrderSummaryModification[] = [
  {
    id: uuidv4(),
    displayName: 'Chocolate Syrup',
    price: { value: 50, iso4217Currency: currency.usd },
  },
  {
    id: uuidv4(),
    displayName: 'Stevia',
    price: { value: 0, iso4217Currency: currency.usd },
  },
];

const THREE_MODIFICATIONS: OrderSummaryModification[] = [
  {
    id: uuidv4(),
    displayName: 'Chocolate Syrup',
    price: { value: 50, iso4217Currency: currency.usd },
  },
  {
    id: uuidv4(),
    displayName: 'Sugar',
    price: { value: 50, iso4217Currency: currency.usd },
  },
  {
    id: uuidv4(),
    displayName: 'Extra Hot',
    price: { value: 0, iso4217Currency: currency.usd },
  },
];

export const modificationsView = {
  ONE_MODIFICATION,
  TWO_MODIFICATIONS,
  THREE_MODIFICATIONS,
};
