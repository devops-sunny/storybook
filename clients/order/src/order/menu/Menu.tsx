import { Navigate, useParams } from 'react-router-dom';

import { FullMenu } from './FullMenu';
import { SubMenu } from './SubMenu';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';

export type MenuProps = {};

export function Menu(props: MenuProps) {
  const { menuId = '' } = useParams();
  const { kioskMenus } = useAppDataContext();
  if (!kioskMenus)
    throw new Error('No menus were loaded when trying to navigate to a menu.');

  const { mainMenu, subMenus } = kioskMenus;
  const subMenuIds = Object.keys(subMenus);

  if (mainMenu.id === menuId) return <FullMenu />;
  else if (subMenuIds.includes(menuId)) return <SubMenu />;
  else return <Navigate to="/attract" />;
}
