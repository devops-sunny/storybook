import { Box, useTheme } from '@material-ui/core';

import { Logo } from './Logo';

export function LogoBar() {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1 1 auto"
      maxHeight="calc(100vh * 240/1920)" // 240px
      paddingX={10} // 80px
      paddingY={4} // 32px
      bgcolor={palette.primary.dark}>
      <Logo />
    </Box>
  );
}
