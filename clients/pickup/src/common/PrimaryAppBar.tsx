import { AppBar, Toolbar, Typography } from '@material-ui/core';

type Props = {
  title: string;
};

export function PrimaryAppBar(props: Props) {
  const { title } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flex: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
