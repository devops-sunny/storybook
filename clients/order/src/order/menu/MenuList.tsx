import { Box, Grid, Typography } from '@material-ui/core';
import { MenuItemAvatarSize, MenuItemProps } from './MenuItem';

import { MenuItem } from '@bb/common/types/tmpTypes/menuEntityTypes';

export type MenuListProps = {
  description: string;
  items: MenuItem[];
  renderItem: React.FC<MenuItemProps>;
  onItemClick: (id: string) => void;
};

export function MenuList(props: MenuListProps) {
  const { items, renderItem: MenuItemComponent, description } = props;
  return (
    <>
      <Box
        display="flex"
        flex-direction="row"
        flex="0 0 auto"
        justifyContent="center"
        marginTop={5}
        marginBottom={10}>
        <Typography
          flex="0 0 60%"
          variant="h4"
          component="p"
          textAlign="center">
          {description}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {items.map((item, i) => (
          <Grid key={item.id} item xs={6}>
            <MenuItemComponent
              id={item.id}
              imageUrl={item.image.sourceUrl}
              name={item.displayName}
              onClick={props.onItemClick}
              size={MenuItemAvatarSize.SUB_MENU}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
