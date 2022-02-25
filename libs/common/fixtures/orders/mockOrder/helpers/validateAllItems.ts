import {
  ConditionValidation,
  Order,
} from '@bb/common/types/tmpTypes/entityTypes';

export const validateAllItems = (params: {
  order: Order;
  validations: ConditionValidation[];
}): Order => {
  const { order, validations } = params;

  const updatedItems = order.items.map((item) => {
    return {
      ...item,
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
    };
  });

  return {
    ...order,
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
    items: [...updatedItems],
  };
};
