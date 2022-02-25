import { Meta, Story } from '@storybook/react';
import {
  ViewSkeleton,
  ViewSkeletonProps,
} from '@bb/common/viewSkeleton/ViewSkeleton';

import { action } from '@storybook/addon-actions';
import { timeouts } from '../common/constants';

const meta = {
  title: 'View Skeleton',
  component: ViewSkeleton,
} as Meta;

export default meta;

const Template: Story<ViewSkeletonProps> = (args) => {
  const { timeoutMs, ...rest } = args;
  return (
    <ViewSkeleton
      {...rest}
      timeoutMs={timeoutMs ? timeoutMs : undefined}
      key={JSON.stringify(args)}
    />
  );
};

export const Default = Template.bind({});

const handleAttractEvent = action('Attract event: navigate to Attract');
const handleGreetEvent = action('Greet event: navigate to Greet');

Default.args = {
  title: 'Order Routes',
  timeoutMs: timeouts.UNIT_TEST_DEFAULT,
  navigations: [
    {
      title: 'Attract',
      onNavigation: handleAttractEvent,
    },
    {
      title: 'Greet',
      onNavigation: handleGreetEvent,
    },
  ],
  bgImageUrl: '',
};

Default.storyName = meta.title;
