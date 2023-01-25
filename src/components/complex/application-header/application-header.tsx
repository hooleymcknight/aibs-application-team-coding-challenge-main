import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import { Typography } from '../../ui';
import { useStyles } from './use-styles';

export interface ApplicationHeaderProps {
    title: string;
}

export const ApplicationHeader: FC<ApplicationHeaderProps> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className={classes.root}
        >
            <Grid
                item
                className={classes.title}
            >
                <Typography
                    id="application-logo"
                    className={classes.titleText}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                className={classes.nav}
            >
                {children}
            </Grid>
        </Grid>
    );
};
