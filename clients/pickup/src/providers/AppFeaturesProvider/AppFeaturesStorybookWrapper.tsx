import {
  AppFeaturesProvider,
  MockedAppFeaturesProvider,
} from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';

import { AppContainer } from '@bb/pickup/AppContainer';
import { defaultFeatures } from '@bb/common/providers/appFeaturesProvider/features.mocks';

const AppFeaturesStorybookWrapperDefault: React.FunctionComponent<{
  noContainer?: boolean;
}> = (props) => {
  return (
    <MockedAppFeaturesProvider features={defaultFeatures.features}>
      {props.noContainer ? (
        props.children
      ) : (
        <AppContainer>{props.children}</AppContainer>
      )}
    </MockedAppFeaturesProvider>
  );
};

type PropsWithStoryArgs = {
  args: Record<string, any>;
  noContainer?: boolean;
};

const AppFeaturesStorybookWrapperWithArgs: React.FunctionComponent<PropsWithStoryArgs> =
  (props) => {
    const { args } = props;
    return (
      <MockedAppFeaturesProvider
        features={args.features}
        key={JSON.stringify({
          features: args.features,
        })}>
        {props.noContainer ? (
          props.children
        ) : (
          <AppContainer>{props.children}</AppContainer>
        )}
      </MockedAppFeaturesProvider>
    );
  };

export const AppFeaturesStorybookWrapper = {
  Default: AppFeaturesStorybookWrapperDefault,
  WithArgs: AppFeaturesStorybookWrapperWithArgs,
};
