import { Box, useTheme } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/styles';

export enum ProductionSubView {
  preparingItem = 'preparingItem',
  collectItem = 'collectItem',
  interstitial = 'interstitial',
}

type ProductionSubViewProps = {
  viewBgcolor: keyof typeof ProductionSubView;
};

export function ViewContainer(
  props: React.PropsWithChildren<ProductionSubViewProps>,
) {
  const { children, viewBgcolor } = props;
  const theme = useTheme();

  const localTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      text: {
        ...theme.palette.text,
        primary: '#fff',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
        icon: 'rgba(255,255,255,0.5)',
      },
    },
  };

  const bgcolors = {
    [ProductionSubView.preparingItem]: localTheme.palette.primary.main,
    [ProductionSubView.collectItem]: localTheme.palette.primary.light,
    [ProductionSubView.interstitial]: localTheme.palette.primary.dark,
  };

  return (
    <ThemeProvider theme={localTheme}>
      <Box
        minWidth={480}
        minHeight={480}
        display="flex"
        flexDirection="column"
        flex="1 1 auto"
        alignItems="center"
        justifyContent="center"
        position="relative"
        padding={4}
        bgcolor={bgcolors[viewBgcolor]}
        textAlign="center"
        data-testid="Production-SubView">
        {children}
      </Box>
    </ThemeProvider>
  );
}
