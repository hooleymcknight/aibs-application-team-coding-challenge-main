import React from 'react';
import Box from '@material-ui/core/Box';
import { FallbackProps } from 'react-error-boundary';
import { DarkHeader } from '../../components/complex/dark-header';
import { PageRoute } from '../types';
import { BkpLink, Typography } from '../../components/ui';
import { ALLEN_BRAIN_MAP_TITLE } from '../../constants';
import { ApplicationHeader } from '../../components/complex/application-header';

export const FatalErrorPage: PageRoute = ({ error }: FallbackProps) => (
    <>
        <ApplicationHeader title={ALLEN_BRAIN_MAP_TITLE} />
        <DarkHeader title="500: Fatal Error" />
        <Box
            px={5}
            py={2}
        >
            <Typography variant="h1">There was an error on the server.</Typography>
            <Typography variant="body">
                <BkpLink href="/">Head back to the home page.</BkpLink>
            </Typography>
            <Typography variant="body">{error.message}</Typography>
        </Box>
    </>
);
