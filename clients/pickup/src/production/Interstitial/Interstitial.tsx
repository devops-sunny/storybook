import { Box, CircularProgress, Typography, useTheme } from '@material-ui/core';

import { ViewContainer } from '@bb/pickup/common/ViewContainer';

export type ProductionInterstitialProps = {
  headline: string;
  subheadline?: string;
  progressIndicator?: boolean;
};

function ThemedChildren(props: ProductionInterstitialProps) {
  const { palette } = useTheme();
  return (
    <>
      <Typography variant="h2" color={palette.text.primary} textAlign="center">
        {props.headline}
      </Typography>
      <Typography
        variant="h4"
        color={palette.text.secondary}
        textAlign="center">
        {props.subheadline}
      </Typography>
      {props.progressIndicator ? (
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          top={0}
          bottom="40px">
          <CircularProgress />
        </Box>
      ) : null}
    </>
  );
}

export const Interstitial: React.FunctionComponent<ProductionInterstitialProps> =
  (props) => {
    return (
      <ViewContainer viewBgcolor="interstitial">
        <ThemedChildren {...props} />
      </ViewContainer>
    );
  };
