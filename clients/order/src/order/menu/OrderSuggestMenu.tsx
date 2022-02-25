import { Navigate } from 'react-router-dom';
import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';
import { bgImages } from '@bb/order/common/constants';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useState } from 'react';

export type OrderSuggestMenuProps = {};

export function OrderSuggestMenu(props: OrderSuggestMenuProps) {
  const { currentOrder, setCurrentOrder } = useAppDataContext();
  const [showSizesPopover, setShowSizesPopover] = useState<boolean>(false);
  const [navigateTo, setNavigateTo] = useState('');

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return !showSizesPopover ? (
    <ViewSkeleton
      title="Order: Menu Suggest"
      bgImageUrl={bgImages.MENU_SUGGEST}
      navigations={[
        {
          title: 'user selects suggested product',
          onNavigation: () => setShowSizesPopover(true),
        },
        {
          title: 'user touches a full menu button',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/menu/menuB`),
        },
        {
          title: 'user taps Back button',
          onNavigation: () => {
            // end the order session
            setCurrentOrder(undefined);
            setNavigateTo('/approach');
          },
        },
      ]}
    />
  ) : (
    <ViewSkeleton
      title="Order: Menu Suggest w/ Size Popover"
      bgImageUrl={bgImages.MENU_SUGGEST_SIZES}
      navigations={[
        {
          title: 'user selects a product with size',
          onNavigation: () =>
            setNavigateTo(
              `/order/${currentOrder?.id}/product/a953ef9c-9cc1-4c02-b928-b193fb8c08b6`,
            ),
        },
        {
          title: 'user taps outside size popover',
          onNavigation: () => setShowSizesPopover(false),
        },
        {
          title: 'user touches a full menu button',
          onNavigation: () =>
            setNavigateTo(`/order/${currentOrder?.id}/menu/menuB`),
        },
        {
          title: 'user taps Back button',
          onNavigation: () => setNavigateTo('/approach'),
        },
      ]}
    />
  );
}
