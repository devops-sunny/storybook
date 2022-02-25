import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../common/constants';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';

export type DeliveryProps = {
  timeoutMs: number;
};

export function Delivery(props: DeliveryProps) {
  const { setCurrentOrder } = useAppDataContext();
  const [navigateTo, setNavigateTo] = useState('');
  const { timeoutMs } = props;

  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      // close the order session
      setCurrentOrder(undefined);
      setNavigateTo('/approach');
    }, timeoutMs);

    return () => clearTimeout(navigationTimeout);
  }, [timeoutMs, setCurrentOrder]);

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <ViewSkeleton
      title="Delivery"
      timeoutMs={timeoutMs}
      bgImageUrl={bgImages.DELIVERY}
      navigations={[]}
    />
  );
}
