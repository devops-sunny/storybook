import { Backdrop, Box, useTheme } from '@material-ui/core';

type AppContainerProps = {};

export function SixteenNine({
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
        height="calc(100vw * 9/16)"
        maxHeight="100vmin"
        width="calc(100vw * 16/16)"
        maxWidth="calc(100vmin * 16/9)"
        bgcolor={theme.palette.grey[900]}>
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          justifyContent="center"
          alignSelf="stretch"
          overflow="hidden">
          {children}
        </Box>
      </Box>
    </Backdrop>
  );
}
