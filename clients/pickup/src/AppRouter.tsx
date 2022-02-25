import {
  AppMode,
  useAppModeContext,
} from './providers/AppModeProvider/AppModeProvider';

import { Attract } from './attract/Attract';
import { Delivery } from './delivery/Delivery';
import { Greet } from './greet/Greet';
import { Idle } from './idle/Idle';
import { Production } from './production/Production';
import { timeouts } from './common/constants';

export function AppRouter(): JSX.Element {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Idle:
      return <Idle />;
    case AppMode.Greet:
      return (
        <Greet
          greetTimeoutMs={timeouts.NAVIGATE_AFTER_IDLE}
          identifiedTimeoutMs={timeouts.NAVIGATE_AFTER_ACTION}
        />
      );
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Delivery:
      return <Delivery timeoutMs={timeouts.NAVIGATE_AFTER_ACTION} />;
    case AppMode.Production:
      return <Production timeoutMs={timeouts.NAVIGATE_AFTER_ACTION} />;
  }
}
