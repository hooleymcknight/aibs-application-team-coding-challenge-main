import CircularProgress from '@material-ui/core/CircularProgress';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import round from 'lodash/round';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceError } from '../../components/complex/error/service-error';
import { FilterSlideMenu } from '../../components/complex/filter-menu';
import { ListDropdownOption } from '../../components/complex/list-dropdown';
import { FeatureTooltipContent } from '../../components/ui/display-property-tooltip/feature-tooltip-content';
import { filterViewSlice } from '../../services/filter-view/filter-view-slice';
import { selectFilterView } from '../../services/filter-view/selectors';
import { filterSlice, selectFilter, projectFilter } from '../../services/code-challenge-filter';
import { selectKey } from '../../services/key';
import { filterPropertyReferenceIdsSlice } from '../../services/view-properties/property-names-slices';
import { selectReferenceIdFromTitle } from '../../services/view-properties/selectors';
import {
    CategoryCount,
    FilterCategoryArguments,
    FilterCategoryCounts,
    FilterCounts,
    TotalCounts,
    useItemCountQuery,
} from '../../services/filter';
import { useFilterDisplayNameMap } from '../../services/control-display-name-map-query/use-control-display-name-map-query';
import { useDefaultsQuery, useOptionGroups, useTextOptions } from '../../services/view-properties';
import {
    FeatureOption,
    FilterArgument,
    FilterCategoryState,
    FilterItemStateUpdate,
    FilterMeasurementStats,
    FilterState,
    FilterType,
    ItemCount,
    Mark,
    Operator,
    SliderItemState,
} from '../../types';
import { jsonParse } from '../../utils/json-parse';
import { getRefIdAlias } from '../../utils/strings/get-query-safe-alias';
import { filterColumnSyncSlice, selectTableSyncState } from '../../services/filter-column-sync';

interface CountsRef {
    totalCounts: TotalCounts;
    filterCounts: FilterCounts;
    filterState: FilterState;
}

const getSlider = (measurementStats: FilterMeasurementStats, value?: string): SliderItemState => {
    const { max: maxRange, min: minRange } = measurementStats;

    const [min, max] = jsonParse<number[]>(value) ?? [minRange, maxRange];

    return {
        minRange,
        maxRange,
        min,
        max,
    };
};

const getFilterStateItems = (filterArgs: FilterArgument[], category: FilterCategoryArguments) =>
    filterArgs.filter(({ field }) => field === category.referenceId).map(({ value }) => ({ name: value }));

const getFilterState = (filterArgs: FilterArgument[], categories: FilterCategoryArguments[]) =>
    categories.map<FilterCategoryState>((category) => {
        const { name, type, description, referenceId } = category;

        if (type === FilterType.MEASUREMENT && category.measurementStats) {
            const items = filterArgs.filter(({ field }) => field === referenceId);

            const value = get(items, [0, 'value'], null);

            const slider = category.measurementStats && getSlider(category.measurementStats, value);

            return {
                name,
                type,
                description,
                items: [],
                slider,
                field: referenceId,
            };
        }

        const items = getFilterStateItems(filterArgs, category);

        return {
            name,
            type,
            description,
            items,
            slider: null,
            field: referenceId,
        };
    });

const getFilterItems = (totalCounts: FilterCategoryCounts, category: FilterCategoryArguments) => {
    const trimName = getRefIdAlias(category.referenceId);
    return totalCounts[trimName].map<ItemCount>((item) => {
        const countsItem = {
            name: item.properties[0].value,
            count: item.count,
        };

        if (category.measurementStats) {
            const [minRange, maxRange] = jsonParse<number[]>(item.properties[0].value);
            return {
                ...countsItem,
                maxRange,
                minRange,
            };
        }

        return countsItem;
    });
};

const computeCategoryCounts = (
    totalCounts: FilterCategoryCounts,
    categories: FilterCategoryArguments[],
    isFilterCount: Boolean
): CategoryCount[] =>
    categories.map<CategoryCount>((category): CategoryCount => {
        const { name, referenceId, type, description, measurementStats, unit } = category;
        const items = isFilterCount && getFilterItems(totalCounts, category);
        const trimName = getRefIdAlias(referenceId);
        const marks =
            measurementStats &&
            totalCounts[trimName].map((item): Mark => {
                const [minRange] = jsonParse<number[]>(item.properties[0].value);
                const value = round(minRange, 3);

                return {
                    value,
                    label: String(value),
                };
            });

        return {
            name,
            type,
            description,
            items,
            measurementStats,
            marks,
            unit,
        };
    });

