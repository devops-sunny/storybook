import { MUTATION_REMOVE_ITEM_FROM_ORDER } from '../gql/mutations';
import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../common/constants';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useMutation } from 'urql';
import { useState } from 'react';

export type ConfirmOrderSummaryProps = {};

export function ConfirmOrderSummary(props: ConfirmOrderSummaryProps) {
  const { currentOrder, setCurrentOrder } = useAppDataContext();
  const [removeItemFromOrderResult, removeItemFromOrder] = useMutation(
    MUTATION_REMOVE_ITEM_FROM_ORDER,
  );
  const { pushGetOrderResponse } = useAppMockDataSubjects();
  const [navigateTo, setNavigateTo] = useState('');

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <ViewSkeleton
      title="Confirm: Order Summary"
      bgImageUrl={bgImages.CONFIRM_ORDER_SUMMARY}
      navigations={[
        {
          title: 'user taps confirm and pay',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/payment`),
        },
        {
          title: 'user taps back',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/menu/menuB`),
        },
        {
          title: 'user taps edit item',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/order-item/item1`),
        },
        {
          title: 'user removes item',
          onNavigation: () => {
            if (currentOrder && currentOrder.items[0]) {
              removeItemFromOrder({
                orderId: currentOrder.id,
                orderItemId: currentOrder.items[0].id,
              }).then((result) => {
                // simulate Order query subscription update
                pushGetOrderResponse({
                  data: {
                    order: mockOrder({ order: result.data?.order })
                      .removeItem({ orderItemId: result.data?.orderItemId })
                      .value(),
                  },
                });
              });
            }
          },
        },
        {
          title: 'user taps cancel',
          onNavigation: () => {
            // end the order session
            setCurrentOrder(undefined);
            setNavigateTo('/approach');
          },
        },
      ]}
    />
  );
}
