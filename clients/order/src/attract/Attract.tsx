import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../common/constants';
import { useAppFeatureFlags } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { useState } from 'react';

export type AttractProps = {};

export function Attract(props: AttractProps) {
  const [navigateTo, setNavigateTo] = useState('');
  const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();
  const featureFlagVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier;

  const AttractSkeleton = () => {
    return (
      <ViewSkeleton
        title="Attract"
        bgImageUrl={bgImages.ATTRACT}
        navigations={[
          {
            title: 'user touches screen',
            onNavigation: () => setNavigateTo('/greet'),
          },
          {
            title: 'user is nearby',
            onNavigation: () => setNavigateTo('/approach'),
          },
        ]}
      />
    );
  };

  const AttractSkeletonOptionB = () => {
    const greetRoute = '/greet';
    return (
      <ViewSkeleton
        title="Attract"
        bgImageUrl={bgImages.ATTRACT}
        navigations={[
          {
            title: 'user touches screen',
            onNavigation: () => setNavigateTo(greetRoute),
          },
          {
            title: 'user is nearby',
            onNavigation: () => setNavigateTo(greetRoute),
          },
        ]}
      />
    );
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }
  if (featureFlagVariant === 'B__VENDING_APPROACH') {
    return <AttractSkeletonOptionB />;
  }
  return <AttractSkeleton />;
}
