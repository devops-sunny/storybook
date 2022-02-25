import {
  didItemStatusChange,
  didItemStatusChangeToReadyForDelivery,
} from './helpers';
import { useEffect, useRef, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

export type WaitModeNavigationProps = {
  title: string;
  timeoutMs: number;
  timeoutNavigateTo: string;
  updateNavigateTo?: string;
  bgImageUrl?: string;
};

export function WaitModeNavigation(
  props: React.PropsWithChildren<WaitModeNavigationProps>,
) {
  const { title, timeoutMs, timeoutNavigateTo, updateNavigateTo, bgImageUrl } =
    props;

  const { currentOrder } = useAppDataContext();
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const [didAnyOrderItemStatusChange, setDidAnyOrderItemStatusChange] =
    useState<boolean>(false);
  const [
    didAnyOrderItemStatusChangeToReadyForDelivery,
    setDidAnyOrderItemStatusChangeToReadyForDelivery,
  ] = useState<boolean>(false);
  const [navigateTo, setNavigateTo] = useState('');

  // track the order state at mount
  const orderStateAtMount = useRef<Order | undefined>();
  if (orderStateAtMount.current === undefined) {
    orderStateAtMount.current = currentOrder ? { ...currentOrder } : undefined;
  }

  // compare current order state to state at mount
  useEffect(() => {
    const itemStatusChanges = didItemStatusChange({
      previousOrderState: orderStateAtMount.current,
      currentOrderState: currentOrder,
    });
    const itemStatusChangesToReadyForDelivery =
      didItemStatusChangeToReadyForDelivery({
        previousOrderState: orderStateAtMount.current,
        currentOrderState: currentOrder,
      });

    setDidAnyOrderItemStatusChange(itemStatusChanges.some((change) => change));
    setDidAnyOrderItemStatusChangeToReadyForDelivery(
      itemStatusChangesToReadyForDelivery.some((change) => change),
    );
  }, [orderStateAtMount, currentOrder]);

  // navigate on order item status changes
  useEffect(() => {
    if (currentOrder && didAnyOrderItemStatusChangeToReadyForDelivery) {
      setNavigateTo(`/order/${currentOrder.id}/delivery`);
    }

    if (
      !didAnyOrderItemStatusChangeToReadyForDelivery &&
      didAnyOrderItemStatusChange &&
      // do not navigate if its a change to Configuration (e.g. storybook reset)
      !currentOrder?.status.some(
        (status: any) => status === OrderItemStatus.Configuration,
      )
    ) {
      if (updateNavigateTo) setNavigateTo(updateNavigateTo);
    }
  }, [
    currentOrder,
    didAnyOrderItemStatusChangeToReadyForDelivery,
    didAnyOrderItemStatusChange,
    updateNavigateTo,
  ]);

  // navigate after timeout
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      setNavigateTo(timeoutNavigateTo);
    }, timeoutMs);
    return () => clearTimeout(navigationTimeout);
  }, [timeoutMs, timeoutNavigateTo]);

  const mockOrderItemStatusUpdate = () => {
    if (currentOrder) {
      pushGetOrderResponse({
        data: {
          order: mockOrder({ order: currentOrder })
            .updateAllItemsStatus({ status: 'ProductionSucceeded' })
            .value(),
        },
      });
    }
  };

  const mockOrderItemReadyForDelivery = () => {
    if (currentOrder) {
      pushGetOrderResponse({
        data: {
          order: mockOrder({ order: currentOrder })
            .updateAllItemsStatus({ status: 'DeliveryReady' })
            .value(),
        },
      });
    }
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  let navigations = [];
  if (updateNavigateTo)
    navigations.push({
      title: 'order item changes status',
      onNavigation: mockOrderItemStatusUpdate,
    });
  navigations.push({
    title: 'order item changes status to ready for delivery',
    onNavigation: mockOrderItemReadyForDelivery,
  });

  return (
    <ViewSkeleton
      title={title}
      timeoutMs={timeoutMs}
      bgImageUrl={bgImageUrl}
      navigations={navigations}
    />
  );
}
