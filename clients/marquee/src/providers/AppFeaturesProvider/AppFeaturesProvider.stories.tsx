import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagDefaultArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppFeaturesStorybookConsumer } from '@bb/common/providers/appFeaturesProvider/AppFeaturesStorybookConsumer';

const meta: Meta = {
  title: 'Marquee App/Features Context',
  decorators: [(Story) => <Story />],
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
};

export default meta;

export const FeaturesContext: Story = (args) => {
  return (
    <AppFeaturesProvider
      features={args.features}
      key={JSON.stringify({
        features: args.features,
      })}>
      <AppFeaturesStorybookConsumer />
    </AppFeaturesProvider>
  );
};

FeaturesContext.storyName = meta.title.split('/')[1];
FeaturesContext.args = {
  ...storybookFeatureFlagDefaultArg,
};
