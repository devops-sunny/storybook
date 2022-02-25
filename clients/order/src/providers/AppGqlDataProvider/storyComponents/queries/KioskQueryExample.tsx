import { Box } from '@material-ui/core';
import { QUERY_KIOSK_MENUS } from '@bb/order/gql/queries';
import { mockKiosk } from '@bb/order/fixtures/menu/kiosk';
import { useMount } from 'react-use';
import { useQuery } from 'urql';

export const KioskQueryExample: React.FunctionComponent<{ kioskId: string }> = (
  props,
) => {
  const { kioskId = mockKiosk.id } = props;
  const [kioskResult, reexecuteKioskQuery] = useQuery<{
    kiosk: any;
  }>({
    query: QUERY_KIOSK_MENUS,
    variables: {
      storefrontId: kioskId,
    },
  });
  const {
    data: kioskData,
    fetching: ordersFetching,
    error: ordersError,
  } = kioskResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteKioskQuery();
  });

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(kioskData, null, 2)}</pre>
      </Box>
    </Box>
  );
};
