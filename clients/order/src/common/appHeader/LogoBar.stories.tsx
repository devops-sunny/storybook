import { Meta, Story } from '@storybook/react';

import { LogoBar } from '@bb/common/appHeader/LogoBar';

const meta = {
  title: 'Common/LogoBar',
} as Meta;

export default meta;

export const Default: Story = () => {
  return <LogoBar />;
};

Default.storyName = meta.title.split('/')[1];
