import { Meta, Story } from '@storybook/react';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';
import {
  generateAppUserWithOrder,
  generateOrderWithIdandStatus,
} from '../AppGqlDataProvider/helpers';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagDefaultArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesStorybookWrapper } from '../AppFeaturesProvider/AppFeaturesStorybookWrapper';
import { AppModeProvider } from './AppModeProvider';
import { AppRouter } from '../../AppRouter';
import { MockedAppDataProviders } from '../withProviders';
import { OrderItemStatus } from '@bb/pickup/generated/graph';

const meta: Meta = {
  title: 'Common/App Navigation',
  component: AppModeProvider,
  argTypes: {
    ...storybookFeatureFlagArgType,
    userIsPresent: { control: { type: 'boolean' } },
    userIsIdentified: { control: { type: 'boolean' } },
    orderStatus: {
      control: {
        type: 'select',
        options: [
          OrderItemStatus.ProductionReady,
          OrderItemStatus.ProductionInProgress,
          OrderItemStatus.DeliveryQueued,
          OrderItemStatus.DeliveryInProgress,
          OrderItemStatus.DeliveryPresented,
          OrderItemStatus.DeliveryReady,
        ],
      },
    },
  },
};

export default meta;

const Template: Story = (args) => {
  const orders: Order[] = [
    generateOrderWithIdandStatus('order1', args.orderStatus),
    generateOrderWithIdandStatus('order2', 'DeliveryAbandoned'),
  ];

  const user: User | undefined = args.userIsPresent
    ? generateAppUserWithOrder('order1')
    : undefined;

  // keying the EventDataProvider with the args JSON forces a remount of the provider on every update, which keeps the provided state in sync with the story controls
  return (
    <MockedAppDataProviders
      orders={orders}
      user={user}
      key={JSON.stringify(args)}>
      <AppFeaturesStorybookWrapper.WithArgs args={args}>
        <AppModeProvider>
          <AppRouter />
        </AppModeProvider>
      </AppFeaturesStorybookWrapper.WithArgs>
    </MockedAppDataProviders>
  );
};

export const Default = Template.bind({});

Default.storyName = 'App Navigation';
Default.args = {
  ...storybookFeatureFlagDefaultArg,
  userIsPresent: false,
  userIsIdentified: false,
  orderStatus: OrderItemStatus.ProductionReady,
};
