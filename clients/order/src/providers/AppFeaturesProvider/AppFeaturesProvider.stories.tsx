import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagDefaultArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesStorybookConsumer } from '@bb/common/providers/appFeaturesProvider/AppFeaturesStorybookConsumer';
import { AppFeaturesStorybookWrapper } from '@bb/pickup/providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';

const meta: Meta = {
  title: 'Order App/Features Context',
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
};

export default meta;

export const FeaturesContext: Story = (args) => {
  return (
    <AppFeaturesStorybookWrapper.WithArgs args={args} noContainer>
      <AppFeaturesStorybookConsumer />
    </AppFeaturesStorybookWrapper.WithArgs>
  );
};

FeaturesContext.storyName = meta.title.split('/')[1];
FeaturesContext.args = {
  ...storybookFeatureFlagDefaultArg,
};
