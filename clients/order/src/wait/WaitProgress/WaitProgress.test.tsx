import {
  AppDataProvider,
  MockedAppDataProvider,
} from '../../providers/AppDataProvider/AppDataProvider';
import {
  AppGqlDataProvider,
  mockGqlConfig,
} from '@bb/order/providers/AppGqlDataProvider/AppGqlDataProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';

import { AppMockDataSubjectsProvider } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { WaitProgress } from './WaitProgress';
import { generateOrderWithStatus } from '@bb/common/fixtures/orders/mockOrder/generators/twoItemOrder';
import { timeouts } from '../../common/constants';

const renderWithMockRoutes = () => {
  const order = generateOrderWithStatus('ProductionReady');

  render(
    <AppMockDataSubjectsProvider>
      <AppGqlDataProvider gqlEndpoint={mockGqlConfig.gql.endpoint} mock>
        <MockedAppDataProvider order={order}>
          <MemoryRouter initialEntries={[`/order/${order.id}/progress`]}>
            <Routes>
              <Route
                path="/order/:orderId/progress"
                element={<WaitProgress timeoutMs={timeouts.UNIT_TEST_TICK} />}
              />
              <Route
                path="/order/:orderId/delivery"
                element={<h1>Delivery</h1>}
              />
            </Routes>
          </MemoryRouter>
        </MockedAppDataProvider>
      </AppGqlDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

// @TODO - perhaps a better approach that these setup macros which depend upon each other might be to supply different fixtures to the App Context Provider.
// While the current approach has the benefit of asserting that the temp mock state manipulations work,
// the long-term test coverage here should only assert reaction to states, which it could do without setup macros.
const setupInQueue = async () => {
  // await the previous macro
  await renderWithMockRoutes();
  // advance the timer so the timeout mock state manipulation happens
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  // synchronously get the heading to assert this macro worked
  screen.getByRole('heading', { name: /Wait: Progress: Queue/i });
};

const setupInProduction = async () => {
  await setupInQueue();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  screen.getByRole('heading', { name: /Wait: Progress: Production/i });
};

const setupInStaging = async () => {
  await setupInProduction();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  screen.getByRole('heading', { name: /Wait: Progress: Staging/i });
};

const setupInReady = async () => {
  await setupInStaging();
  act(() => {
    jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
  });
  screen.getByRole('heading', { name: /Wait: Progress: Ready/i });
};

describe('', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('given <WaitOrderProgress/>', () => {
    describe('when it mounts', () => {
      it('renders the Wait Progress Items view', () => {
        renderWithMockRoutes();
        expect(
          screen.getByRole('heading', { name: /Wait: Progress: Items/i }),
        ).toBeInTheDocument();
      });
    });

    describe('when component timeout is reached', () => {
      it('renders the Wait Progress Queue', () => {
        renderWithMockRoutes();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });
        expect(
          screen.getByRole('heading', { name: /Wait: Progress: Queue/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given <WaitOrderProgress/> in the Queue State', () => {
    describe('when component timeout is reached', () => {
      it('renders the Wait Progress Production view', async () => {
        await setupInQueue();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });
        expect(
          screen.getByRole('heading', { name: /Wait: Progress: Production/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given <WaitOrderProgress/> in the Production State', () => {
    describe('when component timeout is reached', () => {
      it('renders the Wait Progress Staging view', async () => {
        await setupInProduction();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });
        expect(
          screen.getByRole('heading', { name: /Wait: Progress: Staging/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given <WaitOrderProgress/> in the Staging State', () => {
    describe('when component timeout is reached', () => {
      it('renders the Wait Progress Ready view', async () => {
        await setupInStaging();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });
        expect(
          screen.getByRole('heading', { name: /Wait: Progress: Ready/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('given <WaitOrderProgress/> in the Ready State', () => {
    describe('when component timeout is reached', () => {
      it('renders the Delivery view', async () => {
        await setupInReady();
        act(() => {
          jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
        });
        expect(
          screen.getByRole('heading', { name: /Delivery/i }),
        ).toBeInTheDocument();
      });
    });
  });
});
