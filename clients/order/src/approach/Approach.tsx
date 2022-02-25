import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../common/constants';

export type ApproachProps = {
  timeoutMs: number;
};

export function Approach(props: ApproachProps) {
  const [navigateTo, setNavigateTo] = useState('');
  const { timeoutMs } = props;

  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      setNavigateTo('/attract');
    }, timeoutMs);

    return () => clearTimeout(navigationTimeout);
  }, [timeoutMs]);

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <ViewSkeleton
      title="Approach"
      timeoutMs={timeoutMs}
      bgImageUrl={bgImages.APPROACH}
      navigations={[
        {
          title: 'user touches screen',
          onNavigation: () => setNavigateTo('/greet'),
        },
      ]}
    />
  );
}
