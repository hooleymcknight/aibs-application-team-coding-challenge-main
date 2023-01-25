import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { ViewDefaultOptionsPayload, ViewDefaultOptions } from '../../filter/types';
import { Operator } from '../../../types';
import { SPECIMENS_SUMMARY_CELL } from '../../../constants';

export const viewDefaultPropertiesQuery = gql`
    query viewDefaultOptions($referenceId: String) {
        defaultOptions: getSpecimenViewDefaultOptions (
            filter: [{
                field: "referenceId",
                operator: ${Operator.EQ},
                value: $referenceId
            }]
        ) {
            # CAN DECOUPLE SEPARATE filterFeatures IN THE FUTURE
            # BOTH FILTER AND TABLE USE tableColumnFeatures FOR SYNCHRONICITY
            # filterFeatures
            properties: tableColumnFeatures
            defaultFilter: filterState {
                field
                operator
                value
            }
            defaultSort: sortState {
                field
                order
            }
            listImageFeatures
            summaryFeatures
        }
    }
`;

export const useDefaultsQuery = (referenceId: string | null = null) => {
    const variables = { referenceId };

    const response = useQuery<ViewDefaultOptionsPayload>(viewDefaultPropertiesQuery, { variables });

    const data: ViewDefaultOptions = useMemo(
        () =>
            response.data?.defaultOptions && {
                ...response.data?.defaultOptions,
                listImageFeatures: [
                    SPECIMENS_SUMMARY_CELL,
                    ...(response.data?.defaultOptions?.listImageFeatures ?? []),
                ].filter(Boolean),
            },
        [response.data]
    );

    return { ...response, data };
};
