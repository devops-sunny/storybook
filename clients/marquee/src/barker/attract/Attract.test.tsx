import {
  AppMode,
  AppModeProvider,
  useAppModeContext,
} from '../../providers/AppModeProvider';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppDataProvider } from '../../providers/AppDataProvider';
import { AppMockDataProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { Attract } from './Attract';

function AttractViewMockRoutes() {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Approach:
      return <h1>Approach</h1>;
  }
  return <>No matching view found for the mode</>;
}

const renderWithMockRoutes = () => {
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider users={[]} orders={[]}>
          <AppModeProvider>
            <AttractViewMockRoutes />
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <Attract />', () => {
  describe('when it mounts', () => {
    it('renders the Attract view', () => {
      renderWithMockRoutes();

      expect(
        screen.getByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user is sensed in proximity', () => {
    it('renders the Approach view', () => {
      renderWithMockRoutes();

      fireEvent.click(
        screen.getByRole('button', { name: /user is sensed in proximity/i }),
      );

      expect(
        screen.getByRole('heading', { name: /Approach/i }),
      ).toBeInTheDocument();
    });
  });
});
