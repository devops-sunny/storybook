import { AppFeaturesLogger } from '@bb/common/providers/appFeaturesProvider/AppFeaturesLogger';
import { AppRoutes } from './AppRoutes';
import { NineSixteen } from './nineSixteen/NineSixteen';
import { withProviders } from './providers/withProviders';

export const App = withProviders(() => <AppLayout />);

export const AppLayout = () => {
  return (
    <AppFeaturesLogger>
      <NineSixteen>
        <AppRoutes />
      </NineSixteen>
    </AppFeaturesLogger>
  );
};
