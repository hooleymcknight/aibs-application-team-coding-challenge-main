import React from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import { useStyles } from '../use-styles';
import { CategoryDisplayNameMap, FilterCategoryState, FilterItemState, FilterState } from '../../../../types';
import { formatNumber } from '../../../../utils';
import { DisplayPropertyTooltip, Typography } from '../../../ui';
import { ELLIPSIS } from '../../../../constants';

const buildLabelItemNames = (category: FilterCategoryState): string => {
    if (category.slider) {
        const { min, max } = category.slider;
        return `${formatNumber(min)} to ${formatNumber(max)}`;
    }

    if (!category.items) {
        return '';
    }

    return category.items
        ?.reduce<string[]>((acc, { name }, index) => {
            // To reduce pill size, only display the first three
            // and append an ellipsis for four or more
            if (index < 3) {
                acc.push(name);
            } else if (index === 3) {
                acc.push(ELLIPSIS);
            }
            return acc;
        }, [])
        .join(', ');
};

const shouldDisplayChip = (category: FilterCategoryState) => {
    const isDisplayableAnnotation = category.items && category.items?.length > 0;
    const isDisplayableMeasurement =
        category.slider?.min !== category.slider?.minRange || category.slider?.max !== category.slider?.maxRange;

    return isDisplayableAnnotation || isDisplayableMeasurement;
};

export interface FilterChipsProps {
    displayNameMap: CategoryDisplayNameMap;
    filterState: FilterState;
    clearCategoryFilterState: (categoryName: string) => void;
}

export const FilterChips = ({ displayNameMap, filterState, clearCategoryFilterState }: FilterChipsProps) => {
    const classes = useStyles();

    const filterChips = filterState.filter(shouldDisplayChip).map((category) => {
        const handleDeleteFilterCategory = () => {
            // Set filters to false for this category.
            clearCategoryFilterState(category.name);
        };

        const formattedLabel = (
            <>
                <strong>{displayNameMap[category.name] || category.name}:</strong> {buildLabelItemNames(category)}
            </>
        );

        const chip = (
            <Chip
                className={classes.chip}
                key={category.name}
                label={formattedLabel}
                onDelete={handleDeleteFilterCategory}
            />
        );

        if (category.items && category.items?.length > 3) {
            const labels = category.items.map((item: FilterItemState) => item.name).join(', ');

            return (
                <DisplayPropertyTooltip
                    key={`tooltip-${category.name}`}
                    placement="bottom"
                    title={labels}
                    enterDelay={100}
                >
                    {chip}
                </DisplayPropertyTooltip>
            );
        }

        return chip;
    });

    return (
        <Box className={classes.chipsWrapper}>
            <Typography
                className={classes.chipsLabel}
                component="span"
            >
                Filtered by
            </Typography>
            {filterChips.length > 0 ? (
                <span>{filterChips}</span>
            ) : (
                <Typography
                    component="span"
                    variant="emphasis"
                >
                    None
                </Typography>
            )}
        </Box>
    );
};
