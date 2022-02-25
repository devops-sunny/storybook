import { AppFeatures, AppFeaturesJson } from './types';
import React, { createContext, useContext } from 'react';

import { defaultFeatures } from './features.mocks';
import { useQuery } from 'react-query';

const featuresConfigUrl =
  'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/features.json';

const AppFeaturesContext = createContext<AppFeatures | undefined>(undefined);

type AppFeaturesProviderProps = {
  features?: AppFeatures;
};

export function AppFeaturesProvider(
  props: React.PropsWithChildren<AppFeaturesProviderProps>,
) {
  const { children, features } = props;

  // app and storybook do not pass features in as prop, and then it loads remote features.json
  // unit tests should pass features in as prop, skipping the query
  // in any case, both <AppQueryClientProvider> and <AppFeaturesProvider> are required parents to any component using useAppFeatureFlags.
  const { data, isError, isLoading } = useQuery('features', fetchFeatures, {
    refetchOnWindowFocus: false,
    enabled: !features,
  });

  if (!data && !features) {
    if (isError) {
      return (
        <AppFeaturesContext.Provider value={defaultFeatures.features}>
          {children}
        </AppFeaturesContext.Provider>
      );
    }

    if (isLoading) {
      return <>Loading features.json...</>;
    }

    return null;
  }

  return (
    <AppFeaturesContext.Provider value={data || features}>
      {children}
    </AppFeaturesContext.Provider>
  );
}

export function useAppFeatureFlags(): AppFeatures {
  const context = useContext(AppFeaturesContext);

  if (!context) {
    throw new Error(
      'useAppFeatureFlags must be used in a descendent of AppFeaturesProvider',
    );
  }
  return context;
}

async function fetchFeatures(): Promise<AppFeatures> {
  const response = await fetch(featuresConfigUrl);
  const data: AppFeaturesJson = await response.json();
  return data.features;
}

export const MockedAppFeaturesProvider: React.FunctionComponent<{
  features?: AppFeatures;
}> = (props) => {
  return (
    <AppFeaturesContext.Provider
      value={props.features || defaultFeatures.features}>
      {props.children}
    </AppFeaturesContext.Provider>
  );
};
