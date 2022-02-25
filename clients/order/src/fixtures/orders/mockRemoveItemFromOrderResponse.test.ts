import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { RemoveItemFromOrderMutationResponse } from '@bb/common/types/tmpTypes/responseTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockRemoveItemOrderResponse } from '@bb/common/fixtures/orders/mockRemoveItemFromOrderResponse';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

const setupOrderWithOneValidItem = (): Order => ({
  ...mockOrder()
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
    .value(),
});

const setupOrderWithTwoValidItems = (): Order => ({
  ...mockOrder()
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
    .value(),
});

const setupOrderWithTwoMixedValidityItems = (): Order => ({
  ...mockOrder()
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
    .validateFirstItem({ validations: [...validValidations] })
    .value(),
});

describe('Given an Order with one item in full validation', () => {
  let order: Order;
  beforeEach(() => {
    order = setupOrderWithOneValidItem();
  });
  describe('when mockRemoveItemFromOrderResponse is called', () => {
    it('returns and Order with NO Items and NO validations', () => {
      const res: RemoveItemFromOrderMutationResponse =
        mockRemoveItemOrderResponse({
          order: order,
          orderItemId: order.items[0]?.id as string,
        });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            status: [],
            items: [],
            completeConditions: [],
            incompleteConditions: [],
            validConditions: [],
            invalidConditions: [],
          },
          orderItemId: order.items[0]?.id,
        },
      });
    });
  });
});

describe('Given an Order with two items in full validation', () => {
  let order: Order;
  beforeEach(() => {
    order = setupOrderWithTwoValidItems();
  });
  describe('when mockRemoveItemFromOrderResponse is called', () => {
    it('returns an Order with one Item and full validations', () => {
      const res: RemoveItemFromOrderMutationResponse =
        mockRemoveItemOrderResponse({
          order: order,
          orderItemId: order.items[0]?.id as string,
        });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            items: [
              {
                ...order.items[1],
                completeConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
                incompleteConditions: [],
                validConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
                invalidConditions: [],
              },
            ],
            completeConditions: [
              'ComponentsAreAvailable',
              'ModificationsAreValid',
              'ProductVariationIsProducible',
            ],
            incompleteConditions: [],
            validConditions: [
              'ComponentsAreAvailable',
              'ModificationsAreValid',
              'ProductVariationIsProducible',
            ],
            invalidConditions: [],
          },
          orderItemId: order.items[0]?.id,
        },
      });
    });
  });
});

describe('Given an Order with two items in mixed validation', () => {
  let order: Order;
  beforeEach(() => {
    order = setupOrderWithTwoMixedValidityItems();
  });
  describe('when mockRemoveItemFromOrderResponse is called with the not-validated Item', () => {
    it('returns an Order with one Item and full validations', () => {
      const res: RemoveItemFromOrderMutationResponse =
        mockRemoveItemOrderResponse({
          order: order,
          orderItemId: order.items[1]?.id as string,
        });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            items: [
              {
                ...order.items[0],
                completeConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
                incompleteConditions: [],
                validConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
                invalidConditions: [],
              },
            ],
            completeConditions: [
              'ComponentsAreAvailable',
              'ModificationsAreValid',
              'ProductVariationIsProducible',
            ],
            incompleteConditions: [],
            validConditions: [
              'ComponentsAreAvailable',
              'ModificationsAreValid',
              'ProductVariationIsProducible',
            ],
            invalidConditions: [],
          },
          orderItemId: order.items[1]?.id,
        },
      });
    });
  });
  describe('when mockRemoveItemFromOrderResponse is called with the validated Item', () => {
    it('returns an Order with one Item and default validations', () => {
      const res: RemoveItemFromOrderMutationResponse =
        mockRemoveItemOrderResponse({
          order: order,
          orderItemId: order.items[0]?.id as string,
        });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            items: [
              {
                ...order.items[1],
                completeConditions: [],
                incompleteConditions: [
                  'ModificationsAreValid',
                  'ComponentsAreAvailable',
                  'ProductVariationIsProducible',
                ],
                validConditions: [],
                invalidConditions: [
                  'ModificationsAreValid',
                  'ComponentsAreAvailable',
                  'ProductVariationIsProducible',
                ],
              },
            ],
            completeConditions: [],
            incompleteConditions: [
              'ModificationsAreValid',
              'ComponentsAreAvailable',
              'ProductVariationIsProducible',
            ],
            validConditions: [],
            invalidConditions: [
              'ModificationsAreValid',
              'ComponentsAreAvailable',
              'ProductVariationIsProducible',
            ],
          },
          orderItemId: order.items[0]?.id,
        },
      });
    });
  });
});
