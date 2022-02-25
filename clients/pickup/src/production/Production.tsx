import {
  OrderItemStatus,
  OrderItemStatusKey,
} from '@bb/common/types/tmpTypes/enums';
import { useEffect, useMemo, useState } from 'react';

import { CollectItem } from './CollectItem/CollectItem';
import { Interstitial } from './Interstitial/Interstitial';
import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { PickupProgress } from '../common/PickupProgress';
import { PreparingItem } from './PreparingItem/PreparingItem';
import { immutablyUpdateOrderStatus } from '../common/stateHelpers';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useAppModeContext } from '../providers/AppModeProvider/AppModeProvider';
import { useTimeoutFn } from 'react-use';

const inProgressStatuses: OrderItemStatusKey[] = [
  OrderItemStatus.ProductionInProgress,
  OrderItemStatus.ProductionSucceeded,
  OrderItemStatus.ProductionFailed,
  OrderItemStatus.DeliveryReady,
  OrderItemStatus.DeliveryQueued,
  OrderItemStatus.DeliveryInProgress,
  OrderItemStatus.DeliveryPresented,
];

enum ProductionSubViews {
  PRODUCTION_INTERSTITIAL_1,
  PRODUCTION_PREPARING_X,
  PRODUCTION_COLLECT_X,
  PRODUCTION_PREPARING_LAST,
  PRODUCTION_COLLECT_LAST,
  PRODUCTION_INTERSTITIAL_2,
}

export type ProductionProps = {
  timeoutMs: number;
};

