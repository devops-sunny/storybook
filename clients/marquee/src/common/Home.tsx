import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { useState } from 'react';

export type Props = {};

export function Home(props: Props) {
  const [navigateTo, setNavigateTo] = useState('');

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <ViewSkeleton
      title="Barker"
      navigations={[
        { title: 'Attract', onNavigation: () => setNavigateTo('/attract') },
        { title: 'Approach', onNavigation: () => setNavigateTo('/approach') },
      ]}
    />
  );
}
