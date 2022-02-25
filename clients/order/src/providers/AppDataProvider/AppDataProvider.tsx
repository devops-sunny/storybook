import {
  Kiosk,
  KioskMenus,
  Menu,
} from '@bb/common/types/tmpTypes/menuEntityTypes';
import {
  QUERY_KIOSK_MENUS,
  QUERY_MAIN_MENU,
  QUERY_ORDER,
  QUERY_SUB_MENUS,
} from '../../gql/queries';
import React, { createContext, useContext, useEffect, useMemo } from 'react';

import { AppDataProviderDebug } from './AppDataProviderDebug';
import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { mockAppDynamicConfig } from '@bb/common/appConfig/mockAppDynamicConfig';
import { useInterval } from 'react-use';
import { useQuery } from 'urql';
import { useState } from 'react';

type AppData = {
  storefrontId: string;
  storefrontName: string;
  producerId: string;
  producerSerial: string;
  currentOrder: Order | undefined;
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  kioskMenus: KioskMenus | undefined;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

type AppDataProviderProps = {
  storefrontId: string;
  storefrontName: string;
  producerId: string;
  producerSerial: string;
  order?: Order;
  kioskMenus?: KioskMenus;
  debug?: boolean;
};

export function AppDataProvider(
  props: React.PropsWithChildren<AppDataProviderProps>,
) {
  const {
    children,
    storefrontId,
    storefrontName,
    producerId,
    producerSerial,
    order,
  } = props;
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(order);
  const [pollingKey, setPollingKey] = useState<string>(Date.now().toString());

  // order state from GQL
  const [
    { data: orderData, fetching: orderFetching, error: orderError },
    executeOrderQuery,
  ] = useQuery<{
    order: Order | undefined;
  }>({
    query: QUERY_ORDER,
    variables: {
      id: currentOrder?.id || order?.id,
      pollingKey: pollingKey,
    },
    requestPolicy: 'network-only',
    pause: !currentOrder ? true : false,
  });

  // poll the current order
  useInterval(
    () => {
      // by default urql only sends a new query if variables have changed
      // so we change a key on every polling interval, which is the timestamp when the interval is called
      setPollingKey(Date.now().toString());
    },
    currentOrder ? 2000 : null,
  );

  // update provided order data state on GQL update
  useEffect(() => {
    if (orderData?.order) {
      setCurrentOrder({ ...orderData.order });
    }
  }, [orderData?.order]);

  // menu from GQL
  const [kioskMenusResult, reexecuteKioskMenusQuery] = useQuery<{
    kiosk: Kiosk;
  }>({
    query: QUERY_KIOSK_MENUS,
    variables: {
      kioskId: 'foo', // @TODO - use the app config storefront ID
      // doing so tightly couples this component with the AppConfigProvider, and requires refactoring of unit tests
    },
  });
  const {
    data: kioskMenusData,
    fetching: kioskMenusFetching,
    error: kioskMenusError,
  } = kioskMenusResult;

  const [mainMenuResult, reexecuteMainMenuQuery] = useQuery<{
    mainMenu: Menu;
  }>({
    query: QUERY_MAIN_MENU,
    variables: {
      menuId: kioskMenusData?.kiosk?.mainMenu.id,
    },
    pause: true,
  });
  const {
    data: mainMenuData,
    fetching: mainMenuFetching,
    error: mainMenuError,
  } = mainMenuResult;

  const [subMenusResult, reexecuteSubMenusQuery] = useQuery<{
    subMenus: Menu[];
  }>({
    query: QUERY_SUB_MENUS,
    variables: {
      menuIds: kioskMenusData?.kiosk?.mainMenu.items.map((item) => item.id),
    },
    pause: true,
  });
  const {
    data: subMenusData,
    fetching: subMenusFetching,
    error: subMenusError,
  } = subMenusResult;

  // secondary GQL queries fire when kiosk query returns
  useEffect(() => {
    if (!props.kioskMenus) {
      // only query if not supplied as a prop (as in tests)
      reexecuteMainMenuQuery();
      reexecuteSubMenusQuery();
    }
  }, [
    kioskMenusData?.kiosk?.mainMenu.id,
    reexecuteMainMenuQuery,
    reexecuteSubMenusQuery,
    props.kioskMenus,
  ]);

  // memoize the provider state
  const value = useMemo<AppData>(
    () => ({
      storefrontId,
      storefrontName,
      producerId,
      producerSerial,
      currentOrder,
      setCurrentOrder,
      kioskMenus:
        mainMenuData && subMenusData
          ? {
              mainMenu: mainMenuData?.mainMenu,
              subMenus: subMenusData?.subMenus.reduce(
                (map: Record<string, Menu>, subMenu: Menu) => {
                  map[subMenu.id] = subMenu;
                  return map;
                },
                {},
              ),
            }
          : props.kioskMenus, // fallback to props value instead of GQL (for unit tests)
    }),
    [
      storefrontId,
      storefrontName,
      producerId,
      producerSerial,
      currentOrder,
      setCurrentOrder,
      mainMenuData,
      subMenusData,
      props.kioskMenus,
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

export const MockedAppDataProvider: React.FunctionComponent<
  Partial<AppDataProviderProps>
> = (props) => {
  const { children, ...rest } = props;
  return (
    <AppDataProvider {...mockAppDynamicConfig} {...rest}>
      {props.children}
    </AppDataProvider>
  );
};
