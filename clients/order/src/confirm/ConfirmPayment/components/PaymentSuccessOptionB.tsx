import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';
import { useTimeoutFn } from 'react-use';

export const PaymentSuccessOptionB: React.FunctionComponent<{
  currentOrder: Order;
  setNavigateTo: (route: string) => void;
  timeoutMs: number;
}> = (props) => {
  const { currentOrder, setNavigateTo, timeoutMs } = props;
  const route = `/order/${currentOrder?.id}/handoff`;

  useTimeoutFn(() => {
    setNavigateTo(route);
  }, timeoutMs);

  return (
    <ViewSkeleton
      title="Confirm: Payment Success"
      bgImageUrl={bgImages.CONFIRM_SUCCESS}
      timeoutMs={props.timeoutMs}
      navigations={[]}
    />
  );
};
