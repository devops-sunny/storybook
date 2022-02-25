export type Kiosk = {
  id: string;
  name: string;
  mainMenu: {
    id: string;
    name: string;
    items: Array<{
      id: string;
      name: string;
    }>;
  };
  suggestMenus?: Menu[];
};

export type SubMenu = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  image: Image;
};

export type Menu = SubMenu & {
  items: Array<SubMenu | MenuItem>;
};

export type MenuItem = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  image: Image;
  product?: MenuItemProduct;
  productSizes?: MenuItemProductSize[];
};

export type MenuItemProduct = {
  id: string;
  name: string;
  productVariationIds: MenuProductVariation[];
};

export type MenuProductVariation = {
  id: string;
  name: string;
};

export type MenuItemProductSize = {
  id: string;
  name: string;
  productId: string;
  sizeComponentId: string;
  displayName: string;
  price: Price;
  calories: number;
};

export type Price = {
  value: number;
  iso4217Currency: CurrencyCodeRecord;
};

export type Image = {
  id: string;
  name: string;
  accessibleName: string;
  sourceUrl: string;
};

// from not-yet-installed dependency under consideration: https://github.com/freeall/currency-codes
export interface CurrencyCodeRecord {
  code: string;
  number: string;
  digits: number;
  currency: string;
  countries: string[];
}

export type KioskMenus = {
  mainMenu: Menu;
  subMenus: Record<string, Menu>;
  suggestMenus?: Menu[];
};
