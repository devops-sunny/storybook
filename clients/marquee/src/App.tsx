import { AppFeaturesLogger } from '@bb/common/providers/appFeaturesProvider/AppFeaturesLogger';
import { MarqueeAppContent } from './AppContent';
import { withProviders } from './providers/withProviders';

export const App = withProviders(() => {
  return (
    <AppFeaturesLogger>
      <MarqueeAppContent />
    </AppFeaturesLogger>
  );
});
