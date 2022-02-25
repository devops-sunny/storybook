import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { QUERY_ORDERS, QUERY_USERS } from '../gql/queries';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AppDataProviderDebug } from './AppDataProviderDebug';
import { useQuery } from 'urql';

export type Producer = {
  id: string;
};

type AppDataValue = {
  orders: Order[];
  users: User[];
};

export type AppDataProviderProps = {
  orders: Order[];
  users: User[];
  producers?: Array<Producer>;
  debug?: boolean;
};

const AppDataContext = createContext<AppDataValue | undefined>(undefined);

export function AppDataProvider(
  props: React.PropsWithChildren<AppDataProviderProps>,
) {
  const { children } = props;
  // state from GQL
  const [ordersResult, reexecuteOrdersQuery] = useQuery<{ orders: Order[] }>({
    query: QUERY_ORDERS,
  });
  const {
    data: ordersData,
    fetching: ordersFetching,
    error: ordersError,
  } = ordersResult;
  const [usersResult, reexecuteUsersQuery] = useQuery<{ users: User[] }>({
    query: QUERY_USERS,
  });
  const {
    data: usersData,
    fetching: usersFetching,
    error: usersError,
  } = usersResult;

  // useState goes here
  const [orders, setOrders] = useState<AppDataProviderProps['orders']>(
    props.orders || [],
  );
  const [users, setUsers] = useState<AppDataProviderProps['users']>(
    props.users || [],
  );
  const [producers, setProducers] = useState<AppDataProviderProps['producers']>(
    props.producers || [],
  );

  // update provided data state on GQL update
  useEffect(() => {
    if (ordersData) {
      setOrders([...ordersData.orders]);
    }
  }, [ordersData, ordersData?.orders]);
  useEffect(() => {
    if (usersData) {
      setUsers([...usersData.users]);
    }
  }, [usersData, usersData?.users]);

  // useMemo for the state
  const value = useMemo<AppDataValue>(
    () => ({
      orders,
      users,
      producers,
      setProducers,
    }),
    [orders, users, producers, setProducers],
  );

  return (
    <AppDataContext.Provider value={value}>
      {props.debug ? <AppDataProviderDebug /> : null}
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppDataContext() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error(
      'useAppDataContext must be used in descendent of AppDataProvider',
    );
  }
  return context;
}
