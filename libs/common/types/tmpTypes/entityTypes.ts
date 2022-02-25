// These are all just duplicates of what is in the service code.
// It should all be replaced by generated GQL schema… once we get around to it

// import { ModifiedProductVariation } from "@bb/order/generated/graph";
import {
  OrderItemStatus,
  OrderItemStatusKey,
  OrderItemValidityCondition,
  OrderItemValidityConditionKey,
} from './enums';

import { OrderSummaryModification } from './orderItemDetailTypes';

export type Order = {
  id: string;
  directDelivery?: {
    preferredProducerId: string;
  };
  status: OrderItemStatusKey[];
  items: OrderItem[];
  validConditions: OrderItemValidityConditionKey[];
  invalidConditions: OrderItemValidityConditionKey[];
  completeConditions: OrderItemValidityConditionKey[];
  incompleteConditions: OrderItemValidityConditionKey[];
  updatedAt?: Date;
  name?: string;
};

export type OrderItem = {
  id: string;
  modifiedProductVariation: {
    id: string;
    productVariation: {
      id: string;
      name: string;
    };
    // @TODO - ingest Modification type
    modifications: Array<OrderSummaryModification>;
  };
  status: OrderItemStatusKey;
  validConditions: OrderItemValidityConditionKey[];
  invalidConditions: OrderItemValidityConditionKey[];
  completeConditions: OrderItemValidityConditionKey[];
  incompleteConditions: OrderItemValidityConditionKey[];
};

export type User = {
  presentAt: Date; // when user was last sensed present at the kiosk
  identified: boolean; // whether the user is identified (walk-ups are anonymous identified)
  producerId?: string; // at which producer is the user identified
  id?: string; // user's id (undefined for walkup users)
  orderId?: string; // the order associated with an identified user's session
};

export type ConditionValidation = {
  condition: keyof typeof OrderItemValidityCondition;
  isValid: boolean;
  isComplete: boolean;
};

export type Producer = {
  id: string;
  heartbeatAt: Date;
};
