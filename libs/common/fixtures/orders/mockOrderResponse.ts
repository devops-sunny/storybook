import {
  ConditionValidation,
  Order,
  OrderItem,
} from '../../types/tmpTypes/entityTypes';
import {
  OrderItemStatus,
  OrderItemValidityCondition,
} from '../../types/tmpTypes/enums';

import { mockOrder } from './mockOrder/mockOrder';

// @TODO - add the basic function `mockOrderResponse({order})`

export const mockOrderResponseAfterAllOrderItemStatusUpdate = (params: {
  order: Order;
  status: keyof typeof OrderItemStatus;
}) => {
  const { order, status } = params;

  return {
    data: {
      order: {
        ...mockOrder({ order }).updateAllItemsStatus({ status }).value(),
      },
    },
  };
};

// override the fulfillment status with the provided status on the FIRST order item only
export const mockOrderResponseAfterOneOrderItemStatusUpdate = (params: {
  order: Order;
  status: keyof typeof OrderItemStatus;
}) => {
  const { order, status } = params;

  return {
    data: {
      order: {
        ...mockOrder({ order }).updateFirstItemStatus({ status }).value(),
      },
    },
  };
};

// override the validation status with the provided validations on ALL order items
export const mockOrderResponseAfterAllValidationStatusUpdate = (params: {
  order: Order;
  validations: ConditionValidation[];
}) => {
  const { order, validations } = params;

  return {
    data: {
      order: {
        ...mockOrder({ order }).validateAllItems({ validations }).value(),
      },
    },
  };
};

// override the validation status with the provided validations on the FIRST order item only
export const mockOrderResponseAfterOneValidationStatusUpdate = (params: {
  order: Order;
  validations: ConditionValidation[];
}) => {
  const { order, validations } = params;

  return {
    data: {
      order: {
        ...mockOrder({ order }).validateFirstItem({ validations }).value(),
      },
    },
  };
};
