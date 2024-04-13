import React from 'react';
import { Typography, Button } from '@mui/material';

export function ErrorPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} href="/">
          GO TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}


