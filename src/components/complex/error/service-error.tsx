import React from 'react';
import Box from '@material-ui/core/Box';

import { Typography } from '../../ui';

export const ServiceError = () => (
    <Box
        px={5}
        py={1}
    >
        <Typography variant="h1">There was an error connecting to your service.</Typography>
    </Box>
);
