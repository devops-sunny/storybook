import {
  AppConfigProvider,
  AppQueryClientProvider,
  AppThemeProvider,
  useAppConfig,
} from '@bb/common';
import {
  AppStaticConfigProvider,
  useAppStaticConfig,
} from '@bb/common/appConfig/AppStaticConfigProvider';

import { AppDataProvider } from './AppDataProvider/AppDataProvider';
import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppGqlDataProvider } from './AppGqlDataProvider/AppGqlDataProvider';
import { AppMockDataSubjectsProvider } from './AppGqlDataProvider/AppMockDataSubjectsProvider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const StaticConfigProviders: React.FunctionComponent<{}> = (props) => {
  return (
    <AppQueryClientProvider>
      <AppFeaturesProvider>
        <AppThemeProvider>
          <AppStaticConfigProvider>{props.children}</AppStaticConfigProvider>
        </AppThemeProvider>
      </AppFeaturesProvider>
    </AppQueryClientProvider>
  );
};

const DynamicConfigProviders: React.FunctionComponent<{}> = (props) => {
  const staticConfig = useAppStaticConfig();

  return (
    <AppConfigProvider staticConfig={staticConfig}>
      {props.children}
    </AppConfigProvider>
  );
};

const GqlProviders: React.FunctionComponent<{}> = (props) => {
  const {
    services: {
      gateway: {
        gql: { endpoint },
      },
    },
  } = useAppStaticConfig();

  return (
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={endpoint}>
        {props.children}
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>
  );
};

const DataProviders: React.FunctionComponent<{}> = (props) => {
  const { storefrontId, storefrontName, producerId, producerSerial } =
    useAppConfig();

  return (
    <AppDataProvider
      storefrontId={storefrontId}
      storefrontName={storefrontName}
      producerId={producerId}
      producerSerial={producerSerial}
      debug>
      {props.children}
    </AppDataProvider>
  );
};

export const withProviders = <P extends object>(
  WrappedComponent: React.ComponentType,
): React.FC<P> => {
  return (props) => (
    <StaticConfigProviders>
      <GqlProviders>
        <DynamicConfigProviders>
          <DataProviders>
            <BrowserRouter>
              <WrappedComponent {...props} />
            </BrowserRouter>
          </DataProviders>
        </DynamicConfigProviders>
      </GqlProviders>
    </StaticConfigProviders>
  );
};
