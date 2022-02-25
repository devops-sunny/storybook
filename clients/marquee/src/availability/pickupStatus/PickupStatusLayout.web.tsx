import { Box, useTheme } from '@material-ui/core';

import { PickupStatuses } from './PickupStatus.enum';
import React from 'react';

type PickupStatusLayoutProps = {
  status: keyof typeof PickupStatuses;
};

export function PickupStatusLayout(
  props: React.PropsWithChildren<PickupStatusLayoutProps>,
) {
  const { children, status } = props;
  const { palette } = useTheme();

  const bgcolors = {
    [PickupStatuses.idle]: palette.primary.main,
    [PickupStatuses.available]: palette.success.main,
    [PickupStatuses.engaged]: palette.warning.main,
  };

  return (
    <Box
      display="flex"
      flex="1 1 50%"
      bgcolor={bgcolors[status]}
      data-testid="pickup-status">
      {children}
    </Box>
  );
}
