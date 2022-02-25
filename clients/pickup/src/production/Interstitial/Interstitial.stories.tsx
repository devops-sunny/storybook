import { Meta, Story } from '@storybook/react';

import { Interstitial } from './Interstitial';

const meta = {
  title: '2B - Production/3 - ProductionInterstitial',
  args: {
    headline: 'Headline Text',
    subheadline: 'Subheadline Text',
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <Interstitial headline={args.headline} subheadline={args.subheadline} />
  );
};

Default.storyName = meta.title.split('/')[1];
