import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Order App/Data Provider',
};

export default meta;

export const AppDataObject: Story = () => {
  return (
    <>
      <h1>AppDataProvider</h1>
      <p>
        AppDataProvider provides the following data object with the{' '}
        <strong>
          <code>useAppDataContext</code>
        </strong>{' '}
        hook:
      </p>
      <h2>Current Order</h2>
      <pre>{`
      currentOrder: Order | undefined;

      type Order = {
        id: string;
        status: OrderItemStatusKey[];
        items: OrderItem[];
        validConditions: OrderItemValidityConditionKey[];
        invalidConditions: OrderItemValidityConditionKey[];
        completeConditions: OrderItemValidityConditionKey[];
        incompleteConditions: OrderItemValidityConditionKey[];
        updatedAt?: Date;
        name?: string;
      };
      `}</pre>
      <h2>Kiosk Menus</h2>
      <pre>{`
      kioskMenus: KioskMenus | undefined;

      type KioskMenus = {
        mainMenu: Menu | undefined;
        subMenus: Record<string, Menu> | undefined;
        suggestMenus?: Menu[];
      };
      `}</pre>
      <p>
        Sub Menus are provided as a hash map where the key is the Sub Menu's ID.
        As a result, it should be easy to obtain any submenu from the{' '}
        <strong>
          <code>kioskMenus</code>
        </strong>
        object:
      </p>
      <pre>{`
        const { kioskMenus } = useAppDataContext();
        const { menuId } = useParams(); // the ID of the menu to show is in the URL slug
        const currentViewSubMenu = kioskMenus.subMenus[menuId];
      `}</pre>
    </>
  );
};
