import { WaitModeNavigation } from '../common/WaitModeNavigation';
import { bgImages } from '@bb/order/common/constants';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';

export type WaitHereProps = {
  timeoutMs: number;
};

export function WaitHere(props: WaitHereProps) {
  const { timeoutMs } = props;
  const { currentOrder } = useAppDataContext();

  return (
    <WaitModeNavigation
      title="Wait: Stand Here"
      timeoutMs={timeoutMs}
      bgImageUrl={bgImages.WAIT_STAND_HERE}
      timeoutNavigateTo={`/order/${currentOrder?.id}/progress`}
      updateNavigateTo={`/order/${currentOrder?.id}/progress`}
    />
  );
}
