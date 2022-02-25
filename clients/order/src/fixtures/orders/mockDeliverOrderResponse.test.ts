import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { mockDeliverOrderResponse } from '@bb/common/fixtures/orders/mockDeliverOrderResponse';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

describe('Given an Order with deliverable status', () => {
  const order: Order = mockOrder()
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-1`,
        },
      },
    })
    .addItem({
      modifiedProductVariation: {
        id: uuidv4(),
        productVariation: {
          id: uuidv4(),
          name: `product-variation-2`,
        },
      },
    })
    .validateAllItems({ validations: [...validValidations] })
    .updateAllItemsStatus({ status: 'ProductionSucceeded' })
    .value();
  describe('when mockDeliverOrderResponse is called with Order', () => {
    it('returns an Order with status DeliveryReady', () => {
      const res = mockDeliverOrderResponse({
        order,
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            status: ['DeliveryReady'],
            items: [
              ...order.items.map((item) => ({
                ...item,
                status: 'DeliveryReady',
              })),
            ],
          },
        },
      });
    });
  });
});

// @TODO - error mock
describe('Given an Order with a not-deliverable status', () => {
  describe('when ProduceOrder request is made', () => {
    it.todo('responds with an error');
  });
});
