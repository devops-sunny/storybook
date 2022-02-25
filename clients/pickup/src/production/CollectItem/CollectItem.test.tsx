import { render, screen } from '@testing-library/react';

import { CollectItem } from './CollectItem';

const renderCollectItem = () => {
  render(
    <CollectItem
      index={1}
      count={2}
      productName="product name"
      modificationsName="modification name"
    />,
  );
};

describe('given <ProductionCollectItem />', () => {
  describe('when it mounts', () => {
    it('renders Collect', () => {
      renderCollectItem();
      expect(
        screen.getByRole('heading', { name: /collect/i }),
      ).toBeInTheDocument();
    });

    it('renders the provided product name', () => {
      renderCollectItem();
      expect(
        screen.getByRole('heading', { name: /product name/i }),
      ).toBeInTheDocument();
    });

    it('renders the provided modification name', async () => {
      renderCollectItem();
      expect(
        await screen.findByRole('heading', { name: /modification name/i }),
      ).toBeInTheDocument();
    });

    it('renders the provider order index and count as `x of y`', async () => {
      renderCollectItem();
      expect(await screen.getByText('1 of 2')).toBeInTheDocument();
    });
  });
});
