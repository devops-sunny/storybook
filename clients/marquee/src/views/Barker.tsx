import { AppMode, useAppModeContext } from '../providers/AppModeProvider';
import { Box, useTheme } from '@material-ui/core';

import { Approach } from '../barker/approach/Approach';
import { Attract } from '../barker/attract/Attract';

export function BarkerView() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flex="0 0 calc(100% * 8 / 9)"
      bgcolor={theme.palette.secondary.light}
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" margin="calc(-100% * (1/16) /2) 0">
        <AppRouter />
      </Box>
    </Box>
  );
}

export function AppRouter(): JSX.Element {
  const { mode } = useAppModeContext();

  switch (mode) {
    case AppMode.Attract:
      return <Attract />;
    case AppMode.Approach:
      return <Approach userExpirationMs={10 * 1000} />;
  }
}
