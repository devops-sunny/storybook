import { act, render, screen } from '@testing-library/react';

import { Announcement } from './Announcement';
import { timeouts } from '@bb/marquee/common/constants';

const renderAnnouncement = (params: { orderName?: string }) => {
  render(
    <Announcement
      orderName={params.orderName}
      showDuration={timeouts.UNIT_TEST_TICK}
      transitionDuration={timeouts.UNIT_TEST_DEFAULT}
    />,
  );
};

describe('Given an <Announcement/> with an OrderName', () => {
  describe('when it mounts', () => {
    it('it renders text “Order Ready for ${OrderName}!”', () => {
      renderAnnouncement({ orderName: 'Test Order One' });
      expect(screen.getByRole('alert')).toHaveTextContent(
        /Order Ready for Test Order One!/i,
      );
    });
  });
  describe('when the prop timeout is reached', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('it hides the snackbar', () => {
      renderAnnouncement({ orderName: 'Test Order One' });
      expect(screen.getByRole('alert')).toBeInTheDocument();
      act(() => {
        jest.advanceTimersByTime(timeouts.UNIT_TEST_TICK);
      });
      expect(screen.queryByRole('alert')).not.toBeVisible();
    });
  });
});

describe('Given an <Announcement/> with NO OrderName', () => {
  describe('when it mounts', () => {
    it('it renders text “Order Ready for Walk-up”', () => {
      renderAnnouncement({ orderName: '' });
      expect(screen.getByRole('alert')).toHaveTextContent(
        /Order Ready for Walk-up!/i,
      );
    });
  });
});
