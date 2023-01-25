import { DEFAULT_FILTER_MAX_COLUMN_WIDTH, DEFAULT_FILTER_MIN_COLUMN_WIDTH } from '../../../constants';

export const computeInitialColumnsWidth = (
    windowWidth: number,
    numberOfColumns: number,
    filterHasTaxonomy: boolean = false
) => {
    // For all other columns, space them evenly across the screen,
    // with a minimum size so it starts scrolling when we have a lot of filters
    const availableWidth = filterHasTaxonomy ? windowWidth - DEFAULT_FILTER_MAX_COLUMN_WIDTH : windowWidth;
    const availableColumns = filterHasTaxonomy ? numberOfColumns - 1 : numberOfColumns;
    const computedWidth = Math.floor(availableWidth / availableColumns);

    return Math.max(DEFAULT_FILTER_MIN_COLUMN_WIDTH, computedWidth);
};
