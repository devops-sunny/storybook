import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../../common/constants';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { mockUsersResponse } from '@bb/common/fixtures/users/mockUsersResponse';
import { updateAllOrdersDeliveryCompleted } from '@bb/marquee/providers/AppMockDataProvider/helpers/updateAllOrdersDeliveryCompleted';
import { updateFirstOrderDeliveryStarted } from '@bb/marquee/providers/AppMockDataProvider/helpers/updateOrderDeliveryStarted';
import { updateFirstOrderReadyForDelivery } from '@bb/marquee/providers/AppMockDataProvider/helpers/updateOrderReadyForDelivery';
import { useAppDataContext } from '../../providers/AppDataProvider';
import { useAppMockDataSubjects } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { useInterval } from 'react-use';
import { useRef } from 'react';

export type Props = {
  userExpirationMs: number;
};

export function Approach(props: Props) {
  const { users, orders } = useAppDataContext();
  const { pushGetOrdersResponse, pushGetUsersResponse } =
    useAppMockDataSubjects();
  const INTERVAL_MS = 100;

  useInterval(() => {
    // identify latest expired user
    const expiredUser = users.find((user) => {
      return Number(user.presentAt) < Date.now() - props.userExpirationMs;
    });
    // remove expired
    if (expiredUser) expireUsers(expiredUser.presentAt);
  }, INTERVAL_MS);

  const setNewUserEntersProximity = () => {
    pushGetUsersResponse(
      mockUsersResponse({
        users: [...users, mockUser().createWalkupUser().value()],
      }),
    );
  };
  const setAllUsersUpdatePresence = () => {
    pushGetUsersResponse(
      mockUsersResponse({
        users: users.map((user) => mockUser({ user }).updatePresent().value()),
      }),
    );
  };
  const clearUsers = () => {
    pushGetUsersResponse({
      data: {
        users: [],
      },
    });
  };
  const expireUsers = (expiredPresentAt: Date) => {
    pushGetUsersResponse({
      data: {
        users: users.filter((user, index) => {
          return user.presentAt !== expiredPresentAt;
        }),
      },
    });
  };

  const setOrderReadyForDelivery = () => {
    pushGetOrdersResponse(updateFirstOrderReadyForDelivery(orders));
  };
  const setOrderDeliveryStarted = () => {
    pushGetOrdersResponse(updateFirstOrderDeliveryStarted(orders));
  };
  const setOrdersDeliveryCompleted = () => {
    pushGetOrdersResponse(updateAllOrdersDeliveryCompleted(orders));
  };

  return (
    <ViewSkeleton
      key={JSON.stringify(users)}
      title="Approach"
      navigations={[
        {
          title: 'another user enters proximity',
          onNavigation: setNewUserEntersProximity,
        },
        {
          title: 'all users reach activity timeout',
          onNavigation: clearUsers,
        },
        {
          title: 'all users update presence',
          onNavigation: setAllUsersUpdatePresence,
        },

        {
          title: 'order completes production',
          onNavigation: setOrderReadyForDelivery,
        },
        {
          title: 'order begins delivery',
          onNavigation: setOrderDeliveryStarted,
        },
        {
          title: 'all orders complete delivery',
          onNavigation: setOrdersDeliveryCompleted,
        },
      ]}
      bgImageUrl={bgImages.APPROACH}
      timeoutMs={props.userExpirationMs}
    />
  );
}
