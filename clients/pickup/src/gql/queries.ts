import { gql } from '@urql/core';

export const QUERY_ORDERS = gql`
  query Orders($storefrontId: UUID!) {
    orders(filter: { storefrontId: $storefrontId }) {
      id
      directDelivery {
        preferredProducerId
      }
      items {
        delivererId
        id
        modifiedProductVariation {
          id
          productVariation {
            id
            name
          }
          modifications {
            component {
              id
              name
            }
          }
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
`;

export const QUERY_USER = gql`
  query {
    user {
      presentAt
      identified
      producerId
      id
      orderId
    }
  }
`;
