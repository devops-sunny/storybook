import { Meta, Story } from '@storybook/react';

import { AppContainer } from './AppContainer';

const meta: Meta = {
  title: 'App Container',
  component: AppContainer,
};

export default meta;

export const Default: Story = () => {
  return <AppContainer>Pickup app content</AppContainer>;
};

Default.storyName = meta.title;
