import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import { Meta, Story } from '@storybook/react';
import {
  generateAnonymousUser,
  generateOrderWithIdandStatus,
} from '../providers/AppGqlDataProvider/helpers';

import { AppContainer } from '../AppContainer';
import { AppFeaturesStorybookWrapper } from '../providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { Button } from '@material-ui/core';
import { Greet } from './Greet';
import { MockedAppDataProviders } from '../providers/withProviders';
import React from 'react';
import { timeouts } from '../common/constants';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const meta = {
  title: 'Greet',
  decorators: [
    (Story) => (
      <MockedAppDataProviders
        orders={[generateOrderWithIdandStatus('o1', 'DeliveryReady')]}
        user={generateAnonymousUser()}>
        <AppFeaturesStorybookWrapper.Default>
          <AppModeProvider>
            <AppContainer>
              <Story />
            </AppContainer>
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
      data: { user: generateAnonymousUser() },
    });
  };

  switch (mode) {
    case AppMode.Greet:
      return (
        <Greet
          greetTimeoutMs={args.greetTimeoutMs}
          identifiedTimeoutMs={args.identifiedTimeoutMs}
        />
      );
    case AppMode.Attract:
      return (
        <div>
          <p>
            <strong>Greet</strong> navigates to <strong>Attract</strong> when
            user taps cancel or view times out
          </p>
          <Button onClick={handleReset}>reset to Greet</Button>
        </div>
      );
    case AppMode.Delivery:
      return (
        <div>
          <p>
            <strong> Greet</strong> navigates to <strong>Delivery</strong> when
            a user is identified
          </p>
          <Button onClick={handleReset}>reset to Greet</Button>
        </div>
      );
  }

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.args = {
  greetTimeoutMs: timeouts.STORYBOOK_NAVIGATE_AFTER_IDLE,
  identifiedTimeoutMs: timeouts.STORYBOOK_NAVIGATE_AFTER_ACTION,
};

Default.storyName = meta.title;
