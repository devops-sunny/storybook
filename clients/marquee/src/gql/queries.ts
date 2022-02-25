import { gql } from '@urql/core';

export const QUERY_ORDERS = gql`
  query {
    orders {
      id
      items {
        id
        modifiedProductVariation
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
export const QUERY_USERS = gql`
  query {
    users {
      presentAt
      identified
      producerId
      id
      orderId
    }
  }
`;
