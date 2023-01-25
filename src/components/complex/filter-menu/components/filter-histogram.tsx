import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import maxBy from 'lodash/maxBy';
import { ItemCount } from '../../../../types';
import { FilterHistogramBar } from './filter-histogram-bar';
import { CategoryCount } from '../../../../services/filter';

const getFilterCount = (categoryItemName: string, filterItemCounts: ItemCount[]): number => {
    const itemCount = filterItemCounts.find(({ name }) => name === categoryItemName);

    if (itemCount) {
        return itemCount.count;
    }

    return 0;
};

function renderFilterCategories(
    items: ItemCount[],
    filterCategoryCount: CategoryCount,
    maxCount: number,
    minSelected: number,
    maxSelected: number,
    handleHistogramClick: (minRange: number, maxRange: number) => () => void,
    title: string
) {
    const filterCategories = items.map((item: ItemCount) => {
        const isItemSelected = minSelected < item.maxRange && maxSelected > item.minRange;
        const filterCount = getFilterCount(item.name, filterCategoryCount.items);
        return (
            <FilterHistogramBar
                title={title}
                key={item.name}
                item={item}
                filterCount={filterCount}
                isItemSelected={isItemSelected}
                maxCount={maxCount}
                handleHistogramClick={handleHistogramClick}
                filterCategoryCount={filterCategoryCount}
            />
        );
    });

    return filterCategories.reverse();
}

export interface FilterHistogramProps {
    title: string;
    category: CategoryCount;
    filterCategoryCount: CategoryCount;
    minSelected: number;
    maxSelected: number;
    handleHistogramClick: (minRange: number, maxRange: number) => () => void;
}

export const FilterHistogram = (props: FilterHistogramProps): React.ReactElement => {
    const { title, category, filterCategoryCount, minSelected, maxSelected, handleHistogramClick } = props;

    const maxCount = maxBy(category.items, (item) => item.count)?.count;

    return (
        <Box
            position="relative"
            width="80%"
        >
            <List>
                {renderFilterCategories(
                    category.items,
                    filterCategoryCount,
                    maxCount,
                    minSelected,
                    maxSelected,
                    handleHistogramClick,
                    title
                )}
            </List>
        </Box>
    );
};
