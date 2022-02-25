import { Box, Button } from '@material-ui/core';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { ActionBar } from '@bb/common/actionBar/ActionBar';
import { LogoBar } from '@bb/common/appHeader/LogoBar';
import { MenuItem } from './MenuItem';
import { MenuItemList } from './MenuItemList';
import { MenuItemPopover } from './MenuItemPopover';
import { MenuItem as MenuItemType } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useState } from 'react';

export type SubMenuProps = {};

export function SubMenu(props: SubMenuProps) {
  const { currentOrder, setCurrentOrder, kioskMenus } = useAppDataContext();

  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    MenuItemType | undefined
  >();

  const { menuId = '' } = useParams();

  const [navigateTo, setNavigateTo] = useState('');

  const navigate = useNavigate();

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  const subMenuItem = kioskMenus?.subMenus[menuId];

  return (
    <>
      {anchorEl && (
        <MenuItemPopover
          anchorEl={anchorEl}
          productSizes={selectedMenuItem?.productSizes!}
          onClick={(size) => {
            // select the first product variation that matches the product size name
            const selectedProductVariationDefault =
              selectedMenuItem?.product?.productVariationIds.find((variation) =>
                variation.name.includes(size.name),
              );
            if (selectedProductVariationDefault) {
              setNavigateTo(
                `/order/${currentOrder?.id}/product/${selectedProductVariationDefault.id}`,
              );
            } else
              throw new Error(
                'the selected product size has no product variation',
              );
          }}
          onClose={() => setAnchorEl(undefined)}
        />
      )}
      <LogoBar />
      <MenuItemList
        description={subMenuItem?.description || ''}
        items={subMenuItem?.items || []}
        renderItem={MenuItem}
        onItemClick={(item, event) => {
          setSelectedMenuItem(item);
          setAnchorEl(event.currentTarget);
        }}
      />
      <Box flex="1 1 auto" />
      <ActionBar>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentOrder(undefined);
            setNavigateTo('/attract');
          }}>
          Cancel
        </Button>
      </ActionBar>
    </>
  );
}
