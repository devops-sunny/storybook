import { Navigate } from 'react-router-dom';
import { Payment } from './components/Payment';
import { PaymentProcessing } from './components/PaymentProcessing';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentSuccessOptionB } from './components/PaymentSuccessOptionB';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useAppFeatureFlags } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { useState } from 'react';

export type ConfirmPaymentProps = {
  timeoutMs: number;
};

export const ConfirmPayment: React.FunctionComponent<ConfirmPaymentProps> = (
  props,
) => {
  const { currentOrder } = useAppDataContext();
  const [navigateTo, setNavigateTo] = useState('');

  const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();
  const featureFlagVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier;

  // this represents the async payment processing
  const [query, setQuery] = useState<{
    data?: object;
    fetching: boolean;
    error?: object;
  }>({
    fetching: false,
  });

  if (navigateTo) return <Navigate to={navigateTo} />;
  if (currentOrder) {
    if (query.fetching) return <PaymentProcessing setQuery={setQuery} />;
    if (query.error) return <div>error</div>;
    if (query.data) {
      if (featureFlagVariant === 'B__VENDING_APPROACH') {
        return (
          <PaymentSuccessOptionB
            currentOrder={currentOrder}
            setNavigateTo={setNavigateTo}
            timeoutMs={props.timeoutMs}
          />
        );
      }
      return (
        <PaymentSuccess
          currentOrder={currentOrder}
          setNavigateTo={setNavigateTo}
          timeoutMs={props.timeoutMs}
        />
      );
    }
    return (
      <Payment
        currentOrder={currentOrder}
        setNavigateTo={setNavigateTo}
        setQuery={setQuery}
      />
    );
  } else return <Navigate to="/attract" />;
};
