import { useMemo } from 'react';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import keyBy from 'lodash/keyBy';

import { TABLE_DEFAULT_MODALITY } from '../../../constants';
import { FeatureOption, TableFacetProperty } from '../../../types';
import { useImageFields, useSearchFields, useTextFields } from './use-all-fields-query';
import { useMeasurementUnitMap } from './use-measurement-unit-map';

export const transformPropertiesToOptions = (data: TableFacetProperty[], unitMap: Record<string, string>) => {
    const mappedSortOptions = data.map<FeatureOption>(({ modality, featureType, type }) => ({
        label: featureType.title,
        field: featureType.referenceId,
        groupKey: get(modality, [0, 'name'], TABLE_DEFAULT_MODALITY).toLowerCase(),
        description: featureType.description,
        type,
        unit: get(unitMap, [featureType.referenceId]),
    }));

    return sortBy(mappedSortOptions, [({ groupKey }) => groupKey.toUpperCase(), ({ label }) => label.toUpperCase()]);
};

export const useSortOptions = (projectReferenceId: string) => {
    const response = useSearchFields(projectReferenceId);
    const unitMapResponse = useMeasurementUnitMap(projectReferenceId);
    const error = response.error || unitMapResponse.error;
    const data = useMemo(
        () => transformPropertiesToOptions(response.data, unitMapResponse.data),
        [response.data, unitMapResponse.data]
    );

    return { ...response, error, data };
};

type getPropertyHook = typeof useTextFields | typeof useImageFields;
export const getUseOptions = (getPropertyHook: getPropertyHook) => (projectReferenceId: string) => {
    const response = getPropertyHook(projectReferenceId);
    const unitMapResponse = useMeasurementUnitMap(projectReferenceId);
    const error = response.error || unitMapResponse.error;
    const data = useMemo(
        () => transformPropertiesToOptions(response.data, unitMapResponse.data),
        [response.data, unitMapResponse.data]
    );
    return { ...response, error, data };
};

export const useTextOptions = getUseOptions(useTextFields);
export const useImageOptions = getUseOptions(useImageFields);

export const useOptionMap = (projectReferenceId: string) => {
    const response = useTextOptions(projectReferenceId);
    const data = useMemo(() => keyBy(response.data, 'field'), [response.data]);
    return { ...response, data };
};
