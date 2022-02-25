import { AppContainer } from './AppContainer';
import { AppFeaturesLogger } from '@bb/common/providers/appFeaturesProvider/AppFeaturesLogger';
import { AppModeProvider } from './providers/AppModeProvider/AppModeProvider';
import { AppRouter } from './AppRouter';
import { withProviders } from './providers/withProviders';

export const App = withProviders(() => {
  return (
    <AppFeaturesLogger>
      <AppModeProvider>
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </AppModeProvider>
    </AppFeaturesLogger>
  );
});
