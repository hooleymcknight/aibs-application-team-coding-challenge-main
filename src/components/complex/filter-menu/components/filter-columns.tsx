import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { FilterCategoryState, FilterState } from '../../../../types/filter-state';
import { FilterColumn } from './filter-column';
import { useStyles } from '../use-styles';
import { CategoryCount, FilterCounts, TotalCounts } from '../../../../services/filter';
import { Typography } from '../../../ui';
import { CategoryDisplayNameMap } from '../../../../types';
import { HandleItemClick, HandleSiderDrag } from '../types';
import { useWindowSize } from '../../../../hooks';
import { DEFAULT_FILTER_MIN_COLUMN_WIDTH } from '../../../../constants';

const getFilterCategoryState = (filterState: FilterState, category: CategoryCount): FilterCategoryState =>
    filterState.find(({ name: filterName }) => filterName === category.name);

export interface FilterColumnsProps {
    totalCounts: TotalCounts;
    filterCounts: FilterCounts;
    filterState: FilterState;
    anchorHeight: number;
    displayNameMap: CategoryDisplayNameMap;
    isSearchAvailable: boolean;
    handleItemClick: HandleItemClick;
    handleSliderDrag: HandleSiderDrag;
}

export const FilterColumns = ({
    totalCounts,
    filterCounts,
    filterState,
    displayNameMap,
    anchorHeight,
    handleItemClick,
    handleSliderDrag,
    isSearchAvailable,
}: FilterColumnsProps) => {
    const classes = useStyles();
    const windowSize = useWindowSize();

    const totalColumnWidth = filterState.length * DEFAULT_FILTER_MIN_COLUMN_WIDTH;
    const isHorizontalScrollbarShown = totalColumnWidth > windowSize.width;

    return (
        <Grid
            container
            className={classes.columnsContainer}
        >
            {filterState.length > 0 && (
                <Box
                    width={totalColumnWidth}
                    className={classes.columnsScrollContainer}
                >
                    {totalCounts.map((category) => {
                        const filterCategoryCount: CategoryCount = filterCounts.find(
                            (filterCategory) => category.name === filterCategory.name
                        );
                        const filterCategoryState = getFilterCategoryState(filterState, category);
                        const title = displayNameMap[category.name] || category.name;
                        const width = DEFAULT_FILTER_MIN_COLUMN_WIDTH;

                        return (
                            <React.Fragment key={category.name}>
                                <FilterColumn
                                    referenceId={filterCategoryState.field}
                                    width={width}
                                    listHeight={anchorHeight}
                                    description={category.description}
                                    title={title}
                                    category={category}
                                    filterCategoryCount={filterCategoryCount}
                                    filterCategoryState={filterCategoryState}
                                    handleItemClick={handleItemClick}
                                    handleSliderDrag={handleSliderDrag}
                                    isSearchAvailable={isSearchAvailable}
                                    unit={category.unit}
                                    isHorizontalScrollbarShown={isHorizontalScrollbarShown}
                                />
                            </React.Fragment>
                        );
                    })}
                </Box>
            )}
            {filterState.length === 0 && (
                <Typography
                    variant="emphasis"
                    className={classes.noFilters}
                >
                    No filters selected.
                </Typography>
            )}
        </Grid>
    );
};
