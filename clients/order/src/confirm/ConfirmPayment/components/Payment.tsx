import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';

export const Payment: React.FunctionComponent<{
  currentOrder: Order;
  setNavigateTo: (route: string) => void;
  setQuery: (query: {
    data?: object;
    fetching: boolean;
    error?: object;
  }) => void;
}> = (props) => {
  const { currentOrder, setNavigateTo, setQuery } = props;
  return (
    <ViewSkeleton
      title="Confirm: Payment"
      bgImageUrl={bgImages.CONFIRM_PAYMENT}
      navigations={[
        {
          title: 'user pays by inserting card in terminal',
          onNavigation: () => setQuery({ fetching: true }),
        },
        {
          title: 'when user pays by tapping mobile NFC on terminal',
          onNavigation: () => setQuery({ fetching: true }),
        },
        {
          title: 'user taps Cancel Payment',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/summary`),
        },
      ]}
    />
  );
};
