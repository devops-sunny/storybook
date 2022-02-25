import { Box, CircularProgress, useTheme } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';

import { useInterval } from 'react-use';

type MUIColorKey =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

type MUIBGColorKey =
  | 'primaryMain'
  | 'primaryLight'
  | 'primaryDark'
  | 'secondaryMain'
  | 'secondaryLight'
  | 'secondaryDark';

export type PickupProgressProps = {
  timeout: number;
  progress: number;
  color: MUIColorKey;
  bgColor: MUIBGColorKey;
};

export const PickupProgress: React.FunctionComponent<PickupProgressProps> = (
  props,
) => {
  const timeoutMs: number =
    props.timeout && props.timeout > 0 ? props.timeout : 0;

  // percent progress 0 - 100, counting up from 0
  const [progress, setProgress] = useState<number>(props.progress);
  const { palette } = useTheme();
  const INTERVAL_MS = 1000 / 10; // update at 10 fps

  // reset progress any time timeout changes
  useEffect(() => {
    setProgress(props.progress);
  }, [props.timeout, props.progress]);

  const progressIncrement = useMemo(() => {
    const numberOfIncrements = props.timeout / INTERVAL_MS;
    const progressRemaining = 100 - props.progress;
    return progressRemaining / numberOfIncrements;
  }, [props.progress, props.timeout, INTERVAL_MS]);

  useInterval(
    () => {
      setProgress((prevProgress) => {
        return prevProgress >= 100 ? 100 : prevProgress + progressIncrement;
      });
    },
    props.timeout ? INTERVAL_MS : null,
  );

  const bgColorMap: Record<MUIBGColorKey, string> = {
    primaryDark: palette.primary.dark,
    primaryLight: palette.primary.light,
    primaryMain: palette.primary.main,
    secondaryMain: palette.secondary.main,
    secondaryLight: palette.secondary.light,
    secondaryDark: palette.secondary.dark,
  };

  return (
    <>
      <Box
        borderRadius="50%"
        border={`24px solid ${bgColorMap[props.bgColor]}`}
        position="absolute"
        width="480px"
        height="480px"
      />
      <CircularProgress
        sx={{ position: 'absolute', zIndex: 1 }}
        key={timeoutMs}
        color={props.color}
        variant="determinate"
        value={progress}
        size="480px"
        thickness={2.175}
      />
    </>
  );
};
