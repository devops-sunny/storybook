import { ConditionValidation, Order, Producer, User } from './entityTypes';

import { OrderItemStatus } from './enums';
import { OrderSummaryModification } from './orderItemDetailTypes';

export type ChainableMockProducer = {
  value: () => Producer;
  updateHeartbeat: () => ChainableMockProducer;
};

export type ChainableMockUser = {
  value: () => User;
  createAppUser: () => ChainableMockUser;
  createWalkupUser: () => ChainableMockUser;
  updatePresent: () => ChainableMockUser;
};

export type ChainableMockOrder = {
  value: () => Order;
  addItem: (params: {
    modifiedProductVariation: {
      id: string;
      productVariation: {
        id: string;
        name: string;
      };
      modifications?: Array<OrderSummaryModification>;
    };
  }) => ChainableMockOrder;
  removeItem: (params: { orderItemId: string }) => ChainableMockOrder;
  validateAllItems: (params: {
    validations: ConditionValidation[];
  }) => ChainableMockOrder;
  validateFirstItem: (params: {
    validations: ConditionValidation[];
  }) => ChainableMockOrder;
  updateIndexItemStatus: (params: {
    index: number;
    status: keyof typeof OrderItemStatus;
  }) => ChainableMockOrder;
  updateAllItemsStatus: (params: {
    status: keyof typeof OrderItemStatus;
  }) => ChainableMockOrder;
  updateFirstItemStatus: (params: {
    status: keyof typeof OrderItemStatus;
  }) => ChainableMockOrder;
};
