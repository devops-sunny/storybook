import { render, screen } from '@testing-library/react';

import { PreparingItem } from './PreparingItem';
import { ViewContainer } from '@bb/pickup/common/ViewContainer';

const renderPreparingItem = () => {
  render(
    <PreparingItem
      index={1}
      count={2}
      productName="product name"
      modificationsName="modification name"
    />,
  );
};

describe('given <ProductionPreparingItem />', () => {
  describe('when it mounts', () => {
    it('renders the product name', () => {
      renderPreparingItem();
      expect(
        screen.getByRole('heading', { name: /product name/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when it mounts', () => {
    it('renders the modification name', async () => {
      renderPreparingItem();
      expect(
        await screen.findByRole('heading', { name: /modification name/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when it mounts', () => {
    it('renders the current order count and index', async () => {
      renderPreparingItem();
      expect(await screen.getByText('1 of 2')).toBeInTheDocument();
    });
  });
});
