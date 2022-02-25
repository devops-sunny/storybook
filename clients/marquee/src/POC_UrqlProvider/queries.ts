import { TypedDocumentNode, gql } from '@urql/core';

export const GET_ORDERS: TypedDocumentNode = gql`
  query {
    orders
  }
`;
