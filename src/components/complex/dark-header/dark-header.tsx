import React from 'react';
import Box from '@material-ui/core/Box';

import { Typography } from '../../ui';
import { useStyles } from './use-styles';

export interface DarkHeaderProps {
    title: string;
}

export const DarkHeader = ({ title }: DarkHeaderProps) => {
    const classes = useStyles();

    return (
        <Box
            px={5}
            pt={8}
            pb={10}
            className={classes.root}
        >
            <Typography
                variant="d1"
                className={classes.text}
            >
                {title}
            </Typography>
        </Box>
    );
};
