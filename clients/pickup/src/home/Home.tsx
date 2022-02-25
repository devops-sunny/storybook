import { Box } from '@material-ui/core';
import { PrimaryAppBar } from '../common/PrimaryAppBar';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function Home() {
  return (
    <React.Fragment>
      <PrimaryAppBar title="Home" />
      <Box sx={{ p: 2 }}>
        <nav>
          <RouterLink to="/idle">Idle</RouterLink>
        </nav>
        <nav>
          <RouterLink to="/attract">Attract</RouterLink>
        </nav>
        <nav>
          <RouterLink to="/greet">Greet</RouterLink>
        </nav>
        <nav>
          <RouterLink to="/delivery">Delivery</RouterLink>
        </nav>
      </Box>
    </React.Fragment>
  );
}
