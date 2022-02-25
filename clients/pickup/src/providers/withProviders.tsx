import {
  AppConfigProvider,
  AppQueryClientProvider,
  AppThemeProvider,
  useAppConfig,
} from '@bb/common';
import {
  AppFeaturesProvider,
  MockedAppFeaturesProvider,
} from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import {
  AppStaticConfigProvider,
  MockedAppStaticConfigProvider,
  useAppStaticConfig,
} from '@bb/common/appConfig/AppStaticConfigProvider';
import { Order, User } from '@bb/common/types/tmpTypes/entityTypes';

import { AppDataProvider } from './AppDataProvider/AppDataProvider';
import { AppFeatures } from '@bb/common/providers/appFeaturesProvider/types';
import { AppGqlDataProvider } from './AppGqlDataProvider/AppGqlDataProvider';
import { AppMockDataSubjectsProvider } from './AppGqlDataProvider/AppMockDataSubjectsProvider';
import React from 'react';
import { mockAppDynamicConfig } from '@bb/common/appConfig/mockAppDynamicConfig';
import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';

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

export const MockedStaticConfigProviders: React.FunctionComponent<{
  features?: AppFeatures;
}> = (props) => {
  return (
    <MockedAppFeaturesProvider features={props.features}>
      <AppThemeProvider>
        <MockedAppStaticConfigProvider>
          {props.children}
        </MockedAppStaticConfigProvider>
      </AppThemeProvider>
    </MockedAppFeaturesProvider>
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

const AppGqlProviders: React.FunctionComponent<{}> = (props) => {
  // @TODO - add protection against a malformed config.json
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

export const MockedAppGqlProviders: React.FunctionComponent<{}> = (props) => {
  return (
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider
        gqlEndpoint={mockAppStaticConfig.services.gateway.gql.endpoint}
        mock>
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
      orders={[]}
      storefrontId={storefrontId}
      storefrontName={storefrontName}
      producerId={producerId}
      producerSerial={producerSerial}
      // @TEMP
      debug>
      {props.children}
    </AppDataProvider>
  );
};

export const MockedAppDataProviders: React.FunctionComponent<{
  orders: Order[];
  user?: User;
}> = (props) => {
  const { storefrontId, storefrontName, producerId, producerSerial } =
    mockAppDynamicConfig;

  return (
    <AppDataProvider
      orders={props.orders}
      user={props.user}
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
      <AppGqlProviders>
        <DynamicConfigProviders>
          <DataProviders>
            <WrappedComponent {...props} />
          </DataProviders>
        </DynamicConfigProviders>
      </AppGqlProviders>
    </StaticConfigProviders>
  );
};

export const UnitTestMockProviders: React.FunctionComponent<{
  features?: AppFeatures;
}> = (props) => {
  return (
    <MockedStaticConfigProviders features={props.features}>
      <MockedAppGqlProviders>{props.children}</MockedAppGqlProviders>
    </MockedStaticConfigProviders>
  );
};
