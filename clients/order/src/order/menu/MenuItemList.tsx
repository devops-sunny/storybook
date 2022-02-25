import { Box, Grid, Typography } from '@material-ui/core';
import { MenuItemAvatarSize, MenuItemProps } from './MenuItem';

import { MenuItem } from '@bb/common/types/tmpTypes/menuEntityTypes';

export type MenuItemListProps = {
  description: string;
  items: MenuItem[];
  renderItem: React.FC<MenuItemProps>;
  onItemClick: (item: MenuItem, event: React.MouseEvent<HTMLElement>) => void;
};

export function MenuItemList(props: MenuItemListProps) {
  const {
    items,
    renderItem: MenuItemComponent,
    description,
    onItemClick,
  } = props;

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
          <Grid key={item.id} item xs={4}>
            <MenuItemComponent
              id={item.id}
              imageUrl={item.image.sourceUrl}
              name={item.displayName}
              onClick={(_, event) => {
                onItemClick(item, event);
              }}
              size={MenuItemAvatarSize.PRODUCT}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
