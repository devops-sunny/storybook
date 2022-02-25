import { Backdrop, Box, useTheme } from '@material-ui/core';

import { sizes } from './common/constants';

type AppContainerProps = {};

export function AppContainer({
  children,
}: React.PropsWithChildren<AppContainerProps>) {
  const theme = useTheme();

  return (
    <Backdrop open={true}>
      <Box
        display="flex"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
        height="100vmin"
        maxHeight={sizes.PICKUP_DISPLAY_SMALLER_RESOLUTION}
        width="100vmin"
        maxWidth={sizes.PICKUP_DISPLAY_SMALLER_RESOLUTION}
        overflow="auto"
        bgcolor={theme.palette.secondary.light}
        borderRadius="100%">
        <Box display="flex" margin="auto" overflow="auto hidden">
          {children}
        </Box>
      </Box>
    </Backdrop>
  );
}
