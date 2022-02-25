import {
  AppConfigProvider,
  AppQueryClientProvider,
  AppThemeProvider,
} from '@bb/common';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppMockDataProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppStaticConfigProvider } from '@bb/common/appConfig/AppStaticConfigProvider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider as UrqlProvider } from 'urql';
import { mockAppDynamicConfig } from '@bb/common/appConfig/mockAppDynamicConfig';
import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';

const emptyClient = {
  executeQuery: () => {},
} as any;

export const decorators = [
  (Story: React.ComponentType) => (
    <AppQueryClientProvider>
      <AppThemeProvider>
        <AppStaticConfigProvider config={mockAppStaticConfig}>
          {/* <UrqlProvider value={emptyClient}> */}
          <AppMockDataSubjectsProvider>
            <AppMockDataProvider>
              <AppConfigProvider
                staticConfig={mockAppStaticConfig}
                dynamicConfig={mockAppDynamicConfig}>
                <BrowserRouter>
                  <Story />
                </BrowserRouter>
              </AppConfigProvider>
            </AppMockDataProvider>
          </AppMockDataSubjectsProvider>
          {/* </UrqlProvider> */}
        </AppStaticConfigProvider>
      </AppThemeProvider>
    </AppQueryClientProvider>
  ),
];
