import { act, render, screen } from '@testing-library/react';

import { ViewSkeleton } from '@bb/common/viewSkeleton/ViewSkeleton';

const renderViewSkeleton = () => {
  render(<ViewSkeleton title="Test Title" navigations={[]} />);
};

const renderViewSkeletonWithTimeout = (timeout: number) => {
  render(
    <ViewSkeleton title="Test Title" navigations={[]} timeoutMs={timeout} />,
  );
};

describe('given <ViewSkeleton> with required props', () => {
  describe('when it mounts', () => {
    it('renders the provided title', () => {
      renderViewSkeleton();
      expect(screen.getByRole('heading', { name: /test title/i }));
    });

    it.todo('renders a button per navigation object');

    it('does NOT render a progress bar', () => {
      renderViewSkeleton();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('does NOT render a background image', () => {
      renderViewSkeleton();
      expect(screen.getByTestId('view-skeleton-container')).not.toHaveStyle(
        `background: url() no-repeat center`,
      );
      expect(screen.getByTestId('view-skeleton-container')).not.toHaveStyle(
        'background-size: contain',
      );
    });
  });
});

describe('given <ViewSkeleton> with timeoutMs prop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when it mounts', () => {
    it('renders ViewSkeleton and progress is 100', () => {
      renderViewSkeletonWithTimeout(1);
      expect(screen.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '100',
      );
    });
  });

  describe('when the given timeout is half way to expire', () => {
    it('renders progress indicator with value 50', async () => {
      renderViewSkeletonWithTimeout(100);

      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(await screen.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '50',
      );
    });
  });

  describe('when the given timeout expires', () => {
    it('renders progress indicator with value 0', async () => {
      renderViewSkeletonWithTimeout(50);

      act(() => {
        jest.advanceTimersByTime(50);
      });
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '0',
      );
    });
  });
});

describe('given <ViewSkeleton> with bgImageUrl prop', () => {
  describe('when it mounts', () => {
    it('renders the provided background image with its original aspect ratio', () => {
      const fileName = 'image.png';
      render(
        <ViewSkeleton
          title="Test Title"
          navigations={[]}
          bgImageUrl={fileName}
        />,
      );

      expect(screen.getByTestId('view-skeleton-container')).toHaveStyle(
        `background: url(${fileName}) no-repeat center`,
      );
      expect(screen.getByTestId('view-skeleton-container')).toHaveStyle(
        'background-size: contain',
      );
    });
  });
});
