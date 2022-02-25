import {
  Box,
  Button,
  Popover,
  PopoverProps,
  Typography,
  useTheme,
} from '@material-ui/core';

import { MenuItemProductSize } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { formatPrice } from '@bb/common';

export type MenuItemPopoverProps = {
  productSizes: MenuItemProductSize[];
  anchorEl?: PopoverProps['anchorEl'];
  onClick: (size: MenuItemProductSize) => void;
  onClose?: () => void;
};

export function MenuItemPopover(props: MenuItemPopoverProps) {
  const { productSizes, anchorEl, onClick, onClose } = props;
  const { spacing, palette } = useTheme();
  return (
    <Popover
      open={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={onClose}
      PaperProps={{
        sx: { padding: spacing(2), backgroundColor: palette.primary.light },
      }}>
      {productSizes.map((productSize, index) => (
        <Button
          key={productSize.id}
          variant="contained"
          sx={{ marginLeft: spacing(index > 0 ? 4 : 0) }}
          onClick={() => onClick(productSize)}>
          <Box display="flex" flexDirection="column">
            <Typography variant="button" display="block" gutterBottom>
              {productSize.displayName}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {formatPrice(productSize.price)}
            </Typography>
          </Box>
        </Button>
      ))}
    </Popover>
  );
}
