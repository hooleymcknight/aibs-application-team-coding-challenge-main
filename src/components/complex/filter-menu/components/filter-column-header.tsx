import React from 'react';

import { Typography } from '../../../ui';
import { FilterColumnHeaderLabel } from './filter-column-header-label';
import { useStyles } from '../use-styles';

export interface FilterColumnHeaderProps {
    title: string;
    description?: string;
    unit?: string;
}

export const FilterColumnHeader = ({ title, description, unit }: FilterColumnHeaderProps) => {
    const classes = useStyles();

    const inputLabel = (
        <FilterColumnHeaderLabel
            title={title}
            description={description}
            unit={unit}
        />
    );

    return (
        <Typography
            className={`filter-column-header ${classes.columnHeader}`}
            variant="titleUppercaseSmall"
            color="textPrimary"
            noWrap
        >
            {inputLabel}
        </Typography>
    );
};
