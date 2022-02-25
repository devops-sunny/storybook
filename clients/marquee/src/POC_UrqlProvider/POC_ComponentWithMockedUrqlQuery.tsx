import { Box, Button } from '@material-ui/core';

import { GET_ORDERS } from './queries';
import { useMount } from 'react-use';
import { usePocUrqlSubjectsProvider } from './POC_UrqlSubjectsProvider';
import { useQuery } from 'urql';

export const POC_ComponentWithMockedUrqlQuery: React.FunctionComponent<{}> = (
  props,
) => {
  const { getOrdersStream, pushGetOrdersResponse } =
    usePocUrqlSubjectsProvider();
  const [result, reexecuteQuery] = useQuery<{ orders: string[] }>({
    query: GET_ORDERS,
  });
  const { data, fetching, error } = result;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteQuery();
  });

  const handleMock1 = () => {
    if (data) {
      pushGetOrdersResponse({
        data: {
          orders: [...data?.orders, 'hello world 1'],
        },
      });
    }
  };

  const handleMock2 = () => {
    if (data) {
      pushGetOrdersResponse({
        data: {
          orders: [...data?.orders, 'hello world 2'],
        },
      });
    }
  };

  const handleMock3 = () => {
    pushGetOrdersResponse({
      data: {
        orders: [],
      },
    });
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={handleMock1}>add "hello world 1"</Button>
        <Button onClick={handleMock2}>add "hello world 2"</Button>
        <Button onClick={handleMock3}>clear</Button>
      </Box>
    </Box>
  );
};
