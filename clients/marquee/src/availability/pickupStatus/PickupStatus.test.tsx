import { PickupStatus, PickupStatusProps } from './PickupStatus';
import { render, screen } from '@testing-library/react';

import { AppDataProvider } from '../../providers/AppDataProvider';
import { AppMockDataProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataProvider';
import { AppMockDataSubjectsProvider } from '@bb/marquee/providers/AppMockDataProvider/AppMockDataSubjectsProvider';
import { AppModeProvider } from '../../providers/AppModeProvider';
import { AppThemeProvider } from '@bb/common';
import { defaultThemePalette } from '@bb/marquee/common/testConstants';

const renderWithProviders = (props: PickupStatusProps) => {
  render(
    <AppMockDataSubjectsProvider>
      <AppMockDataProvider>
        <AppDataProvider users={[]} orders={[]}>
          <AppModeProvider>
            <AppThemeProvider>
              <PickupStatus {...props} />
            </AppThemeProvider>
          </AppModeProvider>
        </AppDataProvider>
      </AppMockDataProvider>
    </AppMockDataSubjectsProvider>,
  );
};

describe('given <PickupStatus /> with mode Idle', () => {
  describe('when it mounts', () => {
    it('renders Idle status', () => {
      renderWithProviders({ status: 'idle' });
      expect(
        screen.getByRole('heading', { name: /idle/i }),
      ).toBeInTheDocument();
    });
    // @TODO - should these layout-related tests be in a separate file to better separate core from adapters?
    it('has a primary color background', () => {
      renderWithProviders({ status: 'idle' });
      expect(screen.getByTestId('pickup-status')).toHaveStyle(
        `background-color: ${defaultThemePalette.primary.main}`,
      );
    });
  });
});

describe('given <PickupStatus /> with mode Available', () => {
  describe('when it mounts', () => {
    it('renders Available status and text', () => {
      renderWithProviders({ status: 'available' });
      expect(
        screen.getByRole('heading', { name: /available/i }),
      ).toHaveTextContent('available');
    });
    it('has a success color background', () => {
      renderWithProviders({ status: 'available' });
      expect(screen.getByTestId('pickup-status')).toHaveStyle(
        `background-color: ${defaultThemePalette.success.main}`,
      );
    });
  });
});

describe('given <PickupStatus /> with mode Engaged and an order name', () => {
  describe('when it mounts', () => {
    it('it renders Engaged status (with the provided OrderName)', () => {
      renderWithProviders({
        status: 'engaged',
        engagedOrderName: 'test order one',
      });
      expect(
        screen.getByRole('heading', { name: /engaged/i }),
      ).toHaveTextContent('test order one');
    });
    it('has a warning color background', () => {
      renderWithProviders({ status: 'engaged' });
      expect(screen.getByTestId('pickup-status')).toHaveStyle(
        `background-color: ${defaultThemePalette.warning.main}`,
      );
    });
  });
});

describe('given <PickupStatus /> with mode Engaged and NO order name', () => {
  describe('when it mounts', () => {
    it('it renders Engaged status (for Walk-up)', () => {
      renderWithProviders({
        status: 'engaged',
        engagedOrderName: 'for walk-up',
      });
      expect(
        screen.getByRole('heading', { name: /engaged/i }),
      ).toHaveTextContent('for walk-up');
    });
  });
});
