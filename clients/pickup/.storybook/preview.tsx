import {
  MockedAppGqlProviders,
  MockedStaticConfigProviders,
} from '@bb/pickup/providers/withProviders';

import React from 'react';
import { StorySortMethod } from '@storybook/addons';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical' as StorySortMethod,
      includeName: true,
    },
  },
};

export const decorators = [
  (Story: React.ComponentType) => (
    <MockedStaticConfigProviders>
      <MockedAppGqlProviders>
        <Story />
      </MockedAppGqlProviders>
    </MockedStaticConfigProviders>
  ),
];
