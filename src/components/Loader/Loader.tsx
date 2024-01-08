import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Loader(): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#aaaaaaaa'
      }}
    >
      <CircularProgress />
    </Box>
  );
}
