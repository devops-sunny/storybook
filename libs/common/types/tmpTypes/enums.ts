// These are all just duplicates of what is in the service code.
// It should all be replaced by generated GQL schema… once we get around to it

export enum OrderItemValidityCondition {
  ModificationsAreValid = 0,
  ComponentsAreAvailable = 1,
  ProductVariationIsProducible = 2,
}

export enum OrderItemStatus {
  Configuration = 'Configuration',

  ProductionReady = 'ProductionReady',
  ProductionQueued = 'ProductionQueued',
  ProductionInProgress = 'ProductionInProgress',
  ProductionSucceeded = 'ProductionSucceeded',
  ProductionFailed = 'ProductionFailed',
  ProductionAbandoned = 'ProductionAbandoned',

  DeliveryReady = 'DeliveryReady',
  DeliveryQueued = 'DeliveryQueued',
  DeliveryInProgress = 'DeliveryInProgress',
  DeliveryPresented = 'DeliveryPresented',
  DeliverySucceeded = 'DeliverySucceeded',
  DeliveryFailed = 'DeliveryFailed',
  DeliveryAbandoned = 'DeliveryAbandoned',
}

export type OrderItemValidityConditionKey =
  keyof typeof OrderItemValidityCondition;
export type OrderItemStatusKey = keyof typeof OrderItemStatus;
