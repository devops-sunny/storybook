import React, { createContext, useContext } from 'react';

import { mockAppStaticConfig } from './mockAppStaticConfig';
import { useQuery } from 'react-query';

export type ServiceConfig = {
  gql: {
    endpoint: string;
    subscriptionEndpoint: string;
  };
};

export type AppStaticConfig = {
  services: Record<'gateway', ServiceConfig>;
  clientName: string;
};

const AppStaticConfigContext = createContext<AppStaticConfig | undefined>(
  undefined,
);

type Props = {
  config?: AppStaticConfig;
};

export function AppStaticConfigProvider(props: React.PropsWithChildren<Props>) {
  const { children, config } = props;

  const { data, isError, isLoading } = useQuery('config', fetchConfig, {
    refetchOnWindowFocus: false,
    enabled: !config,
  });

  if (!data && !config) {
    if (isError) {
      return <>Failed to load config.json!</>;
    }

    if (isLoading) {
      return <>Loading config.json...</>;
    }

    return null;
  }

  return (
    <AppStaticConfigContext.Provider value={data || config}>
      {children}
    </AppStaticConfigContext.Provider>
  );
}

export function useAppStaticConfig() {
  const context = useContext(AppStaticConfigContext);

  if (!context) {
    throw new Error(
      'useAppStaticConfig must be used in a descendent of AppStaticConfigProvider',
    );
  }

  return context;
}

async function fetchConfig() {
  const response = await fetch('/config.json');
  return (await response.json()) as AppStaticConfig;
}

export const MockedAppStaticConfigProvider: React.FunctionComponent<{}> = (
  props,
) => {
  return (
    <AppStaticConfigContext.Provider value={mockAppStaticConfig}>
      {props.children}
    </AppStaticConfigContext.Provider>
  );
};
