import { Box } from '@material-ui/core';
import { QUERY_PRODUCT_VARIATION_CONTENT } from '@bb/order/gql/queries';
import { mockMenuItemProduct } from '@bb/order/fixtures/menu/menuItemProduct';
import { useMount } from 'react-use';
import { useQuery } from 'urql';

export const ProductVariationContentQueryByIdExample: React.FunctionComponent<{
  productVariationId?: string;
}> = (props) => {
  const {
    productVariationId = mockMenuItemProduct.AMERICANO.productVariationIds[0]!
      .id,
  } = props;
  const [productVariationContentResult, reexecuteProductVariationContentQuery] =
    useQuery<{
      productVariationContent: any;
    }>({
      query: QUERY_PRODUCT_VARIATION_CONTENT,
      variables: {
        productVariationId,
      },
    });
  const {
    data: productVariationContentData,
    fetching: ordersFetching,
    error: ordersError,
  } = productVariationContentResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteProductVariationContentQuery();
  });

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(productVariationContentData, null, 2)}</pre>
      </Box>
    </Box>
  );
};
