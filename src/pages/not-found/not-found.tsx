import React from 'react';
import Box from '@material-ui/core/Box';
import { DarkHeader } from '../../components/complex/dark-header';
import { PageRoute } from '../types';
import { BkpLink, Typography } from '../../components/ui';
import { ApplicationHeader } from '../../components/complex/application-header';
import { ALLEN_BRAIN_MAP_TITLE } from '../../constants';

export const NotFound: PageRoute = () => (
    <>
        <ApplicationHeader title={ALLEN_BRAIN_MAP_TITLE} />
        <DarkHeader title="404: Page not found" />
        <Box
            px={5}
            py={2}
        >
            <Typography variant="h1">The requested URL was not found.</Typography>
            <Typography variant="body">
                <BkpLink to="/">Head back to the home page.</BkpLink>
            </Typography>
        </Box>
    </>
);
