import gql from 'graphql-tag';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';

import { AllPropertiesData } from '../../filter/types';
import { FilterType, PropertiesNotFoundError } from '../../../types';
import { createDisplayPropertyFilter, createProjectFilter } from '../../../utils';
import { useDefaultsQuery } from './use-defaults-query';

export const allFieldsQuery = gql`
    query Properties($filter: [Filter!]!, $displayPropertyFilter: DisplayPropertyFilter!) {
        options: getDisplayProperty(displayPropertyFilter: $displayPropertyFilter) {
            ... on ProjectDisplayProperty {
                displayFeatures {
                    featureType {
                        referenceId
                        title
                        description
                    }
                    modality {
                        name
                    }
                    type
                    filterOperator
                    ... on MeasurementDisplayProperty {
                        measurementStats {
                            min
                            max
                            avg
                            std
                        }
                    }
                }
            }
        }
        # examine 1 specimen's crid for specimen ID metadata
        idOption: aio_specimen(limit: 1, filter: $filter) @connection(key: "SpecimenCRIDs") {
            cRID {
                registry {
                    referenceId
                    description
                }
            }
        }
    }
`;

export const useAllFieldsQuery = (projectReferenceId: string) => {
    const filter = [createProjectFilter(projectReferenceId)];
    const displayPropertyFilter = createDisplayPropertyFilter(projectReferenceId);

    const variables = { filter, displayPropertyFilter };
    const response = useQuery<AllPropertiesData>(allFieldsQuery, {
        variables,
        skip: !projectReferenceId,
    });

    const error = useMemo(() => {
        if (response.error) {
            return response.error;
        }

        if (response.data?.options.displayFeatures.length === 0) {
            return new PropertiesNotFoundError();
        }

        return undefined;
    }, [response.error, response.data]);

    const data = useMemo(() => {
        if (!response.data) {
            return undefined;
        }

        return [...response.data.options.displayFeatures];
    }, [response.data]);

    return { ...response, error, data };
};

export const useAllFieldsMap = (projectReferenceId: string) => {
    const response = useAllFieldsQuery(projectReferenceId);
    const data = useMemo(() => keyBy(response.data, (datum) => datum.featureType.referenceId), [response.data]);

    return { ...response, data };
};

export const useTextFields = (projectReferenceId: string) => {
    const response = useAllFieldsQuery(projectReferenceId);
    const data = useMemo(() => response.data?.filter(({ type }) => type !== FilterType.IMAGE), [response.data]);

    return { ...response, data };
};

export const useSearchFields = (projectReferenceId: string) => {
    const response = useAllFieldsQuery(projectReferenceId);
    const data = useMemo(() => response.data?.filter(({ filterOperator }) => !!filterOperator), [response.data]);

    return { ...response, data };
};

export const useColumnValidationSet = (projectReferenceId: string) => {
    const response = useTextFields(projectReferenceId);
    const data = useMemo(
        () => new Set(response.data?.map(({ featureType: { referenceId } }) => referenceId)),
        [response.data]
    );

    return { ...response, data };
};

export const useImageFields = (referenceId: string, imageRefIdsArg?: string[]) => {
    const response = useAllFieldsMap(referenceId);
    const defaultsResponse = useDefaultsQuery(referenceId);

    const imageRefIds = useMemo(
        () => imageRefIdsArg || defaultsResponse.data?.listImageFeatures || [],
        [defaultsResponse.data, imageRefIdsArg]
    );

    const data = useMemo(
        () => imageRefIds.map((refId) => response?.data[refId]).filter(Boolean),
        [response.data, imageRefIds]
    );

    return { ...response, data };
};

export const useImageColumnValidationSet = (projectReferenceId: string) => {
    const response = useImageFields(projectReferenceId);
    const data = useMemo(
        () => new Set(response.data?.map(({ featureType: { referenceId } }) => referenceId)),
        [response.data]
    );

    return { ...response, data };
};

export const useHasImageFields = (referenceId: string) => {
    const response = useImageFields(referenceId);
    const data = useMemo(() => !isEmpty(response.data), [response.data]);
    return { ...response, data };
};

/**
 * Currently, views are either tabular (1) || image based (1+).
 * Thus, we can rely on useHasImageFields to infer if we're
 * supporting multiple views. If useHasImageFields.data comes
 * back false, we know that only tabular data is supported.
 *
 * This alias serves as an abstraction to deal with later use cases
 * if/when the above notion is no longer true.
 */
export const useHasMultipleViews = useHasImageFields;
