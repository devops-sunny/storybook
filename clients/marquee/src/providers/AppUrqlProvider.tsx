import {
  OrderListDocument,
  OrderListQuery,
  OrderListQueryVariables,
  OrderListUpdateSubscription,
} from '@bb/marquee/generated/graph';
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
import { isNotNullish } from '@bb/common';
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
          cacheExchange({
            updates: {
              Subscription: {
                orderStatusUpdated(
                  { orderStatusUpdated }: OrderListUpdateSubscription,
                  { storefrontId },
                  cache,
                ) {
                  if (typeof storefrontId === 'string') {
                    cache.updateQuery<OrderListQuery, OrderListQueryVariables>(
                      {
                        query: OrderListDocument,
                        variables: { storefrontId },
                      },
                      (data) => {
                        if (
                          !data?.orders
                            .filter(isNotNullish)
                            .some(({ id }) => id === orderStatusUpdated.id)
                        ) {
                          data?.orders.push(orderStatusUpdated);
                        }
                        return data;
                      },
                    );
                  }
                },
              },
            },
          }),
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
