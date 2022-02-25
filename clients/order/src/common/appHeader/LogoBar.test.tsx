import { render, screen } from '@testing-library/react';

import { LogoBar } from '@bb/common/appHeader/LogoBar';

describe('given a <LogoBar />', () => {
  describe('when it mounts', () => {
    it('renders the Costa Coffee logo', () => {
      render(<LogoBar />);

      const logoBarEl = screen.getByRole('img');
      expect(logoBarEl).toBeInTheDocument();
    });
  });
});
