import React, { useState } from 'react';
import { bgImages, viewSkeletonStyles } from '../common/constants';
import {
  generateAppUserWithOrder,
  generateOrderWithIdandStatus,
} from '../providers/AppGqlDataProvider/helpers';

import { OrderItemStatus } from '@bb/pickup/generated/graph';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useTimeoutFn } from 'react-use';

type GreetProps = {
  greetTimeoutMs: number;
  identifiedTimeoutMs: number;
};

enum GreetViews {
  Greet,
  Identified,
}

export function Greet(props: GreetProps) {
  const { greetTimeoutMs, identifiedTimeoutMs } = props;
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const [currentView, setCurrentView] = useState<GreetViews>(GreetViews.Greet);

  const navigateToIdentifiedSubview = () => {
    setCurrentView(GreetViews.Identified);
  };

  const GreetSubview: React.FunctionComponent = () => {
    useTimeoutFn(() => {
      pushGetOrdersResponse({
        data: { orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')] },
      });
      pushGetUserResponse({
        data: { user: undefined },
      });
      // setOrders([{ id: 'o1', status: [OrderItemStatus.DeliveryReady] }]);
      // setUser(undefined);
    }, greetTimeoutMs);

    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Greet"
        timeoutMs={greetTimeoutMs}
        bgImageUrl={bgImages.GREET}
        navigations={[
          {
            title: 'user identified by mobile app action',
            onNavigation: navigateToIdentifiedSubview,
          },
          {
            title: 'user identified by selecting their order name from a list',
            onNavigation: navigateToIdentifiedSubview,
          },
          {
            title: 'user identified via mobile near field communication tap',
            onNavigation: navigateToIdentifiedSubview,
          },
          {
            title: 'user identified by QR code scan',
            onNavigation: navigateToIdentifiedSubview,
          },
          {
            title: 'user taps cancel',
            onNavigation: () => {
              pushGetOrdersResponse({
                data: {
                  orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')],
                },
              });
              pushGetUserResponse({
                data: { user: undefined },
              });
            },
          },
        ]}
      />
    );
  };

  const IdentifiedSubview: React.FunctionComponent = () => {
    useTimeoutFn(() => {
      pushGetOrdersResponse({
        data: {
          orders: [generateOrderWithIdandStatus('o1', 'DeliveryQueued')],
        },
      });
      pushGetUserResponse({
        data: { user: generateAppUserWithOrder('o1') },
      });
    }, identifiedTimeoutMs);

    return (
      <ViewSkeleton
        sx={viewSkeletonStyles}
        title="Greet: Identified"
        timeoutMs={identifiedTimeoutMs}
        bgImageUrl={bgImages.GREET_IDENTIFIED}
        navigations={[]}
      />
    );
  };

  const views = {
    [GreetViews.Greet]: <GreetSubview />,
    [GreetViews.Identified]: <IdentifiedSubview />,
  };

  return views[currentView];
}
