import { OrderQueryResponse } from '../../types/tmpTypes/responseTypes';
import { mockOrder } from './mockOrder/mockOrder';

// return a new uuid for each new user session
export const mockCreateOrderResponse = (): OrderQueryResponse => {
  return {
    data: {
      order: mockOrder().value(),
    },
  };
};
