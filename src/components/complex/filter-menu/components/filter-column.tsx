import React from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import { FilterColumnHeader } from './filter-column-header';
import { FilterColumnRange } from './filter-column-range';
import { useScrollbarWidth } from '../../../../hooks';
import { lt2 } from '../../../../styles/constants';
import { useStyles } from '../use-styles';
import { SLIDE_COL_HEADER_HEIGHT } from '../../../../constants';
import { CategoryCount } from '../../../../services/filter';
import { FilterCategoryState } from '../../../../types';
import { HandleItemClick, HandleSiderDrag } from '../types';

export interface FilterColumnProps {
    referenceId: string;
    title: string;
    description?: string;
    category: CategoryCount;
    width: number;
    listHeight: number;
    filterCategoryCount: CategoryCount;
    filterCategoryState: FilterCategoryState;
    handleItemClick: HandleItemClick;
    handleSliderDrag: HandleSiderDrag;
    isSearchAvailable: boolean;
    unit?: string;
    isHorizontalScrollbarShown: boolean;
}

export const FilterColumn = ({
    referenceId,
    title,
    description,
    category,
    width,
    listHeight,
    filterCategoryCount,
    filterCategoryState,
    handleItemClick,
    handleSliderDrag,
    unit,
    isHorizontalScrollbarShown,
}: FilterColumnProps) => {
    const classes = useStyles();
    const scrollbarWidth = useScrollbarWidth();

    const heightWithoutScrollbar = listHeight - (isHorizontalScrollbarShown ? scrollbarWidth : 0);

    const height = heightWithoutScrollbar - SLIDE_COL_HEADER_HEIGHT;

    return (
        <Box
            width={`${width}px`}
            bgcolor={lt2}
        >
            <FilterColumnHeader
                title={title}
                description={description}
                unit={unit}
            />
            <Divider />
            <Box
                className={classes.columnItems}
                height={`${height}px`}
            >
                {category.measurementStats && (
                    <FilterColumnRange
                        category={category}
                        filterCategoryCount={filterCategoryCount}
                        filterCategoryState={filterCategoryState}
                        handleSliderDrag={handleSliderDrag}
                        title={title}
                    />
                )}
            </Box>
        </Box>
    );
};
