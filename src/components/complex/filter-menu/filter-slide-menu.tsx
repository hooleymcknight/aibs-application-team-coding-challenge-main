import React, { useState, useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import noop from 'lodash/noop';
import Button from '@material-ui/core/Button';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import Replay from 'mdi-material-ui/Replay';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import { useStyles } from './use-styles';
import { FilterMenuProps, HandleItemClick, HandleSiderDrag } from './types';
import { FilterColumns } from './components/filter-columns';
import { useDragHandle, DragHandleCallback } from '../../../hooks';
import { FilterButton } from './components/filter-button';
import { FilterAccordion, FilterAccordionSummary, FilterAccordionDetails } from './components/filter-accordion';
import { FilterType, SliderItemState } from '../../../types';
import { dispatchCustomEvent } from '../../../utils/dispatch-custom-event';
import {
    FILTER_SIZE_CHANGE,
    FILTER_DRAG_MIN_HEIGHT,
    MIN_FILTER_HEIGHT,
    MAX_FILTER_HEIGHT,
    FILTER_ITEM_TOOLTIP_DELAY,
    SYNC_TOOLTIP_LEAVE,
} from '../../../constants';
import { mdMid } from '../../../styles/constants';
import { FilterDrag } from './components/filter-drag';
import { DisplayPropertyTooltip, ShowAllIcon } from '../../ui';
import { AddRemoveDropdown } from '../add-remove-dropdown';

const dispatchFilterSizeChange = () => dispatchCustomEvent(FILTER_SIZE_CHANGE);

export const FilterSlideMenu = ({
    displayNameMap,
    filterState,
    filterCounts,
    totalCounts,
    filterHeight,
    setFilterItemState,
    onPageReset,
    clearCategoryFilterState,
    isSearchAvailable,
    isFilterOpen,
    setFilterViewState,
    setFilterHeightState = () => {},
    optionsMap,
    setSelectedOptions,
    getItemTooltipTitle,
    tableSyncState,
    toggleTableSyncState,
}: FilterMenuProps) => {
    const classes = useStyles();
    const [showSelectedProperties, setShowSelectedProperties] = useState(false);
    const [syncButtonHovered, setSyncButtonHovered] = useState(false);

    const handleItemClick: HandleItemClick = useCallback(
        (categoryName: string, itemName: string, type: FilterType) => () => {
            setFilterItemState({ categoryName, type, itemName });
        },
        [setFilterItemState]
    );

    const handleSliderDrag: HandleSiderDrag = useCallback(
        (categoryName: string, slider: SliderItemState, type: FilterType) => {
            setFilterItemState({ categoryName, type, slider });
        },
        [setFilterItemState]
    );

    const handleChange: DragHandleCallback = useCallback(
        ({ newHeight }) => {
            setFilterHeightState(newHeight);
            dispatchFilterSizeChange();
        },
        [setFilterHeightState]
    );

    const { handleStart } = useDragHandle(filterHeight, MIN_FILTER_HEIGHT, MAX_FILTER_HEIGHT, handleChange);

    const filterAccordionOnChange = useCallback(
        (_: React.ChangeEvent<{}>, expanded: boolean) => {
            if (setFilterViewState) {
                setFilterViewState(expanded);
            }
        },
        [setFilterViewState]
    );

    const filterCloseOnClick = useCallback(() => {
        if (setFilterViewState) {
            setFilterViewState(false);
        }
    }, [setFilterViewState]);

    const toggleProperties = useCallback(() => {
        setShowSelectedProperties((oldValue) => !oldValue);
    }, []);

    const onSyncButtonHover = useCallback(() => {
        setSyncButtonHovered(true);
    }, []);

    const onSyncButtonLeave = useCallback(() => {
        setSyncButtonHovered(false);
    }, []);

    const slideoverStyle = useMemo(
        () => ({
            height: `${filterHeight}px`,
        }),
        [filterHeight]
    );

    const selectedOptions = filterState.map((state) => ({
        label: state.name,
        field: state.field,
    }));

    const filteredOptionsMap = useMemo(
        () =>
            new Map(
                Array.from(optionsMap.entries()).map(([group, options]) => [
                    group,
                    options.filter(() => !showSelectedProperties),
                ])
            ),
        [optionsMap, showSelectedProperties]
    );

    const actionIcon = showSelectedProperties ? (
        <DisplayPropertyTooltip title="Show available properties">
            <ShowAllIcon fontSize="small" />
        </DisplayPropertyTooltip>
    ) : (
        <DisplayPropertyTooltip title="Show selected properties">
            <VerticalAlignCenterIcon fontSize="small" />
        </DisplayPropertyTooltip>
    );

    const filterIcon = useMemo(() => {
        if ((tableSyncState && !syncButtonHovered) || (!tableSyncState && syncButtonHovered)) {
            return (
                <DisplayPropertyTooltip
                    title="Sync Table Columns"
                    enterDelay={FILTER_ITEM_TOOLTIP_DELAY}
                    leaveDelay={SYNC_TOOLTIP_LEAVE}
                >
                    <LinkIcon fontSize="small" />
                </DisplayPropertyTooltip>
            );
        }
        return (
            <DisplayPropertyTooltip
                title="Unsync Table Columns"
                enterDelay={FILTER_ITEM_TOOLTIP_DELAY}
                leaveDelay={SYNC_TOOLTIP_LEAVE}
            >
                <LinkOffIcon fontSize="small" />
            </DisplayPropertyTooltip>
        );
    }, [tableSyncState, syncButtonHovered]);

    const filterSlideButtons = (
        // Click event propagation stoppage to prevent accordion from opening on interaction
        <Box
            display="flex"
            alignItems="center"
            onClick={(event) => event.stopPropagation()}
        >
            <AddRemoveDropdown
                popoverButton={
                    <DisplayPropertyTooltip title="Filter Options">
                        <IconButton
                            color="default"
                            disableRipple
                            id="specimens-filter-options-button"
                            className={classes.filterSettingsButton}
                        >
                            <SettingsApplicationsIcon />
                        </IconButton>
                    </DisplayPropertyTooltip>
                }
                title={showSelectedProperties ? 'Selected Properties' : 'Available Properties'}
                actionIcon={actionIcon}
                filterIcon={filterIcon}
                optionsMap={filteredOptionsMap}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                getItemTooltipTitle={getItemTooltipTitle}
                onActionIconClick={toggleProperties}
                onFilterIconClick={toggleTableSyncState}
                onSyncButtonHover={onSyncButtonHover}
                onSyncButtonLeave={onSyncButtonLeave}
            />
            <DisplayPropertyTooltip title="Reset Page">
                <IconButton
                    onClick={onPageReset}
                    disableRipple
                    id="slide-filter-reset-button"
                    className={classes.filterResetButton}
                >
                    <Replay htmlColor={mdMid} />
                </IconButton>
            </DisplayPropertyTooltip>
        </Box>
    );

    return (
        <Box>
            <FilterAccordion
                expanded={isFilterOpen}
                square
                onChange={filterAccordionOnChange}
                TransitionProps={{
                    onEntered: dispatchFilterSizeChange,
                    onExited: dispatchFilterSizeChange,
                }}
            >
                <FilterAccordionSummary>
                    <FilterButton
                        onButtonClick={noop}
                        filterState={filterState}
                        clearCategoryFilterState={clearCategoryFilterState}
                        displayNameMap={displayNameMap}
                        chevron
                        filterIsOpen={isFilterOpen}
                    />
                    {filterSlideButtons}
                </FilterAccordionSummary>
                <FilterAccordionDetails style={slideoverStyle}>
                    <FilterColumns
                        totalCounts={totalCounts}
                        filterCounts={filterCounts}
                        filterState={filterState}
                        displayNameMap={displayNameMap}
                        anchorHeight={filterHeight}
                        isSearchAvailable={isSearchAvailable}
                        handleItemClick={handleItemClick}
                        handleSliderDrag={handleSliderDrag}
                    />
                </FilterAccordionDetails>
                <FilterDrag
                    minHeight={FILTER_DRAG_MIN_HEIGHT}
                    handleStart={handleStart}
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                    >
                        <DisplayPropertyTooltip title="Close Filter">
                            <Button
                                onClick={filterCloseOnClick}
                                disableRipple
                                className={classes.filterSlideCloseButton}
                            >
                                <ChevronUp
                                    htmlColor={mdMid}
                                    fontSize="small"
                                />
                            </Button>
                        </DisplayPropertyTooltip>
                    </Box>
                </FilterDrag>
            </FilterAccordion>
        </Box>
    );
};
