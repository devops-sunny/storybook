import {
  mockOrderResponseAfterAllOrderItemStatusUpdate,
  mockOrderResponseAfterAllValidationStatusUpdate,
  mockOrderResponseAfterOneOrderItemStatusUpdate,
  mockOrderResponseAfterOneValidationStatusUpdate,
} from '@bb/common/fixtures/orders/mockOrderResponse';

import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { v4 as uuidv4 } from 'uuid';

describe('Given an order with two orders', () => {
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
      .addItem({
        modifiedProductVariation: {
          id: uuidv4(),
          productVariation: {
            id: uuidv4(),
            name: `product-variation-2`,
          },
        },
      })
      .value();
  });
  describe('when mockOrderResponseAfterAllOrderItemStatusUpdate is called', () => {
    it('returns an Order with ALL items with provided status', () => {
      const res = mockOrderResponseAfterAllOrderItemStatusUpdate({
        order: order,
        status: 'ProductionSucceeded',
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            status: ['ProductionSucceeded'],
            items: [
              { ...order.items[0], status: 'ProductionSucceeded' },
              { ...order.items[1], status: 'ProductionSucceeded' },
            ],
          },
        },
      });
    });
  });
  describe('when mockOrderResponseAfterOneOrderItemStatusUpdate is called', () => {
    it('returns an Order with only the first item with provided status', () => {
      const res = mockOrderResponseAfterOneOrderItemStatusUpdate({
        order: order,
        status: 'ProductionSucceeded',
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            status: ['ProductionSucceeded', 'Configuration'],
            items: [
              { ...order.items[0], status: 'ProductionSucceeded' },
              { ...order.items[1], status: 'Configuration' },
            ],
          },
        },
      });
    });
  });
  describe('when mockOrderResponseAfterAllValidationStatusUpdate is called', () => {
    it('returns an Order where ALL items have the provided validations', () => {
      const res = mockOrderResponseAfterAllValidationStatusUpdate({
        order: order,
        validations: [
          {
            condition: 'ComponentsAreAvailable',
            isComplete: true,
            isValid: true,
          },
          {
            condition: 'ModificationsAreValid',
            isComplete: true,
            isValid: false,
          },
          {
            condition: 'ProductVariationIsProducible',
            isComplete: false,
            isValid: false,
          },
        ],
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            completeConditions: [
              'ComponentsAreAvailable',
              'ModificationsAreValid',
            ],
            incompleteConditions: ['ProductVariationIsProducible'],
            validConditions: ['ComponentsAreAvailable'],
            invalidConditions: [
              'ModificationsAreValid',
              'ProductVariationIsProducible',
            ],
            items: [
              {
                ...order.items[0],
                completeConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                ],
                incompleteConditions: ['ProductVariationIsProducible'],
                validConditions: ['ComponentsAreAvailable'],
                invalidConditions: [
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
              },
              {
                ...order.items[1],
                completeConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                ],
                incompleteConditions: ['ProductVariationIsProducible'],
                validConditions: ['ComponentsAreAvailable'],
                invalidConditions: [
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
              },
            ],
          },
        },
      });
    });
  });
  describe('when mockOrderResponseAfterOneValidationStatusUpdate is called', () => {
    it('returns an Order where only the first item has the provided validations', () => {
      const res = mockOrderResponseAfterOneValidationStatusUpdate({
        order: order,
        validations: [
          {
            condition: 'ComponentsAreAvailable',
            isComplete: true,
            isValid: true,
          },
          {
            condition: 'ModificationsAreValid',
            isComplete: true,
            isValid: false,
          },
          {
            condition: 'ProductVariationIsProducible',
            isComplete: false,
            isValid: false,
          },
        ],
      });
      expect(res).toEqual({
        data: {
          order: {
            ...order,
            completeConditions: [],
            incompleteConditions: [
              'ProductVariationIsProducible',
              'ModificationsAreValid',
              'ComponentsAreAvailable',
            ],
            validConditions: [],
            invalidConditions: [
              'ModificationsAreValid',
              'ProductVariationIsProducible',
              'ComponentsAreAvailable',
            ],
            items: [
              {
                ...order.items[0],
                completeConditions: [
                  'ComponentsAreAvailable',
                  'ModificationsAreValid',
                ],
                incompleteConditions: ['ProductVariationIsProducible'],
                validConditions: ['ComponentsAreAvailable'],
                invalidConditions: [
                  'ModificationsAreValid',
                  'ProductVariationIsProducible',
                ],
              },
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
          },
        },
      });
    });
  });
});
