import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../providers/withProviders';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  generateAppUserWithOrder,
  generateOrderWithIdandStatus,
} from '../providers/AppGqlDataProvider/helpers';

import { Delivery } from './Delivery';
import { timeouts } from '../common/constants';

function DeliveryViewMockRoutes() {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Delivery:
      // a very short timeout prevents race conditions from consecutive timeout-navigations
      return <Delivery timeoutMs={timeouts.UNIT_TEST_TICK} />;
    case AppMode.Idle:
      return <h1>Idle</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderDeliveryViewWithMockRoutes = () => {
  render(
    <UnitTestMockProviders>
      <MockedAppDataProviders
        orders={[generateOrderWithIdandStatus('o1', 'DeliveryQueued')]}
        user={generateAppUserWithOrder('o1')}>
        <AppModeProvider>
          <DeliveryViewMockRoutes />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

const setupDeliveryInRetrieving = async () => {
  renderDeliveryViewWithMockRoutes();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  await screen.findByRole('heading', { name: /delivery: retrieving/i });
};

const setupDeliveryInCollectFirst = async () => {
  await setupDeliveryInRetrieving();
  await screen.findByRole('heading', { name: /delivery: collect/i });
};

const setupDeliveryInInterstitial = async () => {
  await setupDeliveryInCollectFirst();
  fireEvent.click(
    screen.getByRole('button', {
      name: /user collects cup from the window/i,
    }),
  );
  await screen.findByRole('heading', { name: /delivery: interstitial/i });
};

const setupDeliveryInCollectLast = async () => {
  await setupDeliveryInInterstitial();
  await screen.findByRole('heading', { name: /delivery: collect/i });
};

const setupDeliveryInDone = async () => {
  await setupDeliveryInCollectLast();
  fireEvent.click(
    screen.getByRole('button', {
      name: /user collects last cup from the window/i,
    }),
  );
  await screen.findByRole('heading', { name: /delivery: done/i });
};

describe('given <Delivery />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when it mounts', () => {
    it('renders the Start view', () => {
      renderDeliveryViewWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /delivery: start/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when it reaches timeout', () => {
    it('renders the Retrieving view', async () => {
      renderDeliveryViewWithMockRoutes();
      act(() => {
        jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
      });

      expect(
        screen.getByRole('heading', { name: /delivery: retrieving/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given a <Delivery /> in a Retrieving state', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when it reaches timeout', () => {
    it('renders the Collect view', async () => {
      await setupDeliveryInRetrieving();
      act(() => {
        jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
      });

      expect(
        screen.getByRole('heading', { name: /delivery: collect/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given a <Delivery /> in a Collect state on first order item', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when user collects not-last order item from the window', () => {
    it('renders the Interstitial view', async () => {
      await setupDeliveryInCollectFirst();
      fireEvent.click(
        screen.getByRole('button', {
          name: /user collects cup from the window/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /delivery: interstitial/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given a <Delivery /> in Interstitial state', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when it reaches timeout', () => {
    it('renders Retrieving view', async () => {
      await setupDeliveryInInterstitial();
      act(() => {
        jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
      });

      expect(
        screen.getByRole('heading', { name: /delivery: retrieving/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given a <Delivery /> in Collect state on the last order item', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when user collects last order item from the window', () => {
    it('renders Done view', async () => {
      await setupDeliveryInCollectLast();
      fireEvent.click(
        screen.getByRole('button', {
          name: /user collects last cup from the window/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /delivery: done/i }),
      ).toBeInTheDocument();
    });
  });
});

describe('given a <Delivery /> in Done state with no other orders ready for delivery in the kiosk', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when it reaches timeout', () => {
    it('navigates to Idle', async () => {
      await setupDeliveryInDone();
      act(() => {
        jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
      });

      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
  });
});
