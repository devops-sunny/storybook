import { Meta, Story } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import { ProductMenu } from './ProductMenu';
import { Provider } from 'urql';
import { fromValue } from 'wonka';
import { productsResponse } from '../fixtures/ProductMenu';

const meta = {
  title: 'Product Menu',
} as Meta;

export default meta;

const mockClient = {
  executeQuery: (query: any) =>
    fromValue({
      operation: query.operation,
      data: productsResponse.data,
    }),
} as any;

export const Default: Story = () => {
  return (
    <Provider value={mockClient}>
      <MemoryRouter>
        <ProductMenu />
      </MemoryRouter>
    </Provider>
  );
};

Default.storyName = meta.title;
