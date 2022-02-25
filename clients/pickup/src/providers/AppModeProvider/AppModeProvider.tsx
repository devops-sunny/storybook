import React, { createContext, useContext, useMemo, useState } from 'react';

import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { useAppDataContext } from '../AppDataProvider/AppDataProvider';
import { useAppFeatureFlags } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';

export enum AppMode {
  Production = 'Production',
  Idle = 'Idle',
  Attract = 'Attract',
  Greet = 'Greet',
  Delivery = 'Delivery',
}

type AppModeValue = {
  mode: AppMode;
  isShowingFarewell: boolean;
  setIsShowingFarewell: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppModeContext = createContext<AppModeValue | undefined>(undefined);

export type AppModeProviderProps = {};

const orderProductionStatuses: (keyof typeof OrderItemStatus)[] = [
  OrderItemStatus.ProductionReady,
  OrderItemStatus.ProductionQueued,
  OrderItemStatus.ProductionInProgress,
  OrderItemStatus.ProductionSucceeded,
];

const orderDeliveryProgressStatuses: (keyof typeof OrderItemStatus)[] = [
  OrderItemStatus.DeliveryQueued,
  OrderItemStatus.DeliveryInProgress,
  OrderItemStatus.DeliveryPresented,
  OrderItemStatus.DeliverySucceeded,
];

const orderPresentedStatuses: (keyof typeof OrderItemStatus)[] = [
  OrderItemStatus.DeliveryPresented,
];

export function AppModeProvider(
  props: React.PropsWithChildren<AppModeProviderProps>,
) {
  const { children } = props;
  const { orders, user, producerId, currentOrder } = useAppDataContext();
  const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();
  const featureFlagVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier;

  const [isShowingFarewell, setIsShowingFarewell] = useState<boolean>(false);

  const isAnyOrderReadyForDelivery = useMemo(
    () =>
      orders?.some((o) =>
        o.status.every(
          (orderStatus) =>
            orderStatus === OrderItemStatus[OrderItemStatus.DeliveryReady],
        ),
      ),
    [orders],
  );

  const isAnyOrderBeingDelivered = useMemo(
    () =>
      orders?.some((o) =>
        o.status.every((orderStatus) =>
          orderDeliveryProgressStatuses.includes(orderStatus),
        ),
      ),
    [orders],
  );

  const isAnyOrderBeingDirectDeliveredOnThisProducer = useMemo(
    () =>
      orders?.some(
        (o) =>
          o.directDelivery?.preferredProducerId === producerId &&
          o.status.every(
            (orderStatus) =>
              orderProductionStatuses.includes(orderStatus) ||
              orderDeliveryProgressStatuses.includes(orderStatus),
          ),
      ),
    [orders, producerId],
  );

  const mode = useMemo(() => {
    if (
      featureFlagVariant === 'B__VENDING_APPROACH' &&
      ((isAnyOrderBeingDirectDeliveredOnThisProducer && currentOrder) ||
        isShowingFarewell)
    ) {
      return AppMode.Production;
    }

    if (isAnyOrderBeingDelivered && user?.identified) {
      return AppMode.Delivery;
    }

    if (isAnyOrderReadyForDelivery) {
      if (!user) {
        return AppMode.Attract;
      } else if (user.identified) {
        return AppMode.Delivery;
      } else {
        return AppMode.Greet;
      }
    }
    return AppMode.Idle;
  }, [
    currentOrder,
    isAnyOrderReadyForDelivery,
    isAnyOrderBeingDelivered,
    isAnyOrderBeingDirectDeliveredOnThisProducer,
    isShowingFarewell,
    user,
    featureFlagVariant,
  ]);

  const value = useMemo<AppModeValue>(
    () => ({
      mode,
      isShowingFarewell,
      setIsShowingFarewell,
    }),
    [mode, isShowingFarewell, setIsShowingFarewell],
  );

  return (
    <>
      <AppModeContext.Provider value={value}>
        {children}
      </AppModeContext.Provider>
    </>
  );
}

export function useAppModeContext() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error(
      'useAppModeContext must be used in descendent of AppModeProvider',
    );
  }
  return context;
}
