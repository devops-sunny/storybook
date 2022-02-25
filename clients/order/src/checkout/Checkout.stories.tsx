import { CheckoutPresentation, CheckoutPresentationProps } from './Checkout';
import { Meta, Story } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import { checkoutResponse } from '../fixtures/Checkout';

const meta: Meta<CheckoutPresentationProps> = {
  title: 'Checkout',
  argTypes: {
    onPlaceOrder: { action: 'clicked ' },
  },
};

export default meta;

const Template: Story<CheckoutPresentationProps> = (args) => (
  <MemoryRouter>
    <CheckoutPresentation {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});

Default.args = { data: checkoutResponse };
Default.storyName = meta.title;
