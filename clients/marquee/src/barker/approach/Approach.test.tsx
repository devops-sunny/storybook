import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../../providers/AppModeProvider';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { AppDataProvider } from '../../providers/AppDataProvider';
import { AppMockDataProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { Approach } from './Approach';
import { timeouts } from '@bb/order/common/constants';

const mockUsers = [{ presentAt: new Date(), identified: false }];

function AttractViewMockRoutes(props: { expirationMs?: number }) {
  const { expirationMs = timeouts.UNIT_TEST_DEFAULT } = props;
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Approach:
      return <Approach userExpirationMs={expirationMs} />;
    case AppMode.Attract:
      return <h1>Attract</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderWithMockRoutes = (expirationMs?: number) => {
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider users={mockUsers} orders={[]}>
          <AppModeProvider>
            <AttractViewMockRoutes
              expirationMs={expirationMs || timeouts.UNIT_TEST_DEFAULT}
            />
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <Approach />', () => {
  describe('when it mounts', () => {
    it('renders the Approach view', () => {
      renderWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when no user present (activity timeout)', () => {
    it('renders the Attract view', () => {
      renderWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', {
          name: /all users reach activity timeout/i,
        }),
      );

      expect(
        screen.getByRole('heading', { name: /Attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when users age', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    describe('when all users age out', () => {
      it('renders the Attract view', () => {
        renderWithMockRoutes(50);

        act(() => {
          jest.advanceTimersByTime(100); // go to next interval
        });

        expect(
          screen.getByRole('heading', { name: /Attract/i }),
        ).toBeInTheDocument();
      });
    });

    describe('when users resume activity', () => {
      it('it does not navigate until they age out', () => {
        renderWithMockRoutes(50);

        act(() => {
          jest.advanceTimersByTime(50); // halfway to next interval
        });
        fireEvent.click(
          screen.getByRole('button', { name: /update presence/i }),
        );
        act(() => {
          jest.advanceTimersByTime(50); // to next interval
        });

        expect(
          screen.queryByRole('heading', { name: /Attract/i }),
        ).not.toBeInTheDocument();
      });
    });
  });
});
