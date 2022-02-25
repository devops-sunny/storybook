import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { AppQueryClientProvider } from '@bb/common';
import { Attract } from './Attract';
import { defaultFeatures } from '@bb/common/providers/appFeaturesProvider/features.mocks';

const renderAttractWithMockRoutes = () => {
  render(
    <AppQueryClientProvider>
      <AppFeaturesProvider features={defaultFeatures.features}>
        <MemoryRouter initialEntries={['/attract']}>
          <Routes>
            <Route path="/attract" element={<Attract />} />
            <Route path="/approach" element={<h1>approach</h1>} />
            <Route path="/greet" element={<h1>greet</h1>} />
          </Routes>
        </MemoryRouter>
      </AppFeaturesProvider>
    </AppQueryClientProvider>,
  );
};

describe('given <Attract/>', () => {
  describe('when it mounts', () => {
    it('renders the Attract view', () => {
      renderAttractWithMockRoutes();
      // in this iteration, we know it is the attract view because it has a heading "Attract"
      expect(
        screen.getByRole('heading', { name: /Attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user is sensed near the kiosk', () => {
    it('navigates to Approach', () => {
      renderAttractWithMockRoutes();
      fireEvent.click(screen.getByRole('button', { name: /user is nearby/i }));

      expect(
        screen.getByRole('heading', { name: /approach/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user is sensed at this screen', () => {
    it('navigates to Greet', () => {
      renderAttractWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: /user touches screen/i }),
      );

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
    });
  });
});
