import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import { Meta, Story } from '@storybook/react';
import {
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateWalkupUserWithOrder,
} from '../providers/AppGqlDataProvider/helpers';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagExperimentalArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesStorybookWrapper } from '../providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { Button } from '@material-ui/core';
import { MockedAppDataProviders } from '../providers/withProviders';
import { Production } from './Production';
import React from 'react';
import { mockProducer } from '@bb/common/fixtures/producers/mockProducer';
import { timeouts } from '../common/constants';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const preferredProducerId = 'mock-producer-id';

const meta = {
  title: '2B - Production/Production',
  argTypes: {
    ...storybookFeatureFlagArgType,
    order: {
      options: ['one item', 'two items', 'three items', 'four items'],
      mapping: {
        'one item': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'ProductionReady',
          1,
          preferredProducerId,
        ),
        'two items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'ProductionReady',
          2,
          preferredProducerId,
        ),
        'three items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'ProductionReady',
          3,
          preferredProducerId,
        ),
        'four items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'ProductionReady',
          4,
          preferredProducerId,
        ),
      },
      control: {
        type: 'select',
      },
    },
    // timeoutMs:
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <MockedAppDataProviders
      key={JSON.stringify(args)}
      orders={[{ ...args.order }]}
      user={generateWalkupUserWithOrder('o1')}>
      <AppFeaturesStorybookWrapper.WithArgs args={args}>
        <AppModeProvider>
          <ProductionStory {...args} />
        </AppModeProvider>
      </AppFeaturesStorybookWrapper.WithArgs>
    </MockedAppDataProviders>
  );
};

const ProductionStory: Story = (args) => {
  const { mode } = useAppModeContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const handleReset = () => {
    pushGetOrdersResponse({
      data: { orders: [args.order] },
    });
    pushGetUserResponse({
      data: { user: generateWalkupUserWithOrder('o1') },
    });
  };

  const Idle = () => (
    <div>
      <p>
        <strong>Production</strong> navigates to <strong>Idle</strong> after
        Production timeout
      </p>
      <Button onClick={handleReset}>Reset to Production</Button>
    </div>
  );

  const renderView: Record<any, JSX.Element> = {
    [AppMode.Production]: <Production timeoutMs={args.timeoutMs} />,
    [AppMode.Idle]: <Idle />,
  };

  return <>{renderView[mode]}</>;

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.args = {
  ...storybookFeatureFlagExperimentalArg,
  order: 'two items',
  timeoutMs: timeouts.STORYBOOK_NAVIGATE_AFTER_ACTION,
};

Default.storyName = meta.title.split('/')[1];
