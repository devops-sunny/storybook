import { mockOrders, mockUsers } from '@bb/marquee/fixtures/mockData';

import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../../common/constants';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { mockUsersResponse } from '@bb/common/fixtures/users/mockUsersResponse';
import { updateFirstOrderReadyForDelivery } from '@bb/marquee/providers/AppMockDataProvider/helpers/updateOrderReadyForDelivery';
import { useAppDataContext } from '../../providers/AppDataProvider';
import { useAppMockDataSubjects } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';

export type Props = {};

export function Attract(props: Props) {
  const { users, orders } = useAppDataContext();
  const { pushGetUsersResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();

  const setNewUserEntersProximity = () => {
    pushGetUsersResponse(
      mockUsersResponse({
        users: [...users, mockUser().createWalkupUser().value()],
      }),
    );
  };

  const setOrderReadyForDelivery = () => {
    // if (data) {
    pushGetOrdersResponse(updateFirstOrderReadyForDelivery(orders));
    // }
  };

  return (
    <ViewSkeleton
      title="Attract"
      navigations={[
        {
          title: 'user is sensed in proximity',
          onNavigation: setNewUserEntersProximity,
        },
        {
          title: 'order item completes production',
          onNavigation: setOrderReadyForDelivery,
        },
      ]}
      bgImageUrl={bgImages.ATTRACT}
    />
  );
}
