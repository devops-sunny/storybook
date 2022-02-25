import {
  ConditionValidation,
  Order,
  OrderItem,
} from '@bb/common/types/tmpTypes/entityTypes';

import { OrderItemValidityCondition } from '@bb/common/types/tmpTypes/enums';

export const validateFirstItem = (params: {
  order: Order;
  validations: ConditionValidation[];
}): Order => {
  const { order, validations } = params;

  const updatedFirstItem: OrderItem | undefined = order.items.length
    ? <OrderItem>{
        ...order.items[0],
        validConditions: [
          // filter to validations with this status, return the condition name
          ...validations
            .filter((validation) => validation.isValid)
            .map((filteredValidation) => filteredValidation.condition),
        ],
        invalidConditions: [
          ...validations
            .filter((validation) => !validation.isValid)
            .map((filteredValidation) => filteredValidation.condition),
        ],
        completeConditions: [
          ...validations
            .filter((validation) => validation.isComplete)
            .map((filteredValidation) => filteredValidation.condition),
        ],
        incompleteConditions: [
          ...validations
            .filter((validation) => !validation.isComplete)
            .map((filteredValidation) => filteredValidation.condition),
        ],
      }
    : undefined;

  const updatedItems: OrderItem[] = updatedFirstItem
    ? [updatedFirstItem, ...order.items.slice(1)]
    : [];

  return <Order>{
    ...order,
    // AND of validConditions: intersection of conditions on ALL items
    validConditions: [
      ...updatedItems
        .map((item) => item.validConditions)
        .reduce<(keyof typeof OrderItemValidityCondition)[]>((prev, next) => {
          return prev.filter((value) => next.includes(value));
        }, []),
    ],
    // OR of item invalidConditions: unique conditions in the flattened array of all conditions
    invalidConditions: [
      ...new Set(updatedItems.flatMap((item) => item.invalidConditions.flat())),
    ],
    // AND of item completeConditions: intersection of conditions on ALL items
    completeConditions: [
      ...updatedItems
        .map((item) => item.completeConditions)
        .reduce<(keyof typeof OrderItemValidityCondition)[]>((prev, next) => {
          return prev.filter((value) => next.includes(value));
        }, []),
    ],
    // OR of item incompleteConditions: unique conditions in the flattened array of all conditions
    incompleteConditions: [
      ...new Set(
        updatedItems.flatMap((item) => item.incompleteConditions.flat()),
      ),
    ],
    items: [...updatedItems],
  };
};
