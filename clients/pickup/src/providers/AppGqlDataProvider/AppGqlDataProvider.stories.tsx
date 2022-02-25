import { Box, Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { QUERY_ORDERS, QUERY_USER } from '@bb/pickup/gql/queries';
import { gql, useQuery } from 'urql';

import { MockedAppGqlProviders } from '../withProviders';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { useAppMockDataSubjects } from './AppMockDataSubjectsProvider';
import { useMount } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

const meta: Meta = {
  title: 'Pickup App/Mock Data Provider',
};

export default meta;

export const MockedOrdersQuery: Story = () => {
  return (
    <MockedAppGqlProviders>
      <AppMockDataConsumerExampleOrders />
    </MockedAppGqlProviders>
  );
};

const AppMockDataConsumerExampleOrders: React.FunctionComponent<{}> = (
  props,
) => {
  const { pushGetOrdersResponse, pushGetUserResponse: pushGetUsersResponse } =
    useAppMockDataSubjects();
  const [ordersResult, reexecuteOrdersQuery] = useQuery<{ orders: Order[] }>({
    query: QUERY_ORDERS,
  });
  const {
    data: ordersData,
    fetching: ordersFetching,
    error: ordersError,
  } = ordersResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteOrdersQuery();
  });

  const setWalkupOrderBeginsProduction = () => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder()
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: { id: uuidv4(), name: `product-variation-1` },
              },
            })
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: { id: uuidv4(), name: `product-variation-2` },
              },
            })
            .validateAllItems({ validations: [...validValidations] })
            .updateAllItemsStatus({ status: 'ProductionReady' })
            .value(),
        ],
      },
    });
  };

  const setItemProductionInProgress = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder({ order })
            .updateIndexItemStatus({ index, status: 'ProductionInProgress' })
            .value(),
        ],
      },
    });
  };

  const setItemProductionCompleted = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder({ order })
            .updateIndexItemStatus({ index, status: 'ProductionSucceeded' })
            .value(),
        ],
      },
    });
  };

  const setItemDeliveryInProgress = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder({ order })
            .updateIndexItemStatus({ index, status: 'DeliveryInProgress' })
            .value(),
        ],
      },
    });
  };

  const setItemDeliveryCompleted = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder({ order })
            .updateIndexItemStatus({ index, status: 'DeliverySucceeded' })
            .value(),
        ],
      },
    });
  };

  const setAppOrderCompletesProduction = () => {
    pushGetOrdersResponse({
      data: {
        orders: [
          mockOrder()
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: { id: uuidv4(), name: `product-variation-1` },
              },
            })
            .addItem({
              modifiedProductVariation: {
                id: uuidv4(),
                productVariation: { id: uuidv4(), name: `product-variation-2` },
              },
            })
            .validateAllItems({ validations: [...validValidations] })
            .updateAllItemsStatus({ status: 'DeliveryReady' })
            .value(),
        ],
      },
    });
  };

  const clearOrders = () => {
    pushGetOrdersResponse({
      data: {
        orders: [],
      },
    });
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(ordersData, null, 2)}</pre>
      </Box>
      <pre>Walk-up Order</pre>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setWalkupOrderBeginsProduction}>
          Walk-up Order Begins Production
        </Button>
        <Button onClick={clearOrders}>Clear Orders</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemProductionInProgress(ordersData.orders[0], 0);
          }}>
          First Item to Production In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemProductionCompleted(ordersData.orders[0], 0);
          }}>
          First Item to Production Completed
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryInProgress(ordersData.orders[0], 0);
          }}>
          First Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryCompleted(ordersData.orders[0], 0);
          }}>
          First Item to Delivery Completed
        </Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemProductionInProgress(ordersData.orders[0], 1);
          }}>
          Last Item to Production In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemProductionCompleted(ordersData.orders[0], 1);
          }}>
          Last Item to Production Completed
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryInProgress(ordersData.orders[0], 1);
          }}>
          Last Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryCompleted(ordersData.orders[0], 1);
          }}>
          Last Item to Delivery Completed
        </Button>
      </Box>
      <pre>App Order</pre>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setAppOrderCompletesProduction}>
          App Order Completes Production
        </Button>
        <Button onClick={clearOrders}>Clear Orders</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryInProgress(ordersData.orders[0], 0);
          }}>
          First Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryCompleted(ordersData.orders[0], 0);
          }}>
          First Item to Delivery Completed
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryInProgress(ordersData.orders[0], 1);
          }}>
          Last Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (ordersData?.orders[0])
              setItemDeliveryCompleted(ordersData.orders[0], 1);
          }}>
          Last Item to Delivery Completed
        </Button>
      </Box>
    </Box>
  );
};

export const MockedUserQuery: Story = () => {
  return (
    <MockedAppGqlProviders>
      <AppMockDataConsumerExampleUser />
    </MockedAppGqlProviders>
  );
};

const AppMockDataConsumerExampleUser: React.FunctionComponent<{}> = (props) => {
  const { pushGetUserResponse: pushGetUsersResponse } =
    useAppMockDataSubjects();
  const [usersResult, reexecuteUsersQuery] = useQuery<{
    user: User | undefined;
  }>({
    query: QUERY_USER,
  });
  const {
    data: userData,
    fetching: usersFetching,
    error: usersError,
  } = usersResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteUsersQuery();
  });

  const setWalkupUserSession = () => {
    pushGetUsersResponse({
      data: {
        user: mockUser().createWalkupUser().value(),
      },
    });
  };

  const setAnonymousUserSession = () => {
    pushGetUsersResponse({
      data: {
        user: mockUser().value(),
      },
    });
  };

  const setPickupUserSession = () => {
    pushGetUsersResponse({
      data: {
        user: mockUser().createAppUser().value(),
      },
    });
  };

  const clearUserSession = () => {
    pushGetUsersResponse({
      data: {
        user: undefined,
      },
    });
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setWalkupUserSession}>
          Set Walk-up Production Session
        </Button>
        <Button onClick={clearUserSession}>Clear User Session</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setAnonymousUserSession}>
          Set Anonymous Pickup Session (App)
        </Button>
        <Button onClick={setPickupUserSession}>
          Set Identified Pickup Session (App)
        </Button>
        <Button onClick={clearUserSession}>Clear User Session</Button>
      </Box>
    </Box>
  );
};

export const RealDataRequest: Story = () => {
  return (
    <MockedAppGqlProviders>
      <NotMockedQueryExample />
    </MockedAppGqlProviders>
  );
};

const NotMockedQueryExample: React.FunctionComponent<{}> = (props) => {
  const [result, reexecuteQuery] = useQuery<{ orders: string[] }>({
    query: gql`
      query {
        products {
          id
          name
        }
      }
    `,
  });

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Box>
    </Box>
  );
};
