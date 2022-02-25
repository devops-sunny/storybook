import { CssBaseline, PaletteMode } from '@material-ui/core';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

type AppThemeValue = {
  paletteMode: PaletteMode;
  setPaletteMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
};

const AppThemeProviderContext = createContext<AppThemeValue | undefined>(
  undefined,
);

export const AppThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    (window.localStorage.getItem('paletteMode') as PaletteMode) ?? 'light',
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          primary: purple,
          secondary: green,
        },
        typography: {
          button: {
            textTransform: undefined,
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              variant: 'outlined',
            },
          },
        },
      }),
    [paletteMode],
  );

  const value = useMemo<AppThemeValue>(
    () => ({ setPaletteMode, paletteMode }),
    [setPaletteMode, paletteMode],
  );

  useEffect(() => {
    window.localStorage.setItem('paletteMode', paletteMode);
  }, [paletteMode]);

  return (
    <AppThemeProviderContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeProviderContext.Provider>
  );
};

export function useAppThemeContext() {
  const context = useContext(AppThemeProviderContext);

  if (!context) {
    throw new Error(
      'useAppThemeContext must be used in child of a AppThemeProvider',
    );
  }

  return context;
}
