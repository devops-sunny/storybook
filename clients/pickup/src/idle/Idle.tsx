import { bgImages, viewSkeletonStyles } from '../common/constants';
import {
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateOrderWithIdandStatus,
  generateWalkupUserWithOrder,
} from '../providers/AppGqlDataProvider/helpers';

import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppFeatureFlags } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

export function Idle() {
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();
  const featureFlagVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier;

  const IdleOptionB = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Idle Option B"
        bgImageUrl={bgImages.IDLE}
        navigations={[
          {
            title: 'Walk-up Order begins production',
            onNavigation: () => {
              const orderId = uuidv4();
              pushGetOrdersResponse({
                data: {
                  orders: [
                    generateDirectDeliverOrderWithIdandStatusItemCount(
                      orderId,
                      'DeliveryQueued',
                      2,
                      'mock-producer-id',
                    ),
                  ],
                },
              });
              pushGetUserResponse({
                data: {
                  user: generateWalkupUserWithOrder(orderId),
                },
              });
            },
          },
          {
            title: 'App Order completes production',
            onNavigation: () => {
              pushGetOrdersResponse({
                data: {
                  orders: [
                    {
                      ...mockOrder()
                        .addItem({
                          modifiedProductVariation: {
                            id: uuidv4(),
                            productVariation: {
                              id: uuidv4(),
                              name: `product-variation-1`,
                            },
                          },
                        })
                        .addItem({
                          modifiedProductVariation: {
                            id: uuidv4(),
                            productVariation: {
                              id: uuidv4(),
                              name: `product-variation-2`,
                            },
                          },
                        })
                        .validateAllItems({
                          validations: [...validValidations],
                        })
                        .updateAllItemsStatus({ status: 'DeliveryReady' })
                        .value(),
                    },
                  ],
                },
              });
              pushGetUserResponse({
                data: {
                  user: undefined,
                },
              });
            },
          },
        ]}
      />
    );
  };

  const Idle = () => {
    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Idle"
        bgImageUrl={bgImages.IDLE}
        navigations={[
          {
            title: 'App Order completes production',
            onNavigation: () => {
              pushGetOrdersResponse({
                data: {
                  orders: [
                    generateOrderWithIdandStatus(uuidv4(), 'DeliveryReady'),
                  ],
                },
              });
              pushGetUserResponse({
                data: {
                  user: undefined,
                },
              });
            },
          },
          {
            title: 'Walk-up Order completes production',
            onNavigation: () => {
              const orderId = uuidv4();
              pushGetOrdersResponse({
                data: {
                  orders: [
                    generateOrderWithIdandStatus(orderId, 'DeliveryQueued'),
                  ],
                },
              });
              pushGetUserResponse({
                data: {
                  user: generateWalkupUserWithOrder(orderId),
                },
              });
            },
          },
        ]}
      />
    );
  };

  if (featureFlagVariant === 'B__VENDING_APPROACH') {
    return <IdleOptionB />;
  }
  return <Idle />;
}
