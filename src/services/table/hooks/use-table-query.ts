import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useMemo } from 'react';

import { TableRow, FilterArgument, SortArgument, TransformedTableRow } from '../../../types';
import { transformRow } from '../../../utils';

export interface TableQueryPayload {
    [index: string]: TableRow[];
}

const tableQuery = (dataFieldName: string) => gql`
    query getTable(
        $sort: [Sort], $filter: [Filter], $limit: Int, $offset: Int, $featureTypes: [String]
        ) {
        ${dataFieldName}: aio_specimen(sort: $sort, filter: $filter, limit: $limit, offset: $offset) 
        @connection(key: "${dataFieldName}TableData", filter: ["filter", "sort"]) {
            cRID {
                symbol
                registry {
                    referenceId
                    description
                }
            }
            annotations(featureTypes: $featureTypes)  
            @connection(key: "${dataFieldName}TableDataAnnotations", filter: ["featureTypes"]){
                referenceId
                featureType {
                    referenceId,
                    title
                }
                taxons {
                    symbol
                }
            }
            measurements(featureTypes: $featureTypes)  
            @connection(key: "${dataFieldName}TableDataMeasurements"){
                value,
                featureType {
                    referenceId,
                    title,
                    description
                },
                measurementType
            }
        }
    }
`;

export const useTableQuery = <T>(
    dataFieldName: string,
    sort: SortArgument[],
    filter: FilterArgument[],
    limit: number,
    offset: number,
    featureTypes: string[],
    areColumnsUpdated: boolean
) =>
    useQuery<T>(tableQuery(dataFieldName), {
        nextFetchPolicy: areColumnsUpdated ? 'cache-first' : 'network-only',
        variables: {
            sort,
            filter,
            limit,
            offset,
            featureTypes,
        },
    });

/**
 * TODO: Though this makes operations in the consuming container more simple,
 * we've merely shifted an expensive operation higher up the command to be performed
 * less often. Ideally, we'd put this operation in the BFF where we can be assured
 * compute power for these operations is adequate and eventually leverage caches
 * for frequent operations.
 */
export const useTableData = (
    dataFieldName: string,
    sort: SortArgument[],
    filter: FilterArgument[],
    limit: number,
    offset: number,
    featureTypeRefIds: string[],
    filteredCount: number,
    areColumnsUpdated: boolean
) => {
    const response = useTableQuery<TableQueryPayload>(
        dataFieldName,
        sort,
        filter,
        limit,
        offset,
        featureTypeRefIds,
        areColumnsUpdated
    );

    const initialData: TransformedTableRow[] = useMemo(
        () => (response.data && response.data[dataFieldName].map(transformRow)) ?? [],
        [dataFieldName, response.data]
    );

    const data: TransformedTableRow[] = Array(filteredCount)
        .fill({ annotationsDictionary: {}, measurementsDictionary: {} })
        .map((_d: TransformedTableRow, i: number) => {
            if (initialData && i < initialData.length) {
                return initialData[i];
            }

            return { annotationsDictionary: {}, measurementsDictionary: {} };
        });

    return { ...response, data };
};
