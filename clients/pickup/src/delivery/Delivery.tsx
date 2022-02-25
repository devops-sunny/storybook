import {
  OrderItemStatus,
  OrderItemStatusKey,
} from '@bb/common/types/tmpTypes/enums';
import { bgImages, viewSkeletonStyles } from '../common/constants';
import { useEffect, useMemo, useState } from 'react';

import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { immutablyUpdateOrderStatus } from '../common/stateHelpers';
import { matchesAllOrderItemStatus } from '../common/helpers';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useTimeoutFn } from 'react-use';

enum DeliverySubViews {
  DELIVERY_START,
  DELIVERY_RETRIEVING,
  DELIVERY_COLLECT,
  DELIVERY_INTERSTITIAL,
  DELIVERY_DONE,
}

export type DeliveryProps = {
  timeoutMs: number;
};

export function Delivery({ timeoutMs }: DeliveryProps) {
  const [currentView, setCurrentView] = useState(
    DeliverySubViews.DELIVERY_START,
  );
  const [activeOrderItemIndex, setActiveOrderItemIndex] = useState(0);

  const { orders, currentOrder } = useAppDataContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();

  const currentOrderIndex = useMemo(() => {
    return orders?.findIndex((order) => order.id === currentOrder?.id);
  }, [orders, currentOrder]);
  const activeOrderItemStatus = useMemo(() => {
    return currentOrder?.items[activeOrderItemIndex]?.status;
  }, [currentOrder, activeOrderItemIndex]);

  // when delivery completes, render interstitial under next delivery starts
  //  (unless it was the last item)
  useEffect(() => {
    if (activeOrderItemStatus === OrderItemStatus.DeliverySucceeded) {
      const allDone = matchesAllOrderItemStatus({
        currentOrder,
        matchStatus: OrderItemStatus.DeliverySucceeded,
      });
      setCurrentView(
        allDone
          ? DeliverySubViews.DELIVERY_DONE
          : DeliverySubViews.DELIVERY_INTERSTITIAL,
      );
    }
  }, [activeOrderItemStatus, currentOrder]);

  const updateOrderItemStatus = (status: OrderItemStatusKey) => {
    pushGetOrdersResponse({
      data: {
        orders: immutablyUpdateOrderStatus({
          itemStatus: status,
          itemIndex: activeOrderItemIndex,
          orders: orders,
          orderIndex: currentOrderIndex,
        }),
      },
    });
  };

  const activateNextOrderItem = () => {
    if (currentOrder) {
      const modifiedOrder: Order = mockOrder({ order: currentOrder })
        .updateIndexItemStatus({
          index: activeOrderItemIndex,
          status: OrderItemStatus.DeliverySucceeded,
        })
        .updateIndexItemStatus({
          index: activeOrderItemIndex + 1,
          status: OrderItemStatus.DeliveryInProgress,
        })
        .value();
      pushGetOrdersResponse({
        data: {
          orders: [
            ...orders.slice(0, currentOrderIndex),
            modifiedOrder,
            ...orders.slice(currentOrderIndex + 1),
          ],
        },
      });
      setActiveOrderItemIndex(activeOrderItemIndex + 1);
    }
  };

  const [, , reset] = useTimeoutFn(() => {
    switch (currentView) {
      case DeliverySubViews.DELIVERY_START:
        if (activeOrderItemStatus === OrderItemStatus.DeliveryQueued) {
          updateOrderItemStatus(OrderItemStatus.DeliveryInProgress);
          setCurrentView(DeliverySubViews.DELIVERY_RETRIEVING);
        }
        break;
      case DeliverySubViews.DELIVERY_RETRIEVING:
        if (activeOrderItemStatus === OrderItemStatus.DeliveryInProgress) {
          updateOrderItemStatus(OrderItemStatus.DeliveryPresented);
          setCurrentView(DeliverySubViews.DELIVERY_COLLECT);
        }
        break;
      case DeliverySubViews.DELIVERY_INTERSTITIAL:
        if (activeOrderItemStatus === OrderItemStatus.DeliverySucceeded) {
          activateNextOrderItem();
          setCurrentView(DeliverySubViews.DELIVERY_RETRIEVING);
        }
        break;
      case DeliverySubViews.DELIVERY_DONE:
        pushGetUserResponse({
          data: { user: undefined },
        });
        break;
    }
    reset();
  }, timeoutMs);

  // render components
  const Start = () => {
    return (
      <ViewSkeleton
        key="Start"
        sx={viewSkeletonStyles}
        title="Delivery: Start"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.DELIVERY}
        navigations={[]}
      />
    );
  };

  const Retrieving = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Delivery: Retrieving"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.DELIVERY_RETRIEVING}
        navigations={[]}
      />
    );
  };

  const Collect = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Delivery: Collect"
        bgImageUrl={bgImages.DELIVERY_COLLECT}
        navigations={[
          {
            title: `user collects ${
              activeOrderItemIndex === (currentOrder?.items.length || 0) - 1
                ? 'last '
                : ''
            }cup from the window`,
            onNavigation: () => {
              updateOrderItemStatus(OrderItemStatus.DeliverySucceeded);
              reset();
            },
          },
        ]}
      />
    );
  };

  const Interstitial = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Delivery: Interstitial"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.DELIVERY_INTERSTITIAL}
        navigations={[]}
      />
    );
  };

  const Done = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Delivery: Done"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.DELIVERY_DONE}
        navigations={[]}
      />
    );
  };

  // render
  const view = (currentView: DeliverySubViews) => {
    switch (currentView) {
      default:
      case DeliverySubViews.DELIVERY_START:
        return <Start />;
      case DeliverySubViews.DELIVERY_RETRIEVING:
        return <Retrieving />;
      case DeliverySubViews.DELIVERY_COLLECT:
        return <Collect />;
      case DeliverySubViews.DELIVERY_INTERSTITIAL:
        return <Interstitial />;
      case DeliverySubViews.DELIVERY_DONE:
        return <Done />;
    }
  };
  return (
    <>
      {/* this wrapper is useful to display debugging components */}
      {view(currentView)}
    </>
  );
}
