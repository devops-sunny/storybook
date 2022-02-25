import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import { Meta, Story } from '@storybook/react';

import { AppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { AppFeaturesStorybookWrapper } from '../providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { Attract } from './Attract';
import { Button } from '@material-ui/core';
import { MockedAppDataProviders } from '../providers/withProviders';
import React from 'react';
import { generateOrderWithIdandStatus } from '../providers/AppGqlDataProvider/helpers';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: 'Attract',
  decorators: [
    (Story) => (
      <MockedAppDataProviders
        orders={[generateOrderWithIdandStatus('o1', 'DeliveryReady')]}>
        <AppFeaturesStorybookWrapper.Default>
          <AppModeProvider>
            <Story />
          </AppModeProvider>
        </AppFeaturesStorybookWrapper.Default>
      </MockedAppDataProviders>
    ),
  ],
} as Meta;

export default meta;

export const Default: Story = (args) => {
  const { mode } = useAppModeContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const handleReset = () => {
    pushGetOrdersResponse({
      data: { orders: [generateOrderWithIdandStatus('o1', 'DeliveryReady')] },
    });
    pushGetUserResponse({
      data: { user: undefined },
    });
  };

  switch (mode) {
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Greet:
      return (
        <div>
          <p>
            <strong>Attract</strong> navigates to <strong>Greet</strong> when a
            user is present
          </p>
          <Button onClick={handleReset}>Reset to Attract</Button>
        </div>
      );
    case AppMode.Idle:
      return (
        <div>
          <p>
            <strong>Attract</strong> navigates to <strong>Idle</strong> when all
            orders have status updated to delivered
          </p>
          <Button onClick={handleReset}>Reset to Attract</Button>
        </div>
      );
  }

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.storyName = meta.title;
