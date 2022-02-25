import {
  Provider,
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql';
import React, { useMemo } from 'react';

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import { useAppStaticConfig } from '@bb/common/appConfig/AppStaticConfigProvider';

export const AppUrqlProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const {
    services: {
      gateway: {
        gql: { endpoint, subscriptionEndpoint },
      },
    },
  } = useAppStaticConfig();

  const subscriptionClient = useMemo(
    () =>
      new SubscriptionClient(subscriptionEndpoint, {
        reconnect: true,
      }),
    [subscriptionEndpoint],
  );

  const value = useMemo(
    () =>
      createClient({
        url: endpoint,
        exchanges: [
          devtoolsExchange,
          dedupExchange,
          cacheExchange(),
          fetchExchange,
          subscriptionExchange({
            forwardSubscription(operation) {
              return subscriptionClient.request(operation);
            },
          }),
        ],
      }),
    [endpoint, subscriptionClient],
  );
  return <Provider value={value}>{children}</Provider>;
};
