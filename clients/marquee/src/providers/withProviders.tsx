import {
  AppConfigProvider,
  AppQueryClientProvider,
  AppThemeProvider,
} from '@bb/common';

import { AppDataProvider } from './AppDataProvider';
import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppMockDataProvider } from './AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from './AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppModeProvider } from './AppModeProvider';
import { AppStaticConfigProvider } from '@bb/common/appConfig/AppStaticConfigProvider';
import { AppUrqlProvider } from './AppUrqlProvider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';

export const withProviders = <P extends object>(
  WrappedComponent: React.ComponentType,
): React.FC<P> => {
  return (props) => (
    <AppQueryClientProvider>
      <AppFeaturesProvider>
        <AppThemeProvider>
          <AppStaticConfigProvider>
            {/* <AppUrqlProvider> */}
            <AppMockDataSubjectsProvider>
              <AppMockDataProvider>
                <AppConfigProvider
                  staticConfig={{
                    ...mockAppStaticConfig,
                    clientName: 'marquee',
                  }}>
                  <AppDataProvider users={[]} orders={[]}>
                    <AppModeProvider>
                      <BrowserRouter>
                        <WrappedComponent {...props} />
                      </BrowserRouter>
                    </AppModeProvider>
                  </AppDataProvider>
                </AppConfigProvider>
              </AppMockDataProvider>
            </AppMockDataSubjectsProvider>
            {/* </AppUrqlProvider> */}
          </AppStaticConfigProvider>
        </AppThemeProvider>
      </AppFeaturesProvider>
    </AppQueryClientProvider>
  );
};
