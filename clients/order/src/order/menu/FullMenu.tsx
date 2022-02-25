import { Box, Button } from '@material-ui/core';

import { ActionBar } from '@bb/common/actionBar/ActionBar';
import { LogoBar } from '@bb/common/appHeader/LogoBar';
import { MenuItem } from './MenuItem';
import { MenuList } from './MenuList';
import { Navigate } from 'react-router-dom';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useState } from 'react';

export type FullMenuProps = {};

export function FullMenu(props: FullMenuProps) {
  const { currentOrder, setCurrentOrder, kioskMenus } = useAppDataContext();
  const [navigateTo, setNavigateTo] = useState('');

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }
  return (
    <>
      <LogoBar />
      <MenuList
        description={kioskMenus?.mainMenu?.description || ''}
        items={kioskMenus?.mainMenu?.items || []}
        renderItem={MenuItem}
        onItemClick={(subMenuId) =>
          setNavigateTo(`/order/${currentOrder?.id}/menu/${subMenuId}`)
        }
      />
      <Box flex="1 1 auto" />
      <ActionBar>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentOrder(undefined);
            setNavigateTo('/attract');
          }}>
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
