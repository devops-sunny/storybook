import {
  OrderItemStatus,
  OrderItemStatusKey,
} from '@bb/common/types/tmpTypes/enums';
import { useEffect, useMemo, useState } from 'react';

import { PickupAvailabilityLayout } from './PickupAvailabilityLayout.web';
import { PickupStatus } from '../pickupStatus/PickupStatus';
import { PickupStatuses } from '../pickupStatus/PickupStatus.enum';
import { mockProducers } from '@bb/marquee/fixtures/mockData';
import { useAppDataContext } from '@bb/marquee/providers/AppDataProvider';

const orderDeliveryProgressStatuses: OrderItemStatusKey[] = [
  'DeliveryQueued',
  'DeliveryInProgress',
  'DeliveryPresented',
  'DeliverySucceeded',
];

export type PickupAvailabilityProps = {};

export function PickupAvailability(props: PickupAvailabilityProps) {
  const { orders, users } = useAppDataContext();
  const [statuses, setStatuses] = useState<PickupStatuses[]>([
    PickupStatuses.idle,
    PickupStatuses.idle,
  ]);

  const isAnyIdentifiedUserPresent = useMemo(
    () => users?.some((user) => user.identified),
    [users],
  );

  const isAnyOrderReadyForDelivery = useMemo(
    () =>
      orders?.some((order) =>
        order.status.every(
          (orderStatus) =>
            orderStatus === OrderItemStatus[OrderItemStatus.DeliveryReady],
        ),
      ),
    [orders],
  );

  const isAnyOrderBeingDelivered = useMemo(
    () =>
      orders?.some((order) =>
        order.status.every((orderStatus: keyof typeof OrderItemStatus) =>
          orderDeliveryProgressStatuses.includes(orderStatus),
        ),
      ),
    [orders],
  );

  const producersWithAnEngagedUser = useMemo(
    () =>
      mockProducers?.map((producer) =>
        users?.some((user) => producer.id === user.producerId),
      ),
    [users],
  );

  const producerOrderNames = useMemo(
    () =>
      mockProducers?.map((producer) => {
        const user = users?.find((user) => user.producerId === producer.id);
        const order = orders?.find((order) => order.id === user?.orderId);
        const isDelivering = order?.status.every((orderStatus) =>
          orderDeliveryProgressStatuses.includes(orderStatus),
        );
        // if no order name was provided, we know it wa a walk-up
        return isDelivering ? order?.name : 'walk-up';
      }),
    [orders, users],
  );

  useEffect(() => {
    // all pickups are idle when nothing is ready for delivery on the kiosk and no identified user
    if (
      !isAnyOrderReadyForDelivery &&
      !isAnyOrderBeingDelivered &&
      !isAnyIdentifiedUserPresent
    ) {
      const newStatuses = mockProducers.map(() => PickupStatuses.idle);
      setStatuses(newStatuses);
    }
    // all pickups are available when an order is ready on the kiosk, and nothing currently delivering, and no identified user
    else if (
      isAnyOrderReadyForDelivery &&
      !isAnyOrderBeingDelivered &&
      !isAnyIdentifiedUserPresent
    ) {
      const newStatuses = mockProducers.map(() => PickupStatuses.available);
      setStatuses(newStatuses);
    }
    // otherwise, each pickup depends on whether it is engaged to a user, and whether the kiosk has an order ready
    else {
      const newStatuses = producersWithAnEngagedUser.map(
        (deliveringProducer) => {
          const notEngagedStatus = isAnyOrderReadyForDelivery
            ? PickupStatuses.available
            : PickupStatuses.idle;
          return deliveringProducer ? PickupStatuses.engaged : notEngagedStatus;
        },
      );
      setStatuses(newStatuses);
    }
  }, [
    isAnyIdentifiedUserPresent,
    isAnyOrderReadyForDelivery,
    isAnyOrderBeingDelivered,
    producersWithAnEngagedUser,
  ]);

  const pickupStatuses = statuses.map((status, index) => (
    <PickupStatus
      key={`${status}-${index}`}
      status={status}
      engagedOrderName={producerOrderNames[index]}
    />
  ));

  return <PickupAvailabilityLayout>{pickupStatuses}</PickupAvailabilityLayout>;
}
