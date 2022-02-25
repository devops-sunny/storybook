import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { OrderQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockProduceOrderResponse } from '@bb/common/fixtures/orders/mockProduceOrderResponse';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

describe('Given an Order with validated Items', () => {
  let order: Order;
  beforeEach(() => {
    order = mockOrder()
      .addItem({
        modifiedProductVariation: {
          id: uuidv4(),
          productVariation: {
            id: uuidv4(),
            name: `product-variation-1`,
          },
        },
      })
      .validateAllItems({ validations: [...validValidations] })
      .value();
  });
  describe('when mockProduceOrderResponse is called with Order', () => {
    it('returns an Order with status ProductionReady', () => {
      const res: OrderQueryResponse = mockProduceOrderResponse({
        order,
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            status: [OrderItemStatus[OrderItemStatus.ProductionReady]],
            items: [
              ...order.items.map((item) => ({
                ...item,
                status: OrderItemStatus[OrderItemStatus.ProductionReady],
              })),
            ],
          },
        },
      });
    });
  });
});

// @TODO - error mock
describe('Given a validated Order with a not-producible status', () => {
  describe('when ProduceOrder request is made', () => {
    it.todo('responds with an error');
  });
});

describe('Given a not-validated Order with a producible status', () => {
  describe('when ProduceOrder request is made', () => {
    it.todo('responds with an error');
  });
});
