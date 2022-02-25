import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Approach } from './Approach';
import { timeouts } from '../common/constants';

const renderApproachWithMockRoutes = () => {
  render(
    <MemoryRouter initialEntries={['/approach']}>
      <Routes>
        <Route
          path="/approach"
          element={<Approach timeoutMs={timeouts.UNIT_TEST_DEFAULT} />}
        />
        <Route path="/attract" element={<h1>attract</h1>} />
        <Route path="/greet" element={<h1>greet</h1>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('given <Approach/>', () => {
  describe('when it mounts', () => {
    it('renders the Approach view', () => {
      renderApproachWithMockRoutes();
      expect(
        screen.getByRole('heading', { name: /Approach/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when component timeout is reached', () => {
    it('navigates to Attract', async () => {
      renderApproachWithMockRoutes();

      expect(
        await screen.findByRole('heading', { name: /attract/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when a user is sensed at the screen', () => {
    it('navigates to Greet', () => {
      renderApproachWithMockRoutes();
      fireEvent.click(
        screen.getByRole('button', { name: /user touches screen/i }),
      );

      expect(
        screen.getByRole('heading', { name: /greet/i }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /Approach/i }),
      ).not.toBeInTheDocument();
    });
  });
});
