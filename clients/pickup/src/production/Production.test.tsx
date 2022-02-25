import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../providers/AppModeProvider/AppModeProvider';
import {
  MockedAppDataProviders,
  UnitTestMockProviders,
} from '../providers/withProviders';
import { act, render, screen } from '@testing-library/react';
import {
  generateDirectDeliverOrderWithIdandStatusItemCount,
  generateOrderWithIdandStatus,
  generateWalkupUserWithOrder,
} from '../providers/AppGqlDataProvider/helpers';

import { Production } from './Production';
import { mockExperimentalFeatures } from '@bb/common/providers/appFeaturesProvider/features.mocks';
import { timeouts } from '../common/constants';

function ProductionViewMockRoutes() {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Production:
      return <Production timeoutMs={timeouts.UNIT_TEST_TICK} />;
    case AppMode.Idle:
      return <h1>Idle</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderProductionViewWithMockRoutes = () => {
  render(
    <UnitTestMockProviders features={mockExperimentalFeatures.features}>
      <MockedAppDataProviders
        orders={[
          generateDirectDeliverOrderWithIdandStatusItemCount(
            'o1',
            'ProductionReady',
            2,
            'mock-producer-id',
          ),
        ]}
        user={generateWalkupUserWithOrder('o1')}>
        <AppModeProvider>
          <ProductionViewMockRoutes />
        </AppModeProvider>
      </MockedAppDataProviders>
    </UnitTestMockProviders>,
  );
};

const setupProductionInterstitialOne = () => {
  renderProductionViewWithMockRoutes();
  screen.getByRole('heading', { name: /We're on it!/i });
};

const setupProductionPreparingOne = () => {
  setupProductionInterstitialOne();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 2);
  });
  screen.getByText(/preparing/i);
  screen.getByRole('heading', { name: /product-variation-1/i });
};

const setupProductionDeliveryOne = () => {
  setupProductionPreparingOne();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 4);
  });
  screen.getByText(/collect/i);
  screen.getByRole('heading', { name: /product-variation-1/i });
};

const setupProductionPreparingTwo = () => {
  setupProductionDeliveryOne();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  screen.getByText(/preparing/i);
  screen.getByRole('heading', { name: /product-variation-2/i });
};

const setupProductionDeliveryTwo = () => {
  setupProductionPreparingTwo();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 5);
  });
  screen.getByText(/collect/i);
  screen.getByRole('heading', { name: /product-variation-2/i });
};

const setupProductionInterstitialTwo = () => {
  setupProductionDeliveryTwo();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  screen.getByRole('heading', { name: /Thank you/i });
};

describe('<Production>', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('given <Production /> in default state', () => {
    describe('when it mounts', () => {
      it('renders the Interstitial view', () => {
        renderProductionViewWithMockRoutes();

        expect(
          screen.getByRole('heading', { name: /We're on it!/i }),
        ).toBeInTheDocument();
      });
    });

    describe('when it reaches timeout', () => {
      it('renders the Preparing 1 view', () => {
        renderProductionViewWithMockRoutes();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 2);
        });

        expect(screen.getByText(/preparing/i)).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { name: /product-variation-1/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given a <Production /> in a Preparing 1 state', () => {
    describe('when it reaches timeout', () => {
      it('renders the Collect 1 view', () => {
        setupProductionPreparingOne();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 4);
        });

        expect(screen.getByText(/collect/i)).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { name: /product-variation-1/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given a <Production /> in a Collect 1 state', () => {
    describe('when it reaches timeout', () => {
      it('renders the Preparing 2 view', () => {
        setupProductionDeliveryOne();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });

        expect(screen.getByText(/preparing/i)).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { name: /product-variation-2/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given a <Production /> in a Preparing 2 state', () => {
    describe('when it reaches timeout', () => {
      it('renders the Collect 2 view', () => {
        setupProductionPreparingTwo();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 5);
        });

        expect(screen.getByText(/collect/i)).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { name: /product-variation-2/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given a <Production /> in a Collect 2 state', () => {
    describe('when it reaches timeout', () => {
      it('renders the Intersitial 2 view', () => {
        setupProductionDeliveryTwo();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });

        expect(
          screen.getByRole('heading', { name: /Thank you/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given a <Production /> in a Interstitial 2 state', () => {
    describe('when it reaches timeout', () => {
      it('renders the Idle view', () => {
        setupProductionInterstitialTwo();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK * 2);
        });

        expect(
          screen.getByRole('heading', { name: /idle/i }),
        ).toBeInTheDocument();
      });
    });
  });
});
