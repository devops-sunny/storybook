import { Box } from '@material-ui/core';
import { QUERY_SUB_MENUS } from '@bb/order/gql/queries';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';
import { useMount } from 'react-use';
import { useQuery } from 'urql';

export const SubMenusQueryExample: React.FunctionComponent<{
  menuIds: string[];
}> = (props) => {
  const { menuIds } = props;
  const [submenuResult, reexecuteSubmenuQuery] = useQuery<{
    subMenu: any;
  }>({
    query: QUERY_SUB_MENUS,
    variables: {
      menuIds: menuIds,
    },
  });
  const {
    data: submenuData,
    fetching: submenuFetching,
    error: submenuError,
  } = submenuResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteSubmenuQuery();
  });

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(submenuData, null, 2)}</pre>
      </Box>
    </Box>
  );
};
