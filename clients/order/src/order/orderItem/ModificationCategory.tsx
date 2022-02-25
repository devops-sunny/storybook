import { Avatar, Box, Typography, useTheme } from '@material-ui/core';

export type ModificationCategoryProps = {
  displayName: string;
  imageUrl: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
};

export function ModificationCategory(props: ModificationCategoryProps) {
  const { displayName, imageUrl, value, disabled, required } = props;

  const theme = useTheme();
  const { palette } = theme;

  const isRequiredAndValueMissing = required && !value;

  return (
    <Box display="flex" alignItems="center">
      <Avatar src={imageUrl} sx={{ marginRight: 2 }} />
      <Typography
        variant="body1"
        component="h6"
        sx={{
          fontWeight: isRequiredAndValueMissing ? 'bold' : 'normal',
          fontStyle: isRequiredAndValueMissing ? 'italic' : 'normal',
          color: disabled ? theme.palette.text.disabled : 'inherit',
        }}>
        {value || displayName}
        {isRequiredAndValueMissing && '*'}
      </Typography>
    </Box>
  );
}