export function Production(props: ProductionProps) {
  const { timeoutMs } = props;
  const { isShowingFarewell, setIsShowingFarewell } = useAppModeContext();

  const [currentView, setCurrentView] = useState(
    ProductionSubViews.PRODUCTION_INTERSTITIAL_1,
  );

  // track the index of the item currently displayed
  const [activeOrderItemIndex, setActiveOrderItemIndex] = useState<number>(0);

  // track the overall progress of the order: 1 point per each item's preparing step and collection step (max is items.length *2)
  // 0: order not started
  // odd: preparing this item
  // even: collect this item
  // -1: order done
  const [activeOrderProgressStep, setActiveOrderStepProgress] =
    useState<number>(0);

  // track the estimated duration of the active order step
  const [activeStepDuration, setActiveOrderStepDuration] = useState<number>(
    2 * props.timeoutMs,
  );

  const { orders, currentOrder, setCurrentOrderId } = useAppDataContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();

  const currentOrderIndex = useMemo(() => {
    return orders?.findIndex((order) => order.id === currentOrder?.id);
  }, [orders, currentOrder]);

  // This checks the current status of Order Items. This is used to check status logic inside of the useEffect
  const areAllOrderItemsProductionReady: boolean = useMemo(() => {
    return currentOrder
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.ProductionReady,
        )
      : false;
  }, [currentOrder]);

  const areAnyOrderItemsInProgress: boolean = useMemo(() => {
    return currentOrder
      ? currentOrder?.status.some((status) =>
          inProgressStatuses.includes(status),
        )
      : false;
  }, [currentOrder]);

  const areAllOrderItemsProductionInProgress: boolean = useMemo(() => {
    return currentOrder
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.ProductionInProgress,
        )
      : false;
  }, [currentOrder]);

  const areAllOrderItemsDeliveryPresented: boolean = useMemo(() => {
    return currentOrder
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.DeliveryPresented,
        )
      : false;
  }, [currentOrder]);

  const areSomeOrderItemsInProgressAndSomeOrderItemsReady: boolean =
    useMemo(() => {
      return currentOrder
        ? currentOrder?.status.some(
            (status) => status === OrderItemStatus.ProductionInProgress,
          ) &&
            currentOrder?.status.some(
              (status) => status === OrderItemStatus.ProductionReady,
            )
        : false;
    }, [currentOrder]);

  const areSomeOrderItemsDeliveryPresentedAndProductionReady: boolean =
    useMemo(() => {
      return currentOrder
        ? currentOrder?.status.some(
            (status) => status === OrderItemStatus.DeliveryPresented,
          ) &&
            currentOrder?.status.some(
              (status) => status === OrderItemStatus.ProductionReady,
            )
        : false;
    }, [currentOrder]);

  // @TODO fix a bug here! it needs to be where one is presented and at more than one is not started
  const areSomeOrderItemsDeliveryCompletedAndProductionInProgress: boolean =
    useMemo(() => {
      return currentOrder
        ? currentOrder?.status.some(
            (status) => status === OrderItemStatus.DeliverySucceeded,
          ) &&
            currentOrder?.status.some(
              (status) => status === OrderItemStatus.ProductionInProgress,
            )
        : false;
    }, [currentOrder]);

  const areSomeOrderItemsDeliveryCompletedAndDeliveryPresented: boolean =
    useMemo(() => {
      return currentOrder
        ? currentOrder?.status.some(
            (status) => status === OrderItemStatus.DeliverySucceeded,
          ) &&
            currentOrder?.status.some(
              (status) => status === OrderItemStatus.DeliveryPresented,
            )
        : false;
    }, [currentOrder]);

  const areAllOrderItemsDeliveryCompleted: boolean = useMemo(() => {
    return currentOrder
      ? currentOrder?.status.every(
          (status) => status === OrderItemStatus.DeliverySucceeded,
        )
      : false;
  }, [currentOrder]);

  // set the current view based on status
  useEffect(() => {
    if (areAllOrderItemsProductionReady) {
      setCurrentView(ProductionSubViews.PRODUCTION_INTERSTITIAL_1);
    } else if (
      areSomeOrderItemsInProgressAndSomeOrderItemsReady ||
      areAllOrderItemsProductionInProgress
    ) {
      setCurrentView(ProductionSubViews.PRODUCTION_PREPARING_X);
    } else if (
      areSomeOrderItemsDeliveryPresentedAndProductionReady ||
      areAllOrderItemsDeliveryPresented
    ) {
      setCurrentView(ProductionSubViews.PRODUCTION_COLLECT_X);
    } else if (areSomeOrderItemsDeliveryCompletedAndProductionInProgress) {
      setCurrentView(ProductionSubViews.PRODUCTION_PREPARING_LAST);
    } else if (areSomeOrderItemsDeliveryCompletedAndDeliveryPresented) {
      setCurrentView(ProductionSubViews.PRODUCTION_COLLECT_LAST);
    } else if (areAllOrderItemsDeliveryCompleted) {
      setCurrentView(ProductionSubViews.PRODUCTION_INTERSTITIAL_2);
    }
  }, [
    areAllOrderItemsProductionReady,
    areAllOrderItemsProductionInProgress,
    areAllOrderItemsDeliveryPresented,
    areSomeOrderItemsInProgressAndSomeOrderItemsReady,
    areSomeOrderItemsDeliveryCompletedAndProductionInProgress,
    areSomeOrderItemsDeliveryPresentedAndProductionReady,
    areSomeOrderItemsDeliveryCompletedAndDeliveryPresented,
    areAllOrderItemsDeliveryCompleted,
  ]);

  // per order item simulated progress timings
  const collectStepDuration = props.timeoutMs;
  // @TODO - in the near future these durations will be dynamically loaded based on orderItem Product.
  const orderItemPrepareDurations: number[] = useMemo(
    () => [
      4 * props.timeoutMs,
      5 * props.timeoutMs,
      4 * props.timeoutMs,
      3 * props.timeoutMs,
    ],
    [props.timeoutMs],
  );

  // react to current view
  useEffect(() => {
    switch (currentView) {
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_1:
        setActiveOrderStepProgress(0); // not started preparing
        break;
      case ProductionSubViews.PRODUCTION_PREPARING_X:
        setActiveOrderStepProgress((progress) =>
          progress % 2 === 0 ? progress + 1 : progress,
        ); // odd: preparing
        setActiveOrderStepDuration(
          orderItemPrepareDurations[activeOrderItemIndex] ??
            2 * props.timeoutMs,
        );
        break;
      case ProductionSubViews.PRODUCTION_COLLECT_X:
        setActiveOrderStepProgress((progress) =>
          progress % 2 === 1 ? progress + 1 : progress,
        ); // even: collect
        setActiveOrderStepDuration(collectStepDuration);
        break;
      case ProductionSubViews.PRODUCTION_PREPARING_LAST:
        setActiveOrderStepProgress((progress) =>
          progress % 2 === 0 ? progress + 1 : progress,
        ); // odd: preparing
        setActiveOrderStepDuration(
          orderItemPrepareDurations[activeOrderItemIndex + 1] ??
            2 * props.timeoutMs,
        );
        break;
      case ProductionSubViews.PRODUCTION_COLLECT_LAST:
        setActiveOrderStepProgress((progress) =>
          progress % 2 === 1 ? progress + 1 : progress,
        ); // even: collect
        setActiveOrderStepDuration(collectStepDuration);
        break;
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_2:
        setActiveOrderStepProgress(-1);
        setActiveOrderStepDuration(2 * props.timeoutMs);
        setIsShowingFarewell(true);
        break;
    }
  }, [
    currentView,
    activeOrderItemIndex,
    setActiveOrderStepProgress,
    setActiveOrderStepDuration,
    orderItemPrepareDurations,
    collectStepDuration,
    props.timeoutMs,
    setIsShowingFarewell,
  ]);

  // timeout for farewell message after order is delivered
  const [, , resetB] = useTimeoutFn(
    () => {
      if (!isShowingFarewell) resetB();
      else {
        setIsShowingFarewell(false);
        setCurrentOrderId(undefined);
      }
    },
    isShowingFarewell ? timeoutMs * 2 : undefined,
  );

  //Temporary stuff goes below here. This is used to aid the timeout function until we subscribe to status updates
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
          status: OrderItemStatus.ProductionInProgress,
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

  // simulate changes to order status
  const [, , reset] = useTimeoutFn(() => {
    switch (currentView) {
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_1:
        if (areAllOrderItemsProductionReady) {
          updateOrderItemStatus(OrderItemStatus.ProductionInProgress);
        }
        break;
      case ProductionSubViews.PRODUCTION_PREPARING_X:
        if (
          areSomeOrderItemsInProgressAndSomeOrderItemsReady ||
          areAllOrderItemsProductionInProgress
        ) {
          updateOrderItemStatus(OrderItemStatus.DeliveryPresented);
        }
        break;
      case ProductionSubViews.PRODUCTION_COLLECT_X:
        if (areAllOrderItemsDeliveryPresented) {
          updateOrderItemStatus(OrderItemStatus.DeliverySucceeded);
        } else if (areSomeOrderItemsDeliveryPresentedAndProductionReady) {
          updateOrderItemStatus(OrderItemStatus.DeliverySucceeded);
          activateNextOrderItem();
        }
        break;
      case ProductionSubViews.PRODUCTION_PREPARING_LAST:
        if (areSomeOrderItemsDeliveryCompletedAndProductionInProgress) {
          updateOrderItemStatus(OrderItemStatus.DeliveryPresented);
        }
        break;
      case ProductionSubViews.PRODUCTION_COLLECT_LAST:
        if (areSomeOrderItemsDeliveryCompletedAndDeliveryPresented) {
          updateOrderItemStatus(OrderItemStatus.DeliverySucceeded);
        }
        break;
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_2:
        if (areAllOrderItemsDeliveryCompleted) {
          pushGetOrdersResponse({
            data: { orders: [] },
          });
          pushGetUserResponse({
            data: { user: undefined },
          });
        }
        break;
    }
  }, activeStepDuration);

  const sum = (accumulation: number, current: number) => accumulation + current;
  const orderItemCount = currentOrder?.items.length || 0;

  const remainingOrderItemCount = orderItemCount - activeOrderItemIndex;
  const remainingCollectSteps =
    activeOrderProgressStep > 0
      ? remainingOrderItemCount - ((activeOrderProgressStep + 1) % 2)
      : orderItemCount;

  const totalPrepareStepsDuration = orderItemPrepareDurations
    .slice(0, orderItemCount)
    .reduce(sum, 0);
  const totalCollectStepsDuration = collectStepDuration * orderItemCount;
  const totalStepsDuration =
    totalPrepareStepsDuration + totalCollectStepsDuration;

  const remainingPrepareStepsDuration = orderItemPrepareDurations
    .slice(Math.ceil((activeOrderProgressStep - 1) / 2), orderItemCount)
    .reduce(sum, 0);
  const remainingCollectStepsDuration =
    collectStepDuration * remainingCollectSteps;
  const currentCollectStepDuration =
    collectStepDuration * ((activeOrderProgressStep + 1) % 2);

  const dynamicRemainingOrderDuration =
    remainingPrepareStepsDuration +
    remainingCollectStepsDuration +
    currentCollectStepDuration;

  const progressNumerator = totalStepsDuration - dynamicRemainingOrderDuration;
  const progressDenominator = totalStepsDuration;

  const dynamicProgress = (progressNumerator / progressDenominator) * 100;

  // reduce array of strings to a string with oxford comma
  const oxfordCommaReducer = (
    acc: string,
    curr: string,
    index: number,
    array: string[],
  ): string => {
    if (acc === '') return curr;
    return (
      acc +
      (array.length < 3 || index < array.length - 1 ? ', ' : ', and ') +
      curr
    );
  };

  // @TODO - lookup display names
  const orderItemsList = currentOrder?.items
    .map((item) => item.modifiedProductVariation.productVariation.name)
    .reduce(oxfordCommaReducer, '');
  const currentOrderItemProductVariationName = `${currentOrder?.items[activeOrderItemIndex]?.modifiedProductVariation.productVariation.name}`;
  // @TODO - lookup modifications display names and concatenate with Oxford comma
  const currentOrderItemModificationsList = `${
    currentOrder?.items[
      activeOrderItemIndex
    ]?.modifiedProductVariation.modifications
      ?.map((modification) => (modification.id ? modification.id : ''))
      .reduce(oxfordCommaReducer, '') || ''
  }`;

  // render
  const view = (currentView: ProductionSubViews) => {
    switch (currentView) {
      default:
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_1:
        return (
          <Interstitial
            headline="We're on it!"
            subheadline={`Preparing your ${orderItemsList} now`}
            progressIndicator
          />
        );
      case ProductionSubViews.PRODUCTION_PREPARING_X:
      case ProductionSubViews.PRODUCTION_PREPARING_LAST:
        return (
          <PreparingItem
            index={activeOrderItemIndex + 1}
            count={currentOrder ? currentOrder.items.length : 0}
            productName={`${currentOrderItemProductVariationName}`}
            modificationsName={`${currentOrderItemModificationsList}`}
          />
        );
      case ProductionSubViews.PRODUCTION_COLLECT_X:
      case ProductionSubViews.PRODUCTION_COLLECT_LAST:
        return (
          <CollectItem
            index={activeOrderItemIndex + 1}
            count={currentOrder ? currentOrder.items.length : 0}
            productName={`${currentOrderItemProductVariationName}`}
            modificationsName={`${currentOrderItemModificationsList}`}
          />
        );
      case ProductionSubViews.PRODUCTION_INTERSTITIAL_2:
        return (
          <Interstitial
            headline="Thank You!"
            subheadline="See you next time."
          />
        );
    }
  };
  return (
    <>
      {/* this wrapper is useful to display debugging components */}
      {areAnyOrderItemsInProgress ? (
        <PickupProgress
          timeout={dynamicRemainingOrderDuration}
          progress={dynamicProgress}
          color={activeOrderProgressStep % 2 === 0 ? 'primary' : 'secondary'}
          bgColor={
            activeOrderProgressStep % 2 === 0 ? 'primaryDark' : 'primaryDark'
          }
        />
      ) : null}
      {view(currentView)}
    </>
  );
}
