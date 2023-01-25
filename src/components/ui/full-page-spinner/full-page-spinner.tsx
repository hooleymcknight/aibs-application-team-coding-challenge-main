import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export const FullPageSpinner = ({ height = '100vh' }) => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={height}
    >
        <CircularProgress />
    </Box>
);
