import { Avatar, Box, Typography, useTheme } from '@material-ui/core';

export enum MenuItemAvatarSize {
  PRODUCT,
  SUB_MENU,
}

export type MenuItemProps = {
  id: string;
  imageUrl: string;
  name: string;
  onClick: (id: string, event: React.MouseEvent<HTMLElement>) => void;
  size?: MenuItemAvatarSize;
  accessibleName?: string;
};

const gridSizes = {
  two: 'calc(100vw / 2 - 100vw / 9)',
  three: 'calc(100vw / 3 - 100vw / 18)',
};

export function MenuItem(props: MenuItemProps) {
  const {
    id,
    imageUrl,
    name,
    size = MenuItemAvatarSize.PRODUCT,
    accessibleName,
    onClick,
  } = props;

  const { spacing, palette } = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      paddingX={5}
      paddingBottom={size === MenuItemAvatarSize.SUB_MENU ? 8 : 2}
      onClick={(e) => onClick(id, e)}
      sx={{
        cursor: 'pointer',
      }}>
      <Avatar
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height:
            gridSizes[size === MenuItemAvatarSize.SUB_MENU ? 'two' : 'three'],
          width:
            gridSizes[size === MenuItemAvatarSize.SUB_MENU ? 'two' : 'three'],
          borderRadius: '50%',
          backgroundColor: palette.secondary.light,
        }}
        src={imageUrl}>
        {accessibleName || name}
      </Avatar>
      <Typography
        variant={size === MenuItemAvatarSize.SUB_MENU ? 'h4' : 'h6'}
        component="h2"
        mt={spacing(2)}
        sx={{ textTransform: 'uppercase' }}
        data-testid="menu-item-name">
        {name}
      </Typography>
    </Box>
  );
}
