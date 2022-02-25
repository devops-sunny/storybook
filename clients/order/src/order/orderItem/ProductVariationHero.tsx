import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@material-ui/core';

import { Image } from '@bb/common/types/tmpTypes/menuEntityTypes';
import { ProductVariationView } from '@bb/common/types/tmpTypes/orderItemDetailTypes';
import { formatPrice } from '@bb/common';

export type ProductVariationHeroProps = {
  heroImage: Image['sourceUrl'];
  sizeDisplayName: ProductVariationView['sizeDisplayName'];
  productDisplayName: ProductVariationView['productDisplayName'];
  productVariationDesc: ProductVariationView['description'];
  orderItemPrice: ProductVariationView['price'];
  orderItemCalories: ProductVariationView['calories'];
};

export function ProductVariationHero(props: ProductVariationHeroProps) {
  const {
    heroImage,
    sizeDisplayName,
    productDisplayName,
    productVariationDesc,
    orderItemPrice,
    orderItemCalories,
  } = props;

  const theme = useTheme();
  const { palette, spacing } = theme;

  const localTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      text: {
        ...theme.palette.text,
        primary: '#fff',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
        icon: 'rgba(255,255,255,0.5)',
      },
    },
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          backgroundColor: palette.primary.dark,
        }}>
        <CardMedia
          component="img"
          sx={{ width: 320, height: 320, p: spacing(5) }}
          image={heroImage}
        />
        <Box
          marginY={5}
          position="relative"
          color={localTheme.palette.text.primary}>
          <CardContent>
            <Typography variant="h5" component="h2" fontWeight="bold">
              {sizeDisplayName}
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom>
              {productDisplayName}
            </Typography>
            <Typography
              variant="subtitle1"
              color={localTheme.palette.text.secondary}
              gutterBottom>
              {productVariationDesc}
            </Typography>
            <Box marginBottom={4} />
            <Box display="flex" position="absolute" bottom={0}>
              <Typography variant="h6" component="h3">
                {formatPrice(orderItemPrice)}
              </Typography>
              <Box marginRight={8} />
              <Typography variant="h6" component="h3">
                {orderItemCalories} cal
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
