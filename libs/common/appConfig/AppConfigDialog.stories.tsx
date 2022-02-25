import {
  AppConfigDialogPresentation,
  AppConfigDialogPresentationProps,
} from './AppConfigDialog';
import { Meta, Story } from '@storybook/react';

import { Button } from '@material-ui/core';
import { storefrontsResponse } from '../fixtures/AppConfig';
import { useAppConfigContext } from './AppConfigProvider';

const meta: Meta<AppConfigDialogPresentationProps> = {
  title: 'App Config',
};

export default meta;

const Template: Story<AppConfigDialogPresentationProps> = (args) => {
  const { setAppConfigDialogIsOpen: setAppConfigIsOpen } =
    useAppConfigContext();

  return (
    <>
      <Button onClick={() => setAppConfigIsOpen(true)}>Open</Button>
      <AppConfigDialogPresentation {...args} />
    </>
  );
};

export const Default = Template.bind({});

Default.storyName = meta.title;
Default.args = {
  data: storefrontsResponse.data,
};
