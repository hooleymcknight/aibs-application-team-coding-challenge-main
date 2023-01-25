import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import round from 'lodash/round';

import { Operator, FilterType, FilterArgument } from '../../../types';
import { NUMBER_OF_RANGE_BINS } from '../../../constants';
import { getRefIdAlias } from '../../../utils';
import { FilterCategoryArguments } from '../types';

const round3 = (x: number): number => round(x, 3);

const getAnnotationCountQuery = ({ referenceId }: FilterCategoryArguments) => {
    const queryAlias = getRefIdAlias(referenceId);

    return `
        ${queryAlias}: aio_specimenCounts (
            filter: $${queryAlias}
            groupBy: "${referenceId}"
            sort: {
                field: "${referenceId}"
                order: ASC
            }
        ) {
            properties {
                value
            }
            count
        }
    `;
};

const getMeasurementCountQuery = (specimenCategoryArgument: FilterCategoryArguments) => {
    const {
        referenceId,
        measurementStats: { min, max },
    } = specimenCategoryArgument;

    const step = (max - min) / NUMBER_OF_RANGE_BINS;
    const range = Array(NUMBER_OF_RANGE_BINS)
        .fill(1)
        .map((d, i) => {
            // `epsilon` value is used to create exclusive min and inclusive max ranges,
            // unless it is the first bin, then both sides are inclusive.
            const epsilon = i !== 0 ? Number.EPSILON : 0;
            const binMin = round3(min + i * step) + epsilon;
            const binMax = round3(min + (i + 1) * step);

            return `"[${binMin}, ${binMax}]"`;
        })
        .join(',');

    const queryAlias = getRefIdAlias(referenceId);

    return `
        ${queryAlias}: aio_specimenRangeCounts (
            filter: $${queryAlias}
            groupBy: {
                field: "${referenceId}"
                range: [
                    ${range}
                ]
            }
        ) {
            properties {
                property
                value
            }
            count
        }
    `;
};

export const getItemCountQuery = (categoryArguments: FilterCategoryArguments[]) => {
    const categorySubquery = categoryArguments.map((categoryArgument) => {
        const { type, filterOperator } = categoryArgument;

        if (type === FilterType.ANNOTATION && filterOperator === Operator.CONTAINS) {
            return getAnnotationCountQuery(categoryArgument);
        }

        if (type === FilterType.MEASUREMENT && filterOperator === Operator.BETWEEN) {
            return getMeasurementCountQuery(categoryArgument);
        }

        if (type === FilterType.MEASUREMENT && filterOperator === Operator.EQ) {
            return getAnnotationCountQuery(categoryArgument);
        }

        return '';
    });

    const filterVariables: string = categoryArguments
        .reduce<string[]>((acc, category) => {
            acc.push(`$${getRefIdAlias(category.referenceId)}: [Filter]`);
            return acc;
        }, [])
        .join('\n');

    if (categorySubquery.length) {
        return gql`
    query getSpecimentCounts(
        ${filterVariables}
    ) {
        ${categorySubquery.join('\n')}
    }
        `;
    }

    // Returning `null` throws an error in the Apollo code, so we have a dummy query
    // so the library works. We skip making a network call when we're in this situation anyway,
    // meaning the dummy query will have no effect.
    return gql`
        query emptyQuery {
            _empty
        }
    `;
};

interface Variables {
    [alias: string]: FilterArgument[];
}

export const useItemCountQuery = (categoryArguments: FilterCategoryArguments[], filter: FilterArgument[]) => {
    const variableReducer = useCallback(
        (acc: Variables, category: FilterCategoryArguments): Variables => {
            const { referenceId } = category;
            const queryAlias = getRefIdAlias(referenceId);
            const applicableFilter = filter.filter(({ field }) => field !== referenceId);
            acc[queryAlias] = applicableFilter;

            return acc;
        },
        [filter]
    );

    const itemCountQuery = getItemCountQuery(categoryArguments);
    const variables: Variables = categoryArguments.reduce<Variables>(
        (acc, category) => variableReducer(acc, category),
        {}
    );

    const options = {
        query: itemCountQuery,
        variables,
        skip: categoryArguments.length === 0,
    };

    return useQuery(itemCountQuery, options);
};
