import {
  AppDataProvider,
  useAppDataContext,
} from '../../providers/AppDataProvider';
import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../../providers/AppModeProvider';
import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagExperimentalArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { Attract } from './Attract';
import { Button } from '@material-ui/core';
import React from 'react';
import { SixteenNine } from '@bb/marquee/views/SixteenNine';
import { useAppMockDataSubjects } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: 'Barker/Attract',
  decorators: [
    (Story) => (
      <AppDataProvider users={[]} orders={[]} debug>
        <AppModeProvider>
          <SixteenNine>
            <Story />
          </SixteenNine>
        </AppModeProvider>
      </AppDataProvider>
    ),
  ],
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const { mode } = useAppModeContext();
  const eventData = useAppDataContext();
  const { pushGetUsersResponse } = useAppMockDataSubjects();

  switch (mode) {
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Approach:
      return (
        <div>
          <p>
            <strong>Attract</strong> navigates to <strong>Approach</strong> when
            a user is present
          </p>
          <Button
            sx={{ marginRight: 'auto' }}
            onClick={() => {
              pushGetUsersResponse({
                data: {
                  users: [],
                },
              });
            }}>
            reset to Attract
          </Button>
        </div>
      );
  }

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  ...storybookFeatureFlagExperimentalArg,
};
