import React, { useEffect, useState } from 'react';
import {
  announcementDataFactory,
  randomMarginBottom,
  randomSnackbarOrigin,
} from './helpers';

import { AnnouncementData } from './types';
import { AnnouncementLayout } from './AnnouncementLayout.web';
import { SnackbarOrigin } from '@material-ui/core';
import { timeouts } from '@bb/marquee/common/constants';

type AnnouncementProps = {
  orderName?: string;
  showDuration?: number;
  transitionDuration?: number;
};

export const Announcement: React.FunctionComponent<AnnouncementProps> = (
  props,
) => {
  const {
    orderName,
    showDuration = timeouts.ORDER_ANNOUNCEMENT_SHOW,
    transitionDuration = timeouts.ORDER_ANNOUNCEMENT_TRANSITION,
  } = props;
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>(
    typeof orderName !== 'undefined'
      ? [announcementDataFactory(orderName)]
      : [],
  );
  const [activeAnnouncement, setActiveAnnouncement] = useState<
    AnnouncementData | undefined
  >(undefined);
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<SnackbarOrigin>(
    randomSnackbarOrigin(),
  );
  const [offset, setOffset] = useState<number>(randomMarginBottom());

  // update the announcement message when any prop changes
  useEffect(() => {
    setAnnouncements(
      typeof orderName !== 'undefined'
        ? [announcementDataFactory(orderName)]
        : [],
    );
  }, [orderName, showDuration]);

  // show only one snackbar at a time, only change after exit
  useEffect(() => {
    if (announcements.length && !activeAnnouncement) {
      // load the next activeAnnouncement
      setActiveAnnouncement(announcements[0]);
      setAnnouncements((prev) => prev.slice(1));
      setShow(true);
    } else if (announcements.length && activeAnnouncement && show) {
      // close an activeAnnouncement when a new one is added
      setShow(false);
    }
  }, [announcements, activeAnnouncement, show]);

  const handleClose = () => setShow(false);
  const handleExited = () => {
    // reset to be ready for the next completed order
    setActiveAnnouncement(undefined);
    setPosition(randomSnackbarOrigin());
    setOffset(randomMarginBottom());
  };

  return (
    <AnnouncementLayout
      key={activeAnnouncement?.key}
      show={show}
      position={position}
      offset={offset}
      onClose={handleClose}
      onExited={handleExited}
      orderName={activeAnnouncement?.message}
      showDuration={showDuration}
      transitionDuration={transitionDuration}
    />
  );
};
