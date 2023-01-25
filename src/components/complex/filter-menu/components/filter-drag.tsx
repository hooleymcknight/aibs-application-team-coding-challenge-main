import React from 'react';
import Box from '@material-ui/core/Box';

import { useStyles } from '../use-styles';

export interface FilterDragProps {
    minHeight: number;
    handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterDrag: React.FC<FilterDragProps> = ({ minHeight, handleStart, children }) => {
    const classes = useStyles();

    return (
        <Box
            minHeight={minHeight}
            onMouseDown={handleStart}
            className={classes.filterDrag}
        >
            {children}
        </Box>
    );
};
