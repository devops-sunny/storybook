import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import { QUERY_ORDERS, QUERY_USER } from '@bb/pickup/gql/queries';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AppDataProviderDebug } from './AppDataProviderDebug';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { useInterval } from 'react-use';
import { useQuery } from 'urql';

export type AppDataValue = {
  storefrontId: string;
  storefrontName: string;
  producerId: string;
  producerSerial: string;
  orders: Order[];
  user?: User;
  currentOrder?: Order;
  currentOrderId?: string;
  setCurrentOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type AppDataProviderProps = {
  storefrontId: string;
  storefrontName: string;
  producerId: string;
  producerSerial: string;
  orders: Order[];
  user?: User;
  debug?: boolean;
};

const AppDataContext = createContext<AppDataValue | undefined>(undefined);

export function AppDataProvider(
  props: React.PropsWithChildren<AppDataProviderProps>,
) {
  const {
    children,
    storefrontId,
    storefrontName,
    producerId,
    producerSerial,
    orders: mockOrders,
    user: mockUser,
  } = props;
  const [pollingKey, setPollingKey] = useState<string>(Date.now().toString());
  const [currentOrderId, setCurrentOrderId] = useState<string | undefined>(
    undefined,
  );

  // state from GQL
  const [ordersResult, reexecuteOrdersQuery] = useQuery<{ orders: Order[] }>({
    query: QUERY_ORDERS,
    variables: {
      storefrontId,
      pollingKey,
    },
    requestPolicy: 'network-only',
  });
  const {
    data: ordersData,
    fetching: ordersFetching,
    error: ordersError,
  } = ordersResult;
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

  // this is the state for the app
  const [orders, setOrders] = useState<AppDataProviderProps['orders']>(
    mockOrders || [],
  );
  const [user, setUser] = useState<AppDataProviderProps['user']>(
    mockUser || undefined,
  );

  // poll the current order
  useInterval(() => {
    // by default urql only sends a new query if variables have changed
    // so we change a key on every polling interval, which is the timestamp when the interval is called
    setPollingKey(Date.now().toString());
  }, 2000);

  const currentOrder = useMemo(() => {
    // if an order is direct delivery AND the preferredProducer is THIS producer AND its id is the currentOrderId
    const directDeliveryOrder = orders.find(
      (order) =>
        order.directDelivery?.preferredProducerId === producerId &&
        order.id === currentOrderId,
    );
    if (directDeliveryOrder) return directDeliveryOrder;
    if (user?.identified) {
      return orders?.find((o) => o.id === user.orderId);
    }
  }, [orders, user, producerId, currentOrderId]);

  // update provided data state on GQL update
  useEffect(() => {
    if (ordersData) {
      // filter orders to track only those that are active
      // do not include no-status, Configuration, DeliveryCompleted, DeliveryFailed, ProductionAbandoned, DeliveryAbandoned
      const activeStatuses = [
        OrderItemStatus.ProductionReady,
        OrderItemStatus.ProductionQueued,
        OrderItemStatus.ProductionInProgress,
        OrderItemStatus.ProductionSucceeded,
        OrderItemStatus.ProductionFailed,
        OrderItemStatus.DeliveryReady,
        OrderItemStatus.DeliveryQueued,
        OrderItemStatus.DeliveryInProgress,
        OrderItemStatus.DeliveryPresented,
      ];
      const terminalStatuses = [
        OrderItemStatus.DeliverySucceeded,
        OrderItemStatus.DeliveryFailed,
      ];
      const activeAndTerminalStatuses = [
        ...activeStatuses,
        ...terminalStatuses,
      ];
      const filteredOrders = ordersData.orders.filter((order) => {
        return activeAndTerminalStatuses.some((status) =>
          order.status.includes(status),
        );
      });
      setOrders([...filteredOrders]);
      // if an order is direct delivery AND the preferredProducer is THIS producer AND its id is the currentOrderId
      const directDeliveryOrder = ordersData.orders.find(
        (order) =>
          order.directDelivery?.preferredProducerId === producerId &&
          activeStatuses.some((status) => order.status.includes(status)),
      );
      if (directDeliveryOrder) setCurrentOrderId(directDeliveryOrder.id);
    }
  }, [ordersData, ordersData?.orders, producerId, setCurrentOrderId]);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData, userData?.user]);

  // useMemo for the provided state
  const value = useMemo<AppDataValue>(
    () => ({
      storefrontId,
      storefrontName,
      producerId,
      producerSerial,
      orders,
      user,
      currentOrder,
      currentOrderId,
      setCurrentOrderId,
    }),
    [
      orders,
      user,
      currentOrder,
      storefrontId,
      storefrontName,
      producerId,
      producerSerial,
      currentOrderId,
      setCurrentOrderId,
    ],
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
