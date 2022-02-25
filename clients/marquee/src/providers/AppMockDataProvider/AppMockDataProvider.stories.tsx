import {
  AppMockDataSubjectsProvider,
  useAppMockDataSubjects,
} from './AppMockDataSubjectsProvider';
import { Box, Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { QUERY_ORDERS, QUERY_USERS } from '@bb/marquee/gql/queries';
import { gql, useQuery } from 'urql';

import { AppMockDataProvider } from './AppMockDataProvider';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { mockUsersResponse } from '@bb/common/fixtures/users/mockUsersResponse';
import { updateAllOrdersDeliveryCompleted } from './helpers/updateAllOrdersDeliveryCompleted';
import { updateFirstOrderDeliveryStarted } from './helpers/updateOrderDeliveryStarted';
import { updateFirstOrderReadyForDelivery } from './helpers/updateOrderReadyForDelivery';
import { useMount } from 'react-use';

const meta: Meta = {
  title: 'Marquee App/Mock Data Provider',
};

export default meta;

export const MockedOrdersQuery: Story = () => {
  return (
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppMockDataConsumerExampleOrders />
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>
  );
};

const AppMockDataConsumerExampleOrders: React.FunctionComponent<{}> = (
  props,
) => {
  const { pushGetOrdersResponse, pushGetUsersResponse } =
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

  const setOrderReadyForDelivery = () => {
    if (ordersData) {
      pushGetOrdersResponse(
        updateFirstOrderReadyForDelivery(ordersData.orders),
      );
    }
  };

  const setOrderDeliveryStarted = () => {
    if (ordersData) {
      pushGetOrdersResponse(updateFirstOrderDeliveryStarted(ordersData.orders));
    }
  };

  const setAllOrdersDeliveryCompleted = () => {
    if (ordersData) {
      pushGetOrdersResponse(
        updateAllOrdersDeliveryCompleted(ordersData.orders),
      );
    }
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
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setOrderReadyForDelivery}>
          Set Order Ready for Delivery
        </Button>
        <Button onClick={setOrderDeliveryStarted}>
          Set Order Delivery Started
        </Button>
        <Button onClick={setAllOrdersDeliveryCompleted}>
          Set All Orders Delivery Completed
        </Button>
        <Button onClick={clearOrders}>Clear Orders</Button>
      </Box>
    </Box>
  );
};

export const MockedUsersQuery: Story = () => {
  return (
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppMockDataConsumerExampleUsers />
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>
  );
};

const AppMockDataConsumerExampleUsers: React.FunctionComponent<{}> = (
  props,
) => {
  const { pushGetUsersResponse } = useAppMockDataSubjects();
  const [usersResult, reexecuteUsersQuery] = useQuery<{ users: User[] }>({
    query: QUERY_USERS,
  });
  const {
    data: usersData,
    fetching: usersFetching,
    error: usersError,
  } = usersResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteUsersQuery();
  });

  const setNewUserEntersProximity = () => {
    if (usersData) {
      const previousUsers: User[] = usersData.users || [];
      pushGetUsersResponse(
        mockUsersResponse({
          users: [...previousUsers, mockUser().createWalkupUser().value()],
        }),
      );
    }
  };

  const setAllUsersUpdatePresence = () => {
    if (usersData) {
      pushGetUsersResponse(
        mockUsersResponse({
          users: usersData.users.map((user) =>
            mockUser({ user }).updatePresent().value(),
          ),
        }),
      );
    }
  };

  const clearUsers = () => {
    pushGetUsersResponse({
      data: {
        users: [],
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
        <pre>{JSON.stringify(usersData, null, 2)}</pre>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setNewUserEntersProximity}>
          Set New User Enters Proximity
        </Button>
        <Button onClick={setAllUsersUpdatePresence}>
          Set All Users Update Presence
        </Button>
        <Button onClick={clearUsers}>Clear Users</Button>
      </Box>
    </Box>
  );
};

export const RealDataRequest: Story = () => {
  return (
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <NotMockedQueryExample />
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>
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
