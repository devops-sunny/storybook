import {
  MenuItem,
  MenuItemProduct,
  MenuItemProductSize,
} from '@bb/common/types/tmpTypes/menuEntityTypes';
import { ProductKey, productKeys } from './productKeys';

import { ProductVariationView } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { mockCalories } from './calories';
import { mockMenuItem } from './menuItem';
import { mockMenuItemProduct } from './menuItemProduct';
import { mockMenuItemProductSize } from './menuItemProductSize';

export const productVariationViews: ProductVariationView[] = productKeys.reduce<
  ProductVariationView[]
>((views: ProductVariationView[], key: ProductKey) => {
  const product: MenuItemProduct | undefined = mockMenuItemProduct[key];
  const productContent: MenuItem | undefined = mockMenuItem[key];
  const newViews: ProductVariationView[] =
    product?.productVariationIds.map((variation, index) => {
      const sizeObject: MenuItemProductSize =
        mockMenuItemProductSize[key].find((size) =>
          variation.name.includes(size.name),
        ) || mockMenuItemProductSize[key][0]!;
      const { displayName: sizeDisplayName, price, calories } = sizeObject;
      const productDisplayName: string = mockMenuItem[key].displayName;
      return {
        id: product.productVariationIds[index]!.id,
        name: product.productVariationIds[index]!.name,
        image: productContent.image,
        displayName: `${sizeDisplayName} ${productDisplayName}`,
        description: productContent.description,
        price: price,
        calories: calories,
        productDisplayName: productDisplayName,
        sizeDisplayName: sizeDisplayName,
      };
    }) || [];
  return [...views, ...newViews];
}, []);
