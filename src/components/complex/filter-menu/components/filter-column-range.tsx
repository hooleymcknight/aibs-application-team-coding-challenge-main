import React, { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Slider, { ValueLabelProps } from '@material-ui/core/Slider';

import { FilterHistogram } from './filter-histogram';
import { useStyles } from '../use-styles';
import { DisplayPropertyTooltip } from '../../../ui';
import { formatNumber } from '../../../../utils';
import { FilterCategoryState, SliderItemState } from '../../../../types';
import { NumericTextField } from './numeric-text-field';
import { CategoryCount } from '../../../../services/filter';
import { HandleSiderDrag } from '../types';

/**
 * This interfaces exposes the `valueLabelDisplay` property.
 * Using the `open` prop from `ValueLabelProps` causes a bug that needs to be investigated.
 * `valueLabelDisplay` is a required prop in the context of this module,
 * but otherwise is an optional prop to the `Slider` component.
 */
interface ValueLabelComponentProps extends ValueLabelProps {
    valueLabelDisplay: 'on' | 'off';
}

function ValueLabelComponent(props: ValueLabelComponentProps) {
    const { children, value, valueLabelDisplay } = props;
    const open = valueLabelDisplay === 'on';

    return (
        <DisplayPropertyTooltip
            placement="right"
            title={formatNumber(value)}
            open={open}
        >
            {children}
        </DisplayPropertyTooltip>
    );
}

const BAR_WIDTH = 24;

export interface FilterColumnRangeProps {
    title: string;
    category: CategoryCount;
    filterCategoryCount: CategoryCount;
    filterCategoryState: FilterCategoryState;
    handleSliderDrag: HandleSiderDrag;
}

export const FilterColumnRange = ({
    category,
    filterCategoryCount,
    filterCategoryState,
    handleSliderDrag,
    title,
}: FilterColumnRangeProps) => {
    const classes = useStyles();
    const sliderLength = BAR_WIDTH * category.items.length;
    const { min, max, minRange, maxRange } = filterCategoryState.slider;

    // hover state for showing marks
    const [histogramSliderHovered, setHistogramSliderHovered] = useState<boolean>(false);

    // intermediate slider values before commit
    const [sliderValue, setSliderValue] = useState<number[]>([min, max]);

    /**
     * get a new slider state object
     */
    const getNextSliderState = useCallback(
        (nextMin: number, nextMax: number): SliderItemState => ({
            min: nextMin,
            max: nextMax,
            minRange,
            maxRange,
        }),
        [minRange, maxRange]
    );

    // when component loads or min and max get updated,
    // set the slider
    useEffect(() => {
        setSliderValue([min, max]);
    }, [min, max]);

    type OnSliderChange = (event: React.ChangeEvent<{}>, value: number[]) => void;

    /**
     * commit the change from the slider
     * fires on mouseUp
     */
    const onSliderChangeCommitted = useCallback<OnSliderChange>(
        (event, value) => {
            const newState = getNextSliderState(value[0], value[1]);

            handleSliderDrag(category.name, newState, category.type);
        },
        [getNextSliderState, handleSliderDrag, category]
    );

    /**
     * intermediate slider state
     */
    const onSliderChange = useCallback<OnSliderChange>((event, value) => {
        setSliderValue(value);
    }, []);

    /**
     * handle update from numeric text field
     */
    const onMinChange = useCallback(
        (value: number) => {
            const newState = value < max ? getNextSliderState(value, max) : getNextSliderState(max, max);

            handleSliderDrag(category.name, newState, category.type);
        },
        [category, getNextSliderState, handleSliderDrag, max]
    );

    /**
     * handle update from numeric text field
     */
    const onMaxChange = useCallback(
        (value: number) => {
            const newState = min < value ? getNextSliderState(min, value) : getNextSliderState(min, min);

            handleSliderDrag(category.name, newState, category.type);
        },
        [category, getNextSliderState, handleSliderDrag, min]
    );

    const handleHistogramClick = useCallback(
        (incomingMin: number, incomingMax: number) => () => {
            const newState = getNextSliderState(incomingMin, incomingMax);

            handleSliderDrag(category.name, newState, category.type);
        },
        [getNextSliderState, handleSliderDrag, category]
    );

    const valueLabelDisplay = histogramSliderHovered ? 'on' : 'off';

    const onMouseOver = useCallback(() => {
        setHistogramSliderHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHistogramSliderHovered(false);
    }, []);

    return (
        <>
            <Box className={classes.minMaxContainer}>
                <NumericTextField
                    label="Min"
                    value={min}
                    minRange={minRange}
                    maxRange={maxRange}
                    onUpdate={onMinChange}
                />
                <div className={classes.minMaxFieldSpacer} />
                <NumericTextField
                    label="Max"
                    value={max}
                    minRange={minRange}
                    maxRange={maxRange}
                    onUpdate={onMaxChange}
                />
            </Box>
            <Box className={classes.sliderHistogramContainer}>
                <Box
                    height={`${sliderLength}px`}
                    className={classes.histogramSlider}
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                >
                    <Slider
                        orientation="vertical"
                        onChange={onSliderChange}
                        onChangeCommitted={onSliderChangeCommitted}
                        ValueLabelComponent={ValueLabelComponent}
                        min={minRange}
                        max={maxRange}
                        value={sliderValue}
                        valueLabelDisplay={valueLabelDisplay}
                        step={category.measurementStats.step}
                        aria-labelledby="vertical-slider"
                    />
                </Box>
                <FilterHistogram
                    title={title}
                    category={category}
                    filterCategoryCount={filterCategoryCount}
                    minSelected={min}
                    maxSelected={max}
                    handleHistogramClick={handleHistogramClick}
                />
            </Box>
        </>
    );
};
