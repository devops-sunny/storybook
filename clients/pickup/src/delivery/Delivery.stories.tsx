import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import { Meta, Story } from '@storybook/react';
import {
  generateAppUserWithOrder,
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateOrderWithIdandStatus,
} from '../providers/AppGqlDataProvider/helpers';

import { AppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { AppFeaturesStorybookWrapper } from '@bb/pickup/providers/AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { Button } from '@material-ui/core';
import { Delivery } from './Delivery';
import { MockedAppDataProviders } from '../providers/withProviders';
import React from 'react';
import { mockProducer } from '@bb/common/fixtures/producers/mockProducer';
import { timeouts } from '../common/constants';
import { useAppMockDataSubjects } from '../providers/AppGqlDataProvider/AppMockDataSubjectsProvider';

const preferredProducerId = mockProducer().value().id;

const meta = {
  title: 'Delivery',
  argTypes: {
    order: {
      options: ['one item', 'two items', 'three items', 'four items'],
      mapping: {
        'one item': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'DeliveryQueued',
          1,
          preferredProducerId,
        ),
        'two items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'DeliveryQueued',
          2,
          preferredProducerId,
        ),
        'three items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'DeliveryQueued',
          3,
          preferredProducerId,
        ),
        'four items': generateDirectDeliverOrderWithIdandStatusItemCount(
          'o1',
          'DeliveryQueued',
          4,
          preferredProducerId,
        ),
      },
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <MockedAppDataProviders
      key={JSON.stringify(args)}
      orders={[{ ...args.order }]}
      user={generateAppUserWithOrder('o1')}>
      <AppFeaturesStorybookWrapper.Default>
        <AppModeProvider>
          <DeliveryStory {...args} />
        </AppModeProvider>
      </AppFeaturesStorybookWrapper.Default>
    </MockedAppDataProviders>
  );
};

const DeliveryStory: Story = (args) => {
  const { mode } = useAppModeContext();
  const { pushGetUserResponse, pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const handleReset = () => {
    pushGetOrdersResponse({
      data: { orders: [generateOrderWithIdandStatus('o1', 'DeliveryQueued')] },
    });
    pushGetUserResponse({
      data: { user: generateAppUserWithOrder('o1') },
    });
  };

  const Idle = () => (
    <div>
      <p>
        <strong>Delivery</strong> navigates to <strong>Idle</strong> after
        post-delivery timeout
      </p>
      <Button onClick={handleReset}>Reset to Delivery</Button>
    </div>
  );

  const renderView: Record<any, JSX.Element> = {
    [AppMode.Delivery]: <Delivery timeoutMs={args.timeoutMs} />,
    [AppMode.Idle]: <Idle />,
  };

  return <>{renderView[mode]}</>;

  return <React.Fragment>No view found for the current mode</React.Fragment>;
};

Default.args = {
  order: 'two items',
  timeoutMs: timeouts.STORYBOOK_NAVIGATE_AFTER_ACTION,
};

Default.storyName = meta.title;
