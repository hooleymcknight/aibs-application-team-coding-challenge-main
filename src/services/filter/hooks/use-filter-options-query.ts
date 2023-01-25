import { useMemo } from 'react';
import get from 'lodash/get';
import { TableFacetProperty, FilterMeasurementStats } from '../../../types';
import { NUMBER_OF_RANGE_STEPS } from '../../../constants';
import { useMeasurementUnitMap, useSearchFields } from '../../view-properties';
import { FilterCategoryArguments } from '../types';

type TransformMeasurementStats = (filter: TableFacetProperty) => FilterMeasurementStats | null;
const transformMeasurementStats: TransformMeasurementStats = (filter) => {
    if (!filter.measurementStats) {
        return null;
    }

    const { measurementStats } = filter;
    const { min, max } = measurementStats;

    const step = (max - min) / NUMBER_OF_RANGE_STEPS;

    return {
        ...measurementStats,
        step,
    };
};

export const useFilterQuery = (projectReferenceId: string) => {
    const response = useSearchFields(projectReferenceId);
    const unitResponse = useMeasurementUnitMap(projectReferenceId);
    const error = response.error || unitResponse.error;

    const data: FilterCategoryArguments[] = useMemo(() => {
        if (!response.data) {
            return [];
        }

        const categories = response.data.map<FilterCategoryArguments>((filter: TableFacetProperty) => ({
            name: filter.featureType.title,
            description: filter.featureType.description,
            type: filter.type,
            referenceId: filter.featureType.referenceId,
            filterOperator: filter.filterOperator,
            measurementStats: transformMeasurementStats(filter),
            unit: get(unitResponse.data, [filter.featureType.referenceId]),
        }));

        return categories;
    }, [response.data, unitResponse.data]);

    return { ...response, error, data };
};
