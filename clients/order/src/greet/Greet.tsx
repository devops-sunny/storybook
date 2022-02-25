import { useEffect, useState } from 'react';

import { MUTATION_CREATE_ORDER } from '../gql/mutations';
import { Navigate } from 'react-router-dom';
import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '../common/constants';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useMount } from 'react-use';
import { useMutation } from 'urql';

export type GreetProps = {
  timeoutMs: number;
};

export function Greet(props: GreetProps) {
  const { timeoutMs } = props;
  const { currentOrder, setCurrentOrder, kioskMenus, storefrontId } =
    useAppDataContext();
  const [navigateTo, setNavigateTo] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);
  const [createOrderResult, createOrder] = useMutation<{
    createOrder: { order: Order };
  }>(MUTATION_CREATE_ORDER);

  useMount(() => {
    setCurrentOrder(undefined);
    createOrder({ input: { storefrontId } }).then((response) => {
      if (response.data) {
        setCurrentOrder(response.data.createOrder.order);
      }
    });
  });

  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      setShouldNavigate(true);
    }, timeoutMs);

    return () => clearTimeout(navigationTimeout);
  }, [timeoutMs]);

  useEffect(() => {
    if (shouldNavigate && currentOrder) {
      setNavigateTo(
        `/order/${currentOrder.id}/menu/${kioskMenus?.mainMenu.id}`,
      );
    }
  }, [shouldNavigate, currentOrder, kioskMenus]);

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <ViewSkeleton
      title="Greet"
      timeoutMs={timeoutMs}
      bgImageUrl={bgImages.GREET}
      navigations={[
        {
          title: 'user touches screen',
          onNavigation: () => {
            if (currentOrder) {
              setNavigateTo(
                `/order/${currentOrder?.id}/menu/${kioskMenus?.mainMenu.id}`,
              );
            }
          },
        },
        {
          title: 'user touches cancel button',
          onNavigation: () => {
            // end the order session
            setCurrentOrder(undefined);
            setNavigateTo('/approach');
          },
        },
      ]}
    />
  );
}
