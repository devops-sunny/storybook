import { Client, Provider, createClient } from 'urql';

import { GET_ORDERS } from './queries';
import { useMemo } from 'react';
import { usePocUrqlSubjectsProvider } from './POC_UrqlSubjectsProvider';

export const POC_UrqlProvider: React.FunctionComponent<{}> = (props) => {
  const { children } = props;
  const { getOrdersStream, pushGetOrdersResponse } =
    usePocUrqlSubjectsProvider();

  const client = useMemo(() => {
    const realClient: Client = createClient({
      url: 'localhost:3000/graphql',
    });
    const mockClient: any = {
      ...realClient,
      executeQuery: (req: any) => {
        const { query } = req;
        switch (query) {
          // explicitly mock queries "by name"
          case GET_ORDERS:
            // set default value
            pushGetOrdersResponse({
              data: {
                orders: [],
              },
            });
            // return a stream to which we can push more responses later
            return getOrdersStream;
          // otherwise, use the real client!
          default:
            return realClient.executeQuery;
        }
      },
    };
    return mockClient;
  }, [getOrdersStream, pushGetOrdersResponse]);

  return <Provider value={client}>{children}</Provider>;
};
