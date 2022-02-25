import { gql } from '@urql/core';

export const MUTATION_CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        items {
          id
          #modifiedProductVariation
          status
          validConditions
          invalidConditions
          completeConditions
          incompleteConditions
        }
        status
        validConditions
        invalidConditions
        completeConditions
        incompleteConditions
      }
    }
  }
`;

export const MUTATION_CREATE_MODIFIED_PRODUCT_VARIATION = gql`
  mutation CreateModifiedProductVariation($productVariationId: UUID!) {
    createModifiedProductVariation(
      input: { productVariationId: $productVariationId, modifications: [] }
    ) {
      modifiedProductVariation {
        id
      }
    }
  }
`;

export const MUTATION_ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($orderId: UUID!, $modifiedProductVariationId: UUID!) {
    addItemToOrder(
      input: {
        orderId: $orderId
        modifiedProductVariationId: $modifiedProductVariationId
      }
    ) {
      order {
        id
        items {
          id
          modifiedProductVariation {
            id
          }
          status
          validConditions
          invalidConditions
          completeConditions
          incompleteConditions
        }
        status
        validConditions
        invalidConditions
        completeConditions
        incompleteConditions
      }
    }
  }
`;

export const MUTATION_SET_ORDER_ITEM_MODIFIED_PRODUCT_VARIATION = gql`
  mutation SetOrderItemModifiedProductVariation(
    $orderId: UUID!
    $orderItemId: UUID!
    $modifiedProductVariationId: UUID!
  ) {
    setOrderItemModifiedProductVariation(
      input: {
        orderId: $orderId
        orderItemId: $orderItemId
        modifiedProductVariationId: $modifiedProductVariationId
      }
    ) {
      item {
        id
        status
        modifiedProductVariation {
          id
        }
      }
    }
  }
`;

export const MUTATION_REMOVE_ITEM_FROM_ORDER = gql`
  mutation RemoveItemFromOrder($orderId: UUID!, $orderItemId: UUID!) {
    removeItemFromOrder(
      input: { orderId: $orderId, orderItemId: $orderItemId }
    ) {
      orderItemId
      order {
        id
        items {
          id
          modifiedProductVariation {
            id
          }
          status
          validConditions
          invalidConditions
          completeConditions
          incompleteConditions
        }
        status
        validConditions
        invalidConditions
        completeConditions
        incompleteConditions
      }
    }
  }
`;

export const MUTATION_PRODUCE_ORDER = gql`
  mutation ProduceOrder(
    $orderId: UUID!
    $preferredProducerId: UUID!
    $delivererId: UUID!
  ) {
    produceOrder(
      input: {
        orderId: $orderId
        directDelivery: {
          preferredProducerId: $preferredProducerId
          delivererId: $delivererId
        }
      }
    ) {
      order {
        id
        items {
          id
          modifiedProductVariation {
            id
          }
          status
          validConditions
          invalidConditions
          completeConditions
          incompleteConditions
        }
        status
        validConditions
        invalidConditions
        completeConditions
        incompleteConditions
      }
    }
  }
`;
