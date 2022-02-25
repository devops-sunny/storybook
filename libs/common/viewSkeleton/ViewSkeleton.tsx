import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useTheme,
} from '@material-ui/core';
import { SxProps, Theme } from '@material-ui/system';
import { useEffect, useState } from 'react';

import { useInterval } from 'react-use';

export type ViewNavigation = {
  title: string;
  onNavigation: () => void;
};

export type ViewSkeletonProps = {
  title: string;
  timeoutMs?: number;
  navigations: Array<ViewNavigation>;
  bgImageUrl?: string;
  sx?: SxProps<Theme>; // optional Material-UI `sx` prop overrides
};

export function ViewSkeleton(props: ViewSkeletonProps) {
  const { title, navigations, bgImageUrl } = props;
  const styleOverrides = props.sx ? { ...props.sx } : {};
  const timeoutMs: number =
    props.timeoutMs && props.timeoutMs > 0 ? props.timeoutMs : 0;

  // percent progress 0 - 100, counting down from 100
  const [progress, setProgress] = useState<number>(100);
  const theme = useTheme();
  const INTERVAL_MS = 1000 / 60; // update at 60 fps

  // reset progress any time timeout changes
  useEffect(() => {
    setProgress(100);
  }, [timeoutMs]);

  useInterval(
    () => {
      const progressDecrement = (1 / (timeoutMs / INTERVAL_MS)) * 100;
      setProgress((prevProgress) =>
        prevProgress <= 0 ? 0 : prevProgress - progressDecrement,
      );
    },
    timeoutMs ? INTERVAL_MS : null,
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      alignItems="center"
      justifyContent="center"
      data-testid="view-skeleton-container"
      sx={
        bgImageUrl
          ? {
              // we use two pseudo-elements to achieve two goals that would conflict with just one copy background:
              // 1 - fill ALL available space
              // 2 - fill available space AND keep original aspect ratio

              // the Box is container for the pseudo-elements
              // putting background here allows us to test using jsdom, but it gets covered by the pseudo-elements in browser
              overflow: 'hidden',
              position: 'relative',
              background: `url(${bgImageUrl}) no-repeat center`,
              backgroundSize: 'contain',

              // :before renders the image blurred and sized to cover for the full-bleed backdrop
              '&::before': {
                content: '""',
                background: `url(${bgImageUrl}) no-repeat center`,
                backgroundSize: 'cover',
                filter: 'blur(16px)',
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              },
              // :after renders the image sized to contain to preserve aspect ratio while filling the container
              '&::after': {
                content: '""',
                background: `url(${bgImageUrl}) no-repeat center`,
                backgroundSize: 'contain',
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              },
              ...styleOverrides,
            }
          : undefined
      }>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom={true}
        paddingX={1}
        bgcolor="rgba(255,255,255,0.5)"
        sx={{ backdropFilter: 'blur(4px)' }}>
        {title}
      </Typography>
      {timeoutMs > 0 ? (
        <Box
          display="flex"
          flex="0 0 auto"
          flexDirection="row"
          alignSelf="stretch"
          justifyContent="center"
          paddingBottom={3}>
          <LinearProgress
            // use a key to remount and avoid LinearProgress trying to animate to a reset value
            key={timeoutMs}
            variant="determinate"
            value={progress}
            sx={{
              flex: '0 0 50%',
              height: theme.spacing(1),
            }}
          />
        </Box>
      ) : null}

      {navigations.map(({ title, onNavigation }) => {
        return (
          <Button
            key={title}
            variant="contained"
            onClick={onNavigation}
            sx={{ mb: 1 }}>
            {title}
          </Button>
        );
      })}
    </Box>
  );
}
