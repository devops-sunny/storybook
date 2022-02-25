import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

import React from 'react';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

export const AppThemeProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
  </ThemeProvider>
);
