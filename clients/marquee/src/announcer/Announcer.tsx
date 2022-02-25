import React, { useMemo } from 'react';

import { Announcement } from './announcement/Announcement';
import { OrderItemStatus } from '../generated/graph';
import { timeouts } from '../common/constants';
import { useAppDataContext } from '../providers/AppDataProvider';

type AnnouncerProps = {
  showDuration?: number;
  transitionDuration?: number;
};

export const Announcer: React.FunctionComponent<AnnouncerProps> = (props) => {
  const {
    showDuration = timeouts.ORDER_ANNOUNCEMENT_SHOW,
    transitionDuration = timeouts.ORDER_ANNOUNCEMENT_TRANSITION,
  } = props;
  const { orders = [] } = useAppDataContext();

  const kioskHasOrderReadyForDelivery = useMemo(() => {
    return orders.some((order) =>
      order.status.every(
        (itemStatus) => itemStatus === OrderItemStatus.DeliveryReady,
      ),
    );
  }, [orders]);

  const newestCompletedOrderName: string | undefined = useMemo(() => {
    if (!orders.length) return undefined;
    // filter for orders that are production complete
    const completedOrders = orders.filter((order) => {
      return order.status.every(
        (itemStatus) => itemStatus === OrderItemStatus.DeliveryReady,
      );
    });
    if (!completedOrders.length) return undefined;
    // identify the newest completed order
    return completedOrders.reduce((a, b) => {
      return (a.updatedAt || new Date(0)) > (b.updatedAt || new Date(0))
        ? a
        : b;
    }).name;
  }, [orders]);

  return (
    <>
      {kioskHasOrderReadyForDelivery ? (
        <Announcement
          orderName={newestCompletedOrderName ? newestCompletedOrderName : ''}
          showDuration={showDuration}
          transitionDuration={transitionDuration}
        />
      ) : null}
      {props.children}
    </>
  );
};
