import { ConditionValidation, Order } from '../../types/tmpTypes/entityTypes';

export const emptyOrder: Order = {
  id: '',
  items: [],
  status: [],
  validConditions: [],
  invalidConditions: [],
  completeConditions: [],
  incompleteConditions: [],
};

export const validValidations: ConditionValidation[] = [
  {
    condition: 'ComponentsAreAvailable',
    isComplete: true,
    isValid: true,
  },
  {
    condition: 'ModificationsAreValid',
    isComplete: true,
    isValid: true,
  },
  {
    condition: 'ProductVariationIsProducible',
    isComplete: true,
    isValid: true,
  },
];
