import { useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

import { useTextFields, useImageFields } from './use-all-fields-query';
import { TableFacetProperty, OptionGroupMap } from '../../../types';

const groupMapReducer = (acc: OptionGroupMap, { modality }: TableFacetProperty) => {
    const modalityName = get(modality, [0, 'name'], 'general').toLowerCase();

    return {
        ...acc,
        [modalityName]: {
            shortName: modalityName,
            longName: modalityName,
            description: modalityName,
        },
    };
};

type PropertyGetHook = typeof useTextFields | typeof useImageFields;

const getUseOptionGroups = (propertyGetHook: PropertyGetHook) => (projectReferenceId: string) => {
    const response = propertyGetHook(projectReferenceId);

    const data = useMemo(() => {
        const groupMap = response.data?.reduce(groupMapReducer, {});

        return groupMap && sortBy(Object.values(groupMap), ({ shortName }) => shortName.toUpperCase());
    }, [response.data]);

    return { ...response, data };
};

export const useOptionGroups = getUseOptionGroups(useTextFields);
export const useImageOptionGroups = getUseOptionGroups(useImageFields);
