import { Client, GraphQLRequest, Provider, createClient } from 'urql';
import { QUERY_ORDERS, QUERY_USER } from '@bb/pickup/gql/queries';

import { never } from 'wonka';
import { useAppMockDataSubjects } from './AppMockDataSubjectsProvider';
import { useMemo } from 'react';

type AppGqlDataProviderProps = {
  gqlEndpoint: string;
  mock?: boolean;
  // optional mock functions allow for white-box-testing assertions of queries or mutations
  mockQueryFn?: (req: GraphQLRequest) => any;
  mockMutationFn?: (req: GraphQLRequest) => any;
};

/*
 * This component handles real AND mock GQL requests/responses
 * In `mock` mode, it uses mock GQL responses ONLY.
 * Otherwise, it blends together 1) mocked responses (for welcome-listed queries/mutations) and 2) real requests (for unmatched queries/mutations).
 */
export const AppGqlDataProvider: React.FunctionComponent<AppGqlDataProviderProps> =
  (props) => {
    const { gqlEndpoint, children, mock, mockQueryFn, mockMutationFn } = props;
    const {
      getOrdersStream,
      pushGetOrdersResponse,
      getUserStream,
      pushGetUserResponse,
    } = useAppMockDataSubjects();

    const client = useMemo(() => {
      const realClient: Client = !mock
        ? createClient({
            // use the gateway GQL endpoint from props (which comes from config.json in the app)
            url: gqlEndpoint,
          })
        : ({
            // an empty mock client for tests
            executeQuery: (req: any) => {
              if (mockQueryFn) return mockQueryFn(req);
              return never;
            },
            executeMutation: (req: any) => {
              if (mockMutationFn) return mockMutationFn(req);
              return never;
            },
          } as any);
      const mockClient: any = {
        ...realClient,
        executeQuery: (req: any) => {
          const { query } = req;
          switch (query) {
            // explicitly mock queries "by name"
            case QUERY_ORDERS:
              if (mock) {
                // set default value
                // pushGetOrdersResponse({
                //   data: {
                //     orders: [],
                //   },
                // });
                // return a stream to which we can push more responses later
                return getOrdersStream;
              } else {
                return realClient.executeQuery(req);
              }
            case QUERY_USER:
              // set default value
              pushGetUserResponse({
                data: {
                  user: undefined,
                },
              });
              // return a stream to which we can push more responses later
              return getUserStream;
            // otherwise, use the real client!
            default:
              return realClient.executeQuery(req);
          }
        },
      };
      return mockClient;
    }, [
      gqlEndpoint,
      mock,
      mockQueryFn,
      mockMutationFn,
      getOrdersStream,
      pushGetOrdersResponse,
      getUserStream,
      pushGetUserResponse,
    ]);

    return <Provider value={client}>{children}</Provider>;
  };
