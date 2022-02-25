import {
  Grow,
  Snackbar,
  SnackbarOrigin,
  Typography,
  useTheme,
} from '@material-ui/core';

import React from 'react';
import { timeouts } from '@bb/marquee/common/constants';

type AnnouncementLayoutProps = {
  show: boolean;
  position: SnackbarOrigin;
  offset: number;
  onClose: () => void;
  onExited: () => void;
  orderName?: string;
  showDuration?: number;
  transitionDuration?: number;
};

export const AnnouncementLayout: React.FunctionComponent<AnnouncementLayoutProps> =
  (props) => {
    const {
      show,
      position,
      offset,
      onClose,
      onExited,
      orderName,
      showDuration = timeouts.ORDER_ANNOUNCEMENT_SHOW,
      transitionDuration = timeouts.ORDER_ANNOUNCEMENT_TRANSITION,
    } = props;
    const theme = useTheme();

    return (
      <Snackbar
        key={orderName}
        open={show}
        onClose={onClose}
        autoHideDuration={showDuration > 0 ? showDuration : null}
        message={
          <Typography variant="h4" textAlign="center">
            Order Ready for <br />
            {`${orderName ? orderName : 'Walk-up'}!`}
          </Typography>
        }
        TransitionComponent={Grow}
        TransitionProps={{ onExited: onExited }}
        transitionDuration={transitionDuration}
        anchorOrigin={position}
        disableWindowBlurListener
        sx={{
          // render a pseudo-element to offset the snackbar vertical position
          '&:after': {
            content: '""',
            minHeight: '25vh',
            width: '0px',
            marginBottom: `${offset}vh`,
            position: 'relative',
          },
        }}
        ContentProps={{
          sx: {
            // style the snackbar layout
            minHeight: '25vh',
            width: '50vw',
            justifyContent: 'center',
            bgcolor: theme.palette.secondary.main,
          },
        }}
      />
    );
  };
