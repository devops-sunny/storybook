import React, { useEffect, useMemo } from 'react';

import { AppFeatures } from './types';
import { useAppFeatureFlags } from './AppFeaturesProvider';

export const AppFeaturesLogger: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = (props) => {
  const features: AppFeatures = useAppFeatureFlags();

  useEffect(() => {
    // log features to console ONLY in development builds
    if (import.meta.env.DEV && import.meta.env.MODE === 'development') {
      console.group('[--- FEATURES ---]');
      Object.entries(features).forEach((featureEntry) => {
        const [key, feature] = featureEntry;
        console.groupCollapsed(`[${feature.name}]: ${feature.variant.name}`);
        console.info(`${feature.variant.description}`);
        console.info(`${feature.identifier}: ${feature.variant.identifier}`);
        console.groupEnd();
      });
      console.groupEnd();
    }
  }, [features]);

  return <>{props.children}</>;
};
