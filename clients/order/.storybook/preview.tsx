import {
  AppConfigProvider,
  AppQueryClientProvider,
  AppThemeProvider,
} from '@bb/common';
import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { AppStaticConfigProvider } from '@bb/common/appConfig/AppStaticConfigProvider';
import React from 'react';
import { StorySortMethod } from '@storybook/addons';
import { Provider as UrqlProvider } from 'urql';
import { mockAppDynamicConfig } from '@bb/common/appConfig/mockAppDynamicConfig';
import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';

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

const emptyClient = {
  executeQuery: () => {},
} as any;

export const decorators = [
  (Story: React.ComponentType) => (
    <AppQueryClientProvider>
      <AppStaticConfigProvider config={mockAppStaticConfig}>
        <UrqlProvider value={emptyClient}>
          <AppConfigProvider
            staticConfig={mockAppStaticConfig}
            dynamicConfig={mockAppDynamicConfig}>
            <AppMockDataSubjectsProvider>
              <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
                <AppThemeProvider>
                  <Story />
                </AppThemeProvider>
              </AppGqlDataProvider>
            </AppMockDataSubjectsProvider>
          </AppConfigProvider>
        </UrqlProvider>
      </AppStaticConfigProvider>
    </AppQueryClientProvider>
  ),
];
