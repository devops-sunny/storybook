import { Box, useTheme } from '@material-ui/core';

import { PickupAvailability } from '../availability/pickupAvailability/PickupAvailability';

export function PickupAvailabilityView() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flex="0 0 calc(100% / 9)"
      bgcolor={theme.palette.primary.light}>
      <PickupAvailability />
    </Box>
  );
}
