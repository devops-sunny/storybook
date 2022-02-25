import { Client, Provider, createClient } from 'urql';
import { QUERY_ORDERS, QUERY_USERS } from '@bb/marquee/gql/queries';

import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';
import { useAppConfig } from '@bb/common';
import { useAppMockDataSubjects } from './AppMockDataSubjectsProvider';
import { useMemo } from 'react';

export const AppMockDataProvider: React.FunctionComponent<{}> = (props) => {
  const { children } = props;
  const {
    getOrdersStream,
    pushGetOrdersResponse,
    getUsersStream,
    pushGetUsersResponse,
  } = useAppMockDataSubjects();

  const client = useMemo(() => {
    const realClient: Client = createClient({
      url: mockAppStaticConfig.services.gateway.gql.endpoint,
    });
    const mockClient: any = {
      ...realClient,
      executeQuery: (req: any) => {
        const { query } = req;
        switch (query) {
          // explicitly mock queries "by name"
          case QUERY_ORDERS:
            // set default value
            pushGetOrdersResponse({
              data: {
                orders: [],
              },
            });
            // return a stream to which we can push more responses later
            return getOrdersStream;
          case QUERY_USERS:
            // set default value
            pushGetUsersResponse({
              data: {
                users: [],
              },
            });
            // return a stream to which we can push more responses later
            return getUsersStream;
          // otherwise, use the real client!
          default:
            return realClient.executeQuery(req);
        }
      },
    };
    return mockClient;
  }, [
    getOrdersStream,
    pushGetOrdersResponse,
    getUsersStream,
    pushGetUsersResponse,
  ]);

  return <Provider value={client}>{children}</Provider>;
};
