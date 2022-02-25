import { Box, useTheme } from '@material-ui/core';

type Props = {};

export function ActionBar({ children }: React.PropsWithChildren<Props>) {
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="calc(100vh * 160/1920)" // 160px
      bgcolor={palette.primary.dark}
      paddingX={5}
      paddingY={5}>
      {children}
    </Box>
  );
}
