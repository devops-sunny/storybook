import { bgImages, viewSkeletonStyles } from '../common/constants';

import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { generateAnonymousUser } from '../providers/AppGqlDataProvider/helpers';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

export function Attract() {
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();

  return (
    <ViewSkeleton
      sx={viewSkeletonStyles}
      title="Attract"
      bgImageUrl={bgImages.ATTRACT}
      navigations={[
        {
          title: 'user taps on screen',
          onNavigation: () => {
            pushGetUserResponse({
              data: { user: generateAnonymousUser() },
            });
          },
        },
        {
          title: 'user is sensed in proximity',
          onNavigation: () => {
            pushGetUserResponse({
              data: { user: generateAnonymousUser() },
            });
          },
        },
        {
          title: 'order is delivered elsewhere',
          onNavigation: () => {
            pushGetOrdersResponse({
              data: { orders: [] },
            });
          },
        },
      ]}
    />
  );
}
