import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../providers/withProviders';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  generateAnonymousUser,
  generateOrderWithIdandStatus,
} from '../providers/AppGqlDataProvider/helpers';

import { Greet } from './Greet';
import { timeouts } from '../common/constants';

function GreetViewMockRoutes(props: { timeoutMs: number }) {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Greet:
      return (
        <Greet
          greetTimeoutMs={props.timeoutMs}
          identifiedTimeoutMs={props.timeoutMs}
        />
      );
    case AppMode.Attract:
      return <h1>Attract</h1>;
    case AppMode.Delivery:
      return <h1>Delivery</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderGreetViewWithMockRoutes = (timeoutMs?: number) => {
  render(
    <UnitTestMockProviders>
      <MockedAppDataProviders
        orders={[generateOrderWithIdandStatus('o1', 'DeliveryReady')]}
        user={generateAnonymousUser()}>
        <AppModeProvider>
          <GreetViewMockRoutes
            timeoutMs={timeoutMs ? timeoutMs : timeouts.UNIT_TEST_DEFAULT}
          />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

const setupInIdentified = () => {
  renderGreetViewWithMockRoutes();
  fireEvent.click(
    screen.getByRole('button', {
      name: /user identified by mobile app action/i,
    }),
  );
};

describe('given <Greet />', () => {
  describe('when it mounts', () => {
    it('renders the Greet sub-view', () => {
      renderGreetViewWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
    });

    it('renders a timeout progress indicator', () => {
      renderGreetViewWithMockRoutes(1);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('when user is identified by mobile app action', () => {
    it('navigates to Greet: Identified sub-view', () => {
      renderGreetViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /user identified by mobile app action/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /identified/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user is identified by selecting their order name from a list', () => {
    it('navigates to Greet: Identified sub-view', () => {
      renderGreetViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /user identified by selecting their order name from a list/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /identified/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user is identified via mobile near field communication tap', () => {
    it('navigates to Greet: Identified sub-view', () => {
      renderGreetViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /user identified via mobile near field communication tap/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /identified/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user is identified by QR code scan', () => {
    it('navigates to Greet: Identified sub-view', () => {
      renderGreetViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /user identified by QR code scan/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /identified/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when user taps cancel', () => {
    it('navigates to Attract view', () => {
      renderGreetViewWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /user taps cancel/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when Greet sub-view times out', () => {
    it('renders the Attract view', async () => {
      renderGreetViewWithMockRoutes();

      expect(
        await screen.findByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given <Greet /> in Identified sub-view', () => {
  describe('when it renders', () => {
    it('it renders the Identified sub-view', () => {
      setupInIdentified();

      expect(
        screen.getByRole('heading', { name: /identified/i }),
      ).toBeInTheDocument();
    });
  });
  describe('when it times out', () => {
    it('it navigates to the Delivery view', async () => {
      setupInIdentified();

      expect(
        await screen.findByRole('heading', { name: /delivery/i }),
      ).toBeInTheDocument();
    });
  });
});
