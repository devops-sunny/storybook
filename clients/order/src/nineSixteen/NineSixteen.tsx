import { Backdrop, Box, useTheme } from '@material-ui/core';

type AppContainerProps = {};

export function NineSixteen({
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
        height="calc(100vh * 16/16)"
        maxHeight="calc(100vmin* 16/9)"
        width="calc(100vh * 9/16)"
        maxWidth="100vmin"
        bgcolor={theme.palette.background.default}>
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          alignSelf="stretch"
          overflow="hidden">
          {children}
        </Box>
      </Box>
    </Backdrop>
  );
}
