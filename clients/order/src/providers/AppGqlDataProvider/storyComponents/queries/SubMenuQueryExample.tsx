import { Box } from '@material-ui/core';
import { QUERY_SUB_MENU } from '@bb/order/gql/queries';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';
import { useMount } from 'react-use';
import { useQuery } from 'urql';

export const SubMenuQueryExample: React.FunctionComponent<{ menuId: string }> =
  (props) => {
    const { menuId = mockSubMenu.groupOne.id } = props;
    const [kioskResult, reexecuteKioskQuery] = useQuery<{
      kiosk: any;
    }>({
      query: QUERY_SUB_MENU,
      variables: {
        menuId: menuId,
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
