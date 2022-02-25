import { Meta, Story } from '@storybook/react';
import {
  ProductConfigurationPresentation,
  ProductConfigurationPresentationProps,
} from './ProductConfiguration';

import { MemoryRouter } from 'react-router-dom';
import { productResponse } from '../fixtures/ProductConfiguration';

const meta: Meta<ProductConfigurationPresentationProps> = {
  title: 'Product Configuration',
  component: ProductConfigurationPresentation,
  argTypes: {
    onClickAddToCart: { action: 'clicked' },
    onSelectProductVariationId: { action: 'clicked' },
  },
};

export default meta;

const Template: Story<ProductConfigurationPresentationProps> = (args) => (
  <MemoryRouter>
    <ProductConfigurationPresentation {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});

Default.args = { data: productResponse.data };
Default.storyName = meta.title;
