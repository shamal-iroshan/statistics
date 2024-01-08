import { Grid } from '@mui/material';
import React from 'react';

export default function PageWrapper({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement {
  return (
    <Grid
      container
      sx={{
        width: '100%',
        padding: '30px 100px'
      }}
    >
      {children}
    </Grid>
  );
}
