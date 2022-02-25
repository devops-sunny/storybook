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

import { AppDataProvider } from '../../providers/AppDataProvider';
import { Approach } from './Approach';
import { Button } from '@material-ui/core';
import React from 'react';
import { SixteenNine } from '@bb/marquee/views/SixteenNine';
import { mockUser } from '@bb/common/fixtures/users/mockUser';
import { useAppMockDataSubjects } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';

// returns a function so presentAt is always NOW
const mockUsers = () => [mockUser().createWalkupUser().value()];

const meta = {
  title: 'Barker/Approach',
  decorators: [
    (Story) => (
      <AppDataProvider users={mockUsers()} orders={[]} debug>
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
  const { pushGetUsersResponse } = useAppMockDataSubjects();

  switch (mode) {
    case AppMode.Approach:
      return <Approach userExpirationMs={args.userExpirationMs} />;
    case AppMode.Attract:
      return (
        <div>
          <p>
            <strong>Approach</strong> navigates to <strong>Attract</strong> when
            no user present
          </p>
          <Button
            sx={{ marginRight: 'auto' }}
            onClick={() => {
              pushGetUsersResponse({
                data: {
                  users: mockUsers(),
                },
              });
            }}>
            reset to Approach
          </Button>
        </div>
      );
  }

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.storyName = meta.title?.split('/').pop();
Default.args = {
  userExpirationMs: 30 * 1000,
  ...storybookFeatureFlagExperimentalArg,
};
