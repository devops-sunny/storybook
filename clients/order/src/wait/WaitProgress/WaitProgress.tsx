import { useEffect, useMemo, useState } from 'react';
import { useMount, useTimeoutFn } from 'react-use';

import { Navigate } from 'react-router';
import { OrderItemStatus } from '@bb/common/types/tmpTypes/enums';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useParams } from 'react-router-dom';

export type WaitProgressProps = {
  timeoutMs: number;
};

enum ProgressViews {
  ITEMS,
  QUEUE,
  PRODUCTION,
  STAGING,
  READY,
}

export function WaitProgress(props: WaitProgressProps) {
  const { timeoutMs } = props;
  const { currentOrder } = useAppDataContext();
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const [navigateTo, setNavigateTo] = useState('');
  const [currentView, setCurrentView] = useState<ProgressViews>(
    ProgressViews.ITEMS,
  );
  const { orderId } = useParams();

  // state helpers - memoize to recompute only when currentOrder changes
  const areAllOrderItemsProductionReady: boolean = useMemo(() => {
    return currentOrder?.status
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.ProductionReady,
        )
      : false;
  }, [currentOrder]);
  const areAllOrderItemsProductionQueued: boolean = useMemo(() => {
    return currentOrder?.status
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.ProductionQueued,
        )
      : false;
  }, [currentOrder]);
  const areSomeOrderItemsProductionInProgress: boolean = useMemo(() => {
    return currentOrder?.status
      ? currentOrder?.status.some(
          (status) => status === OrderItemStatus.ProductionInProgress,
        )
      : false;
  }, [currentOrder]);
  const areSomeOrderItemProductionCompleted: boolean = useMemo(() => {
    return currentOrder?.status
      ? currentOrder?.status.some(
          (status) => status === OrderItemStatus.ProductionSucceeded,
        )
      : false;
  }, [currentOrder]);
  const areAllOrderItemsProductionCompleted: boolean = useMemo(() => {
    return currentOrder?.status
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.ProductionSucceeded,
        )
      : false;
  }, [currentOrder]);

  // route views based on state
  useEffect(() => {
    // logically cover out all the conditions
    if (areAllOrderItemsProductionReady) {
      setCurrentView(ProgressViews.ITEMS);
    } else if (areAllOrderItemsProductionQueued) {
      setCurrentView(ProgressViews.QUEUE);
    } else if (
      areSomeOrderItemsProductionInProgress &&
      !areSomeOrderItemProductionCompleted
    ) {
      setCurrentView(ProgressViews.PRODUCTION);
    } else if (
      areSomeOrderItemProductionCompleted &&
      !areAllOrderItemsProductionCompleted
    ) {
      setCurrentView(ProgressViews.STAGING);
    } else if (areAllOrderItemsProductionCompleted) {
      setCurrentView(ProgressViews.READY);
    }
  }, [
    areAllOrderItemsProductionReady,
    areAllOrderItemsProductionQueued,
    areSomeOrderItemsProductionInProgress,
    areSomeOrderItemProductionCompleted,
    areAllOrderItemsProductionCompleted,
  ]);

  // @TEMP - on mount, set order item status to ProductionReady
  useMount(() => {
    if (currentOrder) {
      pushGetOrderResponse({
        data: {
          order: mockOrder({ order: currentOrder })
            .updateAllItemsStatus({ status: 'ProductionReady' })
            .value(),
        },
      });
    }
  });

  // @TEMP - this timeout simulates order state changes
  const [, , reset] = useTimeoutFn(() => {
    if (currentOrder) {
      const order = currentOrder;
      switch (currentView) {
        case ProgressViews.ITEMS:
          if (areAllOrderItemsProductionReady) {
            pushGetOrderResponse({
              data: {
                order: mockOrder({ order: order })
                  .updateAllItemsStatus({ status: 'ProductionQueued' })
                  .value(),
              },
            });
          }
          break;
        case ProgressViews.QUEUE:
          if (areAllOrderItemsProductionQueued) {
            pushGetOrderResponse({
              data: {
                order: mockOrder({ order: order })
                  .updateAllItemsStatus({ status: 'ProductionInProgress' })
                  .value(),
              },
            });
          }
          break;
        case ProgressViews.PRODUCTION:
          if (areSomeOrderItemsProductionInProgress) {
            pushGetOrderResponse({
              data: {
                order: mockOrder({ order: order })
                  .updateIndexItemStatus({
                    index: 0,
                    status: 'ProductionSucceeded',
                  })
                  .value(),
              },
            });
          }
          break;
        case ProgressViews.STAGING:
          if (areSomeOrderItemProductionCompleted) {
            pushGetOrderResponse({
              data: {
                order: mockOrder({ order: order })
                  .updateAllItemsStatus({ status: 'ProductionSucceeded' })
                  .value(),
              },
            });
          }
          break;
        case ProgressViews.READY:
          if (areAllOrderItemsProductionCompleted) {
            setNavigateTo(`/order/${order.id}/delivery`);
          }
          break;
      }
      reset();
    }
  }, timeoutMs);

  const Items: React.FunctionComponent = () => {
    return (
      <ViewSkeleton
        title="Wait: Progress: Items"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.WAIT_PROGRESS_ITEMS}
        navigations={[]}
      />
    );
  };

  const Queue: React.FunctionComponent = () => {
    return (
      <ViewSkeleton
        title="Wait: Progress: Queue"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.WAIT_PROGRESS_QUEUE}
        navigations={[]}
      />
    );
  };

  const Production: React.FunctionComponent = () => {
    return (
      <ViewSkeleton
        title="Wait: Progress: Production"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.WAIT_PROGRESS_PRODUCTION}
        navigations={[]}
      />
    );
  };

  const Staging: React.FunctionComponent = () => {
    return (
      <ViewSkeleton
        title="Wait: Progress: Staging"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.WAIT_PROGRESS_STAGING}
        navigations={[]}
      />
    );
  };

  const Ready: React.FunctionComponent = () => {
    return (
      <ViewSkeleton
        title="Wait: Progress: Ready"
        timeoutMs={timeoutMs}
        bgImageUrl={bgImages.WAIT_PROGRESS_READY}
        navigations={[]}
      />
    );
  };

  const renderViews = {
    [ProgressViews.ITEMS]: <Items />,
    [ProgressViews.QUEUE]: <Queue />,
    [ProgressViews.PRODUCTION]: <Production />,
    [ProgressViews.STAGING]: <Staging />,
    [ProgressViews.READY]: <Ready />,
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return <>{renderViews[currentView]}</>;
}
