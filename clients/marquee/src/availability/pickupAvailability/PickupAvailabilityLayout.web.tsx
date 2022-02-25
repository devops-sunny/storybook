import { Box } from '@material-ui/core';
import React from 'react';

type PickupAvailabilityLayoutProps = {};

export const PickupAvailabilityLayout: React.FunctionComponent<PickupAvailabilityLayoutProps> =
  (props) => {
    const { children } = props;
    return (
      <Box display="flex" flex="1 1 auto">
        {children}
      </Box>
    );
  };
