import {
  ConditionValidation,
  Order,
} from '@bb/common/types/tmpTypes/entityTypes';

import { ChainableMockOrder } from '@bb/common/types/tmpTypes/chainableTypes';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { OrderSummaryModification } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { addItem } from './helpers/addItem';
import { emptyOrder } from '../staticMocks';
import { removeItem } from './helpers/removeItem';
import { updateAllItemsStatus } from './helpers/updateAllItemsStatus';
import { updateFirstItemStatus } from './helpers/updateFirstItemStatus';
import { updateIndexItemStatus } from './helpers/updateIndexItemStatus';
import { v4 as uuidv4 } from 'uuid';
import { validateAllItems } from './helpers/validateAllItems';
import { validateFirstItem } from './helpers/validateFirstItem';

export const mockOrder = (params?: { order: Order }): ChainableMockOrder => {
  let value: Order = params?.order
    ? { ...params.order }
    : {
        ...emptyOrder,
        id: uuidv4(),
      };

  const chainableOrder: ChainableMockOrder = {
    value: () => ({ ...value }),

    addItem: (params: {
      // modifiedProductVariationId: string;
      modifiedProductVariation: {
        id: string;
        productVariation: {
          id: string;
          name: string;
        };
        modifications?: Array<OrderSummaryModification>;
      };
    }): ChainableMockOrder => {
      const {
        modifiedProductVariation,
        modifiedProductVariation: { productVariation },
      } = params;
      value = {
        ...addItem({
          order: value,
          modifiedProductVariation: {
            id: modifiedProductVariation.id,
            productVariation: {
              id: productVariation.id,
              name: productVariation.name,
            },
            modifications: modifiedProductVariation.modifications ?? [],
          },
        }),
      };
      return chainableOrder;
    },

    removeItem: (params: { orderItemId: string }): ChainableMockOrder => {
      const { orderItemId } = params;
      value = { ...removeItem({ order: value, orderItemId }) };
      return chainableOrder;
    },

    updateAllItemsStatus: (params: {
      status: keyof typeof OrderItemStatus;
    }): ChainableMockOrder => {
      const { status } = params;
      value = { ...updateAllItemsStatus({ order: value, status }) };
      return chainableOrder;
    },

    // @TODO - revise to be updateOneItemStatus, taking an OrderItemId as parameter
    updateFirstItemStatus: (params: {
      status: keyof typeof OrderItemStatus;
    }): ChainableMockOrder => {
      const { status } = params;
      value = { ...updateFirstItemStatus({ order: value, status }) };
      return chainableOrder;
    },

    updateIndexItemStatus: (params: {
      index: number;
      status: keyof typeof OrderItemStatus;
    }): ChainableMockOrder => {
      const { index, status } = params;
      value = {
        ...updateIndexItemStatus({ order: value, itemIndex: index, status }),
      };
      return chainableOrder;
    },

    validateAllItems: (params: {
      validations: ConditionValidation[];
    }): ChainableMockOrder => {
      const { validations } = params;
      value = { ...validateAllItems({ order: value, validations }) };
      return chainableOrder;
    },

    validateFirstItem: (params: {
      validations: ConditionValidation[];
    }): ChainableMockOrder => {
      const { validations } = params;
      value = { ...validateFirstItem({ order: value, validations }) };
      return chainableOrder;
    },
  };

  return chainableOrder;
};