const getOperator = (type: FilterType, slider: SliderItemState) => {
    switch (type) {
        case FilterType.ANNOTATION:
            return Operator.CONTAINS;
        case FilterType.MEASUREMENT:
            return slider ? Operator.BETWEEN : Operator.EQ;
        default:
            return Operator.CONTAINS;
    }
};

export interface CodeChallengeFilterProps {
    filterOptions: FilterCategoryArguments[];
    filterAllOptions: FilterCategoryArguments[];
}

export const CodeChallengeFilter: FC<CodeChallengeFilterProps> = ({ filterOptions }) => {
    const dispatch = useDispatch();
    const key = useSelector(selectKey);
    const selectedFilter = useSelector(selectFilter);
    const selectedFilterView = useSelector(selectFilterView);
    const selectedFilterProjects = useSelector(projectFilter);
    const referenceIdFromTitle = useSelector(selectReferenceIdFromTitle);
    const tableSyncState = useSelector(selectTableSyncState);

    const { error: tcError, data: totalCountsData } = useItemCountQuery(filterOptions, selectedFilterProjects);

    const { error: fcError, data: filterCountsData } = useItemCountQuery(filterOptions, selectedFilter);

    const { data: displayNameMap, error: dnError, loading: dnLoading } = useFilterDisplayNameMap();

    const { error: defaultsError, loading: defaultsLoading, data: defaults } = useDefaultsQuery(key);

    const { error: groupsError, loading: groupsLoading, data: menuOptionGroups } = useOptionGroups(key);

    const { error: textOptionsError, loading: textOptionsLoading, data: textOptions } = useTextOptions(key);

    const countsRef = useRef<Partial<CountsRef>>({});

    const filterStateOptions = useMemo(
        () =>
            filterOptions.reduce((options: any, filter: any) => {
                options.push(filter);
                return options;
            }, [] as FilterCategoryArguments[]),
        [filterOptions]
    );

    const keysInSync = useMemo(() => {
        const optionKeys = filterOptions.reduce((options: any, filter: any) => {
            options.push(getRefIdAlias(filter.referenceId));
            return options;
        }, [] as string[]);

        const tcKeys = keys(totalCountsData);
        const fcKeys = keys(filterCountsData);
        return [optionKeys, tcKeys, fcKeys].every((item, _, [first]) => isEqual(item, first));
    }, [totalCountsData, filterCountsData, filterOptions]);

    const totalCounts = useMemo<TotalCounts | undefined>(() => {
        if (keysInSync) {
            countsRef.current.totalCounts = computeCategoryCounts(totalCountsData, filterOptions, true);
        }
        return countsRef.current.totalCounts;
    }, [keysInSync, totalCountsData, filterOptions]);

    const filterCounts = useMemo(() => {
        if (filterCountsData && keysInSync) {
            countsRef.current.filterCounts = computeCategoryCounts(filterCountsData, filterOptions, true);
        }
        return countsRef.current.filterCounts;
    }, [filterCountsData, keysInSync, filterOptions]);

    const filterState = useMemo(() => {
        if (keysInSync) {
            countsRef.current.filterState = getFilterState(selectedFilter, filterStateOptions);
        }
        return countsRef.current.filterState;
    }, [selectedFilter, filterStateOptions, keysInSync]);

    const setFilterItemState = useCallback(
        ({ categoryName, itemName, type, slider }: FilterItemStateUpdate) => {
            const referenceId = referenceIdFromTitle(categoryName);
            const filterValue = slider ? `[${slider.min}, ${slider.max}]` : itemName;

            const filterArgument = {
                field: referenceId,
                operator: getOperator(type, slider),
                value: filterValue,
            };

            const isFilterSelected = selectedFilter.some(
                ({ field, value }) => field === referenceId && value === itemName
            );

            if (isFilterSelected) {
                dispatch(filterSlice.actions.removeFilter(filterArgument, key));
            } else if (slider) {
                const { min, minRange, max, maxRange } = slider;

                const fieldReferenceId = referenceIdFromTitle(categoryName);

                const fullRange = min === minRange && max === maxRange;
                const filterArguments = fullRange ? [] : [filterArgument];

                dispatch(filterSlice.actions.setFieldFilter(fieldReferenceId, filterArguments, key));
            } else {
                dispatch(filterSlice.actions.appendFilter(filterArgument, key));
            }
        },
        [referenceIdFromTitle, selectedFilter, dispatch, key]
    );

    const setFilterHeightState = useCallback(
        (height: number) => {
            dispatch(filterViewSlice.actions.setFilterHeight(key, height));
        },
        [dispatch, key]
    );

    const getItemTooltipTitle = useCallback(
        ({ label, description, unit }: FeatureOption) => (
            <FeatureTooltipContent
                title={label}
                description={description}
                unit={unit}
            />
        ),
        []
    );

    const setFilterViewState = useCallback(
        (currentView: boolean) => {
            dispatch(filterViewSlice.actions.setFilterIsOpen(key, currentView));
        },
        [dispatch, key]
    );

    const handlePageReset = useCallback(() => {
        dispatch(filterPropertyReferenceIdsSlice.actions.setPropertyReferenceIds(key, defaults.properties));
        dispatch(filterSlice.actions.setFilter(defaults.defaultFilter, key));
        // On page reset we want tableSync to be true for page
        dispatch(filterColumnSyncSlice.actions.setFilterColumnSync(key, true));
    }, [defaults.defaultFilter, defaults.properties, dispatch, key]);

    const clearCategoryFilterState = useCallback(
        (categoryName: string) => {
            const referenceId = referenceIdFromTitle(categoryName);
            dispatch(filterSlice.actions.clearFieldFilter(referenceId, key));
        },
        [dispatch, key, referenceIdFromTitle]
    );

    const setSelectedOptions = useCallback(
        (selectedOptions: ListDropdownOption[]) => {
            const selectedOptionFields = selectedOptions.map((so) => so.field);
            dispatch(filterPropertyReferenceIdsSlice.actions.setPropertyReferenceIds(key, selectedOptionFields));
        },
        [dispatch, key]
    );

    const optionsMap = useMemo(
        () =>
            new Map(
                menuOptionGroups?.map((og) => {
                    const optionsForGroup = textOptions.filter((o) => o.groupKey === og.shortName);

                    return [og.shortName, optionsForGroup];
                })
            ),
        [menuOptionGroups, textOptions]
    );

    // On click, tableSync should be set to opposite of current value
    // if tableSync was false it will now be true meaning we
    // dispatch setRefIds for filter properties to match display properties
    const toggleTableSyncState = useCallback(() => {
        dispatch(filterColumnSyncSlice.actions.setFilterColumnSync(key, !tableSyncState));
    }, [dispatch, tableSyncState, key]);

    const isLoading =
        !filterState ||
        !totalCounts ||
        !filterCounts ||
        defaultsLoading ||
        dnLoading ||
        groupsLoading ||
        textOptionsLoading;

    if (isLoading) {
        return <CircularProgress />;
    }

    if (tcError || fcError || defaultsError || dnError || groupsError || textOptionsError) {
        return <ServiceError />;
    }

    return (
        <FilterSlideMenu
            filterState={filterState}
            filterCounts={filterCounts}
            totalCounts={totalCounts}
            isFilterOpen={selectedFilterView.isOpen}
            setFilterViewState={setFilterViewState}
            filterHeight={selectedFilterView.height}
            setFilterItemState={setFilterItemState}
            setFilterHeightState={setFilterHeightState}
            onPageReset={handlePageReset}
            clearCategoryFilterState={clearCategoryFilterState}
            displayNameMap={displayNameMap}
            isSearchAvailable
            optionsMap={optionsMap}
            setSelectedOptions={setSelectedOptions}
            getItemTooltipTitle={getItemTooltipTitle}
            toggleTableSyncState={toggleTableSyncState}
            tableSyncState={tableSyncState}
        />
    );
};
