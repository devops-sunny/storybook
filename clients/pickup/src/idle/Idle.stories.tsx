import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagExperimentalArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesStorybookWrapper } from '../providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { Button } from '@material-ui/core';
import { Idle } from './Idle';
import { MockedAppDataProviders } from '../providers/withProviders';
import React from 'react';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: 'Idle',
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <MockedAppDataProviders orders={[]}>
      <AppFeaturesStorybookWrapper.WithArgs args={args}>
        <AppModeProvider>
          <IdleStory {...args} />
        </AppModeProvider>
      </AppFeaturesStorybookWrapper.WithArgs>
    </MockedAppDataProviders>
  );
};

const IdleStory: Story = (args) => {
  const { mode } = useAppModeContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const handleReset = () => {
    pushGetOrdersResponse({
      data: { orders: [] },
    });
    pushGetUserResponse({
      data: { user: undefined },
    });
  };

  switch (mode) {
    case AppMode.Idle:
      return <Idle />;
    case AppMode.Attract:
      return (
        <div>
          <p>
            <strong>Idle</strong> navigates to <strong>Attract</strong> when an
            app order completes production
          </p>
          <Button onClick={handleReset}>Reset to Idle</Button>
        </div>
      );
    case AppMode.Production:
      return (
        <div>
          <p>
            <strong>Idle</strong> navigates to <strong>Production</strong> when
            a walk-up order begins production
          </p>
          <Button onClick={handleReset}>Reset to Idle</Button>
        </div>
      );
    case AppMode.Delivery:
      return (
        <div>
          <p>
            <strong>Idle</strong> navigates to <strong>Delivery</strong> when a
            walk-up order completes production
          </p>
          <Button onClick={handleReset}>Reset to Idle</Button>
        </div>
      );
  }

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.storyName = meta.title;
Default.args = {
  ...storybookFeatureFlagExperimentalArg,
};
