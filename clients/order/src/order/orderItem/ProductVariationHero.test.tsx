import { render, screen, waitFor } from '@testing-library/react';

import { ProductVariationHero } from './ProductVariationHero';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';

const renderProductVariationHero = () => {
  render(
    <ProductVariationHero
      heroImage={productVariationViews[0]?.image.sourceUrl!}
      sizeDisplayName={productVariationViews[0]?.sizeDisplayName!}
      productDisplayName={productVariationViews[0]?.productDisplayName!}
      productVariationDesc={productVariationViews[0]?.description!}
      orderItemPrice={productVariationViews[0]?.price!}
      orderItemCalories={productVariationViews[0]?.calories!}
    />,
  );
};

describe('given <ProductVariationHero /> with required props', () => {
  describe('when it mounts', () => {
    it('renders the provided image', () => {
      renderProductVariationHero();
      const menuItemImgEl = screen.getByRole('img');
      expect(menuItemImgEl).toHaveAttribute(
        'src',
        productVariationViews[0]?.image.sourceUrl!,
      );
    });

    it('it renders the provided product size', () => {
      renderProductVariationHero();
      expect(
        screen.getByText((text) =>
          text.includes(productVariationViews[0]?.sizeDisplayName!),
        ),
      ).toBeInTheDocument();
    });

    it('it renders the provided product name', () => {
      renderProductVariationHero();
      expect(
        screen.getByText(productVariationViews[0]?.productDisplayName!),
      ).toBeInTheDocument();
    });

    it('it renders the provided description', () => {
      renderProductVariationHero();
      expect(
        screen.getByText(productVariationViews[0]?.description!),
      ).toBeInTheDocument();
    });

    it('it renders the provided price', () => {
      renderProductVariationHero();
      expect(screen.getByText('$2.00')).toBeInTheDocument();
    });

    it('it renders the provided calories', () => {
      renderProductVariationHero();
      expect(
        screen.getByText(`${productVariationViews[0]?.calories!} cal`),
      ).toBeInTheDocument();
    });
  });
});
