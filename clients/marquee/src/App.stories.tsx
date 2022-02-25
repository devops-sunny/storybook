import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagExperimentalArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppDataProvider } from './providers/AppDataProvider';
import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppModeProvider } from './providers/AppModeProvider';
import { MarqueeAppContent } from './AppContent';

const meta: Meta = {
  title: 'Marquee App/Navigation',
  component: MarqueeAppContent,
  decorators: [
    (Story) => (
      <AppDataProvider users={[]} orders={[]} debug>
        <AppModeProvider>
          <Story />
        </AppModeProvider>
      </AppDataProvider>
    ),
  ],
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
};

export default meta;

export const Navigation: Story = (args) => {
  return (
    <AppFeaturesProvider
      features={args.features}
      key={JSON.stringify({
        features: args.features,
      })}>
      <MarqueeAppContent />
    </AppFeaturesProvider>
  );
};

Navigation.storyName = meta.title.split('/')[1];
Navigation.args = {
  ...storybookFeatureFlagExperimentalArg,
};
