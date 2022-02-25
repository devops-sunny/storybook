import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useState } from 'react';
import { useTimeoutFn } from 'react-use';

export type ConfirmHandoffProps = {
  timeoutMs: number;
};

export function ConfirmHandoff(props: ConfirmHandoffProps) {
  const { setCurrentOrder } = useAppDataContext();
  const [navigateTo, setNavigateTo] = useState('');
  const route = '/attract';

  useTimeoutFn(() => {
    setCurrentOrder(undefined);
    setNavigateTo(route);
  }, props.timeoutMs);

  if (navigateTo) return <Navigate to={navigateTo} />;
  return (
    <ViewSkeleton
      title="Confirm: Handoff"
      bgImageUrl={bgImages.CONFIRM_INTERSTITIAL}
      timeoutMs={props.timeoutMs}
      navigations={[]}
    />
  );
}
