import { gql, useQuery } from 'urql';

import { Box } from '@material-ui/core';

export const NotMockedQueryExample: React.FunctionComponent<{}> = (props) => {
  const [result, reexecuteQuery] = useQuery<{ orders: string[] }>({
    query: gql`
      query {
        products {
          id
          name
        }
      }
    `,
  });

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <h2>Requires Product service on localhost:3001</h2>
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Box>
    </Box>
  );
};
