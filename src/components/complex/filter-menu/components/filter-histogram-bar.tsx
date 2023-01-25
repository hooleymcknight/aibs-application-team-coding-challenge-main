import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { useStyles, FILTER_ITEM_STYLE } from '../use-styles';
import { Typography, DisplayPropertyTooltip, FeatureTooltipContent } from '../../../ui';
import { pct } from '../../../../utils/strings/pct';
import { pluralizeNoun, formatNumber } from '../../../../utils';
import { FILTER_ITEM_TOOLTIP_DELAY } from '../../../../constants';
import { CategoryCount } from '../../../../services/filter';
import { ItemCount } from '../../../../types';

export interface FilterHistogramBarProps {
    item: ItemCount;
    filterCount: number;
    maxCount: number;
    isItemSelected: boolean;
    handleHistogramClick: (minRange: number, maxRange: number) => () => void;
    filterCategoryCount: CategoryCount;
    title: string;
}

export const FilterHistogramBar = (props: FilterHistogramBarProps): React.ReactElement => {
    const { item, filterCount, maxCount, isItemSelected, handleHistogramClick, filterCategoryCount, title } = props;
    const classes = useStyles();

    const filterCountBarStyle = useMemo(
        () => ({
            width: pct(filterCount, maxCount),
            opacity: isItemSelected ? 0.5 : 0.2,
        }),
        [filterCount, maxCount, isItemSelected]
    );

    const itemSuffix = filterCategoryCount.unit ? filterCategoryCount.unit : '';
    const formattedRange = {
        min: formatNumber(item.minRange),
        max: formatNumber(item.maxRange),
    };

    return (
        <Box
            position="relative"
            key={item.name}
            className={classes.histogramBarContainer}
            onClick={handleHistogramClick(item.minRange, item.maxRange)}
        >
            <ListItem
                className={classes.histogramBarListItem}
                button
                disableRipple
            >
                <Box
                    className={classes.filterItem}
                    style={FILTER_ITEM_STYLE}
                >
                    <Box
                        className={classes.histogramBar}
                        style={filterCountBarStyle}
                    />
                    <DisplayPropertyTooltip
                        title={
                            <FeatureTooltipContent
                                title={title}
                                filterDescription={`${formattedRange.min} to ${formattedRange.max} ${itemSuffix}`}
                                description={`${filterCount} ${pluralizeNoun(filterCount, 'item')}`}
                            />
                        }
                        enterDelay={FILTER_ITEM_TOOLTIP_DELAY}
                    >
                        <span>
                            <Typography
                                className={classes.histogramBarText}
                                align="right"
                                variant="description"
                                noWrap
                            >
                                {filterCount}
                            </Typography>
                        </span>
                    </DisplayPropertyTooltip>
                </Box>
            </ListItem>
        </Box>
    );
};
