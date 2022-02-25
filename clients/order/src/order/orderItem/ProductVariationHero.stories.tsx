import { Meta, Story } from '@storybook/react';

import { ProductVariationHero } from './ProductVariationHero';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';

enum mockProductVariations {
  'Large 16 oz Almond Milk Latte' = '5713582d-b715-42a4-895b-08bdd238964f',
  '12 oz Cappuccino' = '04a9f437-b7d7-48a9-af4f-7b63f112eeba',
  'Large 16 oz Caramel Latte' = '87575113-9b1e-4f50-b82c-56f5c0a4a507',
}

const meta = {
  title: '4-Order/Components/Product Variation Hero',
  argTypes: {
    productVariation: {
      defaultValue: '5713582d-b715-42a4-895b-08bdd238964f',
      control: { type: 'select', options: mockProductVariations },
      mapping: {
        '5713582d-b715-42a4-895b-08bdd238964f': productVariationViews[1],
        '04a9f437-b7d7-48a9-af4f-7b63f112eeba': productVariationViews.find(
          (view) => view.id === '04a9f437-b7d7-48a9-af4f-7b63f112eeba',
        ),
        '87575113-9b1e-4f50-b82c-56f5c0a4a507': productVariationViews[30],
      },
    },
  },
  args: {
    productVariation: '5713582d-b715-42a4-895b-08bdd238964f' as string,
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const selectedProductVariation = productVariationViews.find(
    (pv) => pv.id === args.productVariation.id,
  );

  return (
    <ProductVariationHero
      heroImage={selectedProductVariation?.image.sourceUrl!}
      sizeDisplayName={selectedProductVariation?.sizeDisplayName!}
      productDisplayName={selectedProductVariation?.productDisplayName!}
      productVariationDesc={selectedProductVariation?.description!}
      orderItemPrice={selectedProductVariation?.price!}
      orderItemCalories={selectedProductVariation?.calories!}
    />
  );
};

Default.storyName = 'Product Variation Hero';
