import { Typography, useTheme } from '@material-ui/core';

import { ViewContainer } from '@bb/pickup/common/ViewContainer';

export type ProductionCollectItemProps = {
  count: number;
  index: number;
  productName: string;
  modificationsName: string;
};

function ThemedChildren(props: ProductionCollectItemProps) {
  const { palette } = useTheme();
  return (
    <>
      <Typography variant="caption" color={palette.text.primary}>
        {props.index} of {props.count}
      </Typography>
      <Typography variant="h5" color={palette.text.secondary}>
        COLLECT
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

export const CollectItem: React.FunctionComponent<ProductionCollectItemProps> =
  (props) => {
    return (
      <ViewContainer viewBgcolor="collectItem">
        <ThemedChildren {...props} />
      </ViewContainer>
    );
  };
