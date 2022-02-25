import { render, screen } from '@testing-library/react';

import { Interstitial } from './Interstitial';

const renderInterstitial = () => {
  render(
    <Interstitial headline="Hello Headline" subheadline="Hello SubHeadline" />,
  );
};

describe('given <ProductionInterstitial />', () => {
  describe('when it mounts', () => {
    it('renders the Headline', () => {
      renderInterstitial();
      expect(
        screen.getByRole('heading', { name: /Hello Headline/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when it mounts', () => {
    it('renders the SubHeadline', async () => {
      renderInterstitial();
      expect(
        await screen.findByRole('heading', { name: /Hello SubHeadline/i }),
      ).toBeInTheDocument();
    });
  });
});
