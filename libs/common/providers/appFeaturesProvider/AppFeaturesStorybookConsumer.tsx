import { Chip } from '@material-ui/core';
import React from 'react';
import { useAppFeatureFlags } from './AppFeaturesProvider';

export const AppFeaturesStorybookConsumer: React.FunctionComponent = () => {
  const features = useAppFeatureFlags();

  const featureFlagsManifest = Object.entries(features).map((featureEntry) => {
    const [key, feature] = featureEntry;
    return (
      <div key={JSON.stringify(feature)}>
        <h2>{feature.name}</h2>
        <h3>{feature.variant.name}</h3>
        <p>{feature.description}</p>
        <pre>
          <strong>{feature.identifier}:</strong> {feature.variant.identifier}
        </pre>
      </div>
    );
  });

  const ExampleRenderDefaultVariant = () => (
    <Chip
      label={`I am the DEFAULT render variant for feature "CONSUMER_WORKFLOW_MODE"`}
      color="primary"
    />
  );
  const ExampleRenderOtherVariant = () => (
    <Chip
      label={`I am the "B__VENDING_APPROACH" variant for feature "CONSUMER_WORKFLOW_MODE"`}
      color="secondary"
    />
  );

  const ExampleFeatureFlagConsumer = () => {
    // destructure the feature you care about from useAppFeatureFlags()
    const { CONSUMER_WORKFLOW_MODE } = features;
    // make a dictionary of the branching render logic
    const renderVariants: Record<string, JSX.Element> = {
      A__CAFE_APPROACH: <ExampleRenderDefaultVariant />,
      B__VENDING_APPROACH: <ExampleRenderOtherVariant />,
    };
    // return the branch specified by feature flag, or default to the default variant
    const featureVariant =
      CONSUMER_WORKFLOW_MODE?.variant.identifier || 'A__CAFE_APPROACH';
    return <>{renderVariants[featureVariant]}</>;
  };

  const exampleFeatureFlagConsumerCode = `    // destructure the feature you care about from useAppFeatureFlags()
    const { CONSUMER_WORKFLOW_MODE } = useAppFeatureFlags();

    // make a dictionary of the branching render logic
    const renderVariants: Record<string, JSX.Element> = {
      'A__CAFE_APPROACH': <ExampleRenderDefaultVariant/>,
      'B__VENDING_APPROACH': <ExampleRenderOtherVariant/>
    }

    // return the branch specified by feature flag, or default to the default variant
    const featureVariant = CONSUMER_WORKFLOW_MODE?.variant.identifier || 'A__CAFE_APPROACH';    
    return (<>{renderVariants[featureVariant]}</>);  // wrapped in <></>, which is the shorthand for a react fragment
  `;

  return (
    <div>
      <h1>
        Feature Flags from <code>AppFeaturesContext</code>
      </h1>
      {Object.keys(features).length ? (
        featureFlagsManifest
      ) : (
        <pre>{'{} No features loaded.'}</pre>
      )}
      <h1>Example Usage</h1>
      <h2>example code</h2>
      <pre>{exampleFeatureFlagConsumerCode}</pre>
      <h2>example render</h2>
      <ExampleFeatureFlagConsumer />
    </div>
  );
};
