import { MUTATION_PRODUCE_ORDER } from '@bb/order/gql/mutations';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useMutation } from 'urql';

export const PaymentProcessing: React.FunctionComponent<{
  setQuery: (query: {
    data?: object;
    fetching: boolean;
    error?: object;
  }) => void;
}> = (props) => {
  const { setQuery } = props;
  const { currentOrder, setCurrentOrder, producerId } = useAppDataContext();
  const [, produceOrder] = useMutation(MUTATION_PRODUCE_ORDER);

  return (
    <ViewSkeleton
      title="Confirm: Payment Processing"
      bgImageUrl={bgImages.CONFIRM_PAYMENT_PROCESSING}
      navigations={[
        {
          title: 'payment request returns success',
          onNavigation: () => {
            setQuery({
              data: {},
              fetching: false,
            });
            if (currentOrder) {
              produceOrder({
                orderId: currentOrder.id,
                preferredProducerId: producerId,
                delivererId: producerId,
              }).then(({ data }) => {
                setCurrentOrder(data.produceOrder.order);
              });
            }
          },
        },
        // @TODO - implement error sub-view
        // {
        //   title: 'payment request returns error',
        //   onNavigation: () => setQuery({
        //     fetching: false,
        //     error: {},
        //   }),
        // },
      ]}
    />
  );
};
