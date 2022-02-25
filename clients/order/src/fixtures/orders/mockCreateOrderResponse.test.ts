import { OrderQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';
import { emptyOrder } from '@bb/common/fixtures/orders/staticMocks';
import { mockCreateOrderResponse } from '@bb/common/fixtures/orders/mockCreateOrderResponse';

describe('when mockCreateOrder is called', () => {
  it('returns an Order with an id', () => {
    const res: OrderQueryResponse = mockCreateOrderResponse();
    expect(res).toEqual({
      data: {
        order: {
          ...emptyOrder,
          id: res?.data?.order?.id, // new id created by the function
        },
      },
    });
  });
});
