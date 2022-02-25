import { Typography, useTheme } from '@material-ui/core';

import { ViewContainer } from '@bb/pickup/common/ViewContainer';

export type ProductionPreparingItemProps = {
  count: number;
  index: number;
  productName: string;
  modificationsName: string;
};

function ThemedChildren(props: ProductionPreparingItemProps) {
  const { palette } = useTheme();
  return (
    <>
      <Typography variant="caption" color={palette.text.primary}>
        {props.index} of {props.count}
      </Typography>
      <Typography variant="overline" color={palette.text.secondary}>
        Preparing…
      </Typography>
      <Typography variant="h2" color={palette.text.primary}>
        {props.productName}
      </Typography>
      <Typography variant="h4" color={palette.text.secondary}>
        {props.modificationsName}
      </Typography>
    </>
  );
}

export const PreparingItem: React.FunctionComponent<ProductionPreparingItemProps> =
  (props) => {
    return (
      <ViewContainer viewBgcolor="preparingItem">
        <ThemedChildren {...props} />
      </ViewContainer>
    );
  };
