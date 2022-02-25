import { Meta, Story } from '@storybook/react';
import {
  POC_UrqlSubjectsProvider,
  usePocUrqlSubjectsProvider,
} from './POC_UrqlSubjectsProvider';

import { POC_ComponentWithMockedUrqlQuery } from './POC_ComponentWithMockedUrqlQuery';
import { POC_UrqlProvider } from './POC_UrqlProvider';

const meta = {
  title: 'urqlPOC',
} as Meta;

export default meta;

// this story demonstrates a proof of concept for a mock urql client and provider that provides a stream of mock responses, which can be updated through user action in the app
export const Default: Story = () => {
  return (
    <POC_UrqlSubjectsProvider>
      <POC_UrqlProvider>
        <POC_ComponentWithMockedUrqlQuery />
      </POC_UrqlProvider>
    </POC_UrqlSubjectsProvider>
  );
};
