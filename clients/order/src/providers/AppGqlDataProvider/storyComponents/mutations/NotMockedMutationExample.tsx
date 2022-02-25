import { Box, Button } from '@material-ui/core';

import { useMutation } from 'urql';

export const NotMockedMutationExample: React.FunctionComponent<{}> = (
  props,
) => {
  const [createModifiedProductVariationResult, createModifiedProductVariation] =
    useMutation(`
    mutation CreateModifiedProductVariation ($mpv: CreateModifiedProductVariationInput!) {
      createModifiedProductVariation (input: $mpv) {
        modifiedProductVariation {
          id
        }
      }
    }
  `);

  const handleCreateModifiedProductVariation = () => {
    const vars = {
      mpv: {
        productVariationId: '1418d7d7-2bf0-48bc-b506-52024fbae158',
        modifications: [
          {
            componentId: 'add0f674-c3d4-4a64-8f31-2396a3e041c7',
            value: 3,
          },
        ],
      },
    };
    createModifiedProductVariation(vars);
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <h2>Requires Product service on localhost:3001</h2>
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>
          {JSON.stringify(createModifiedProductVariationResult, null, 2)}
        </pre>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={handleCreateModifiedProductVariation}>
          CreateModifiedProductVariation
        </Button>
      </Box>
    </Box>
  );
};
