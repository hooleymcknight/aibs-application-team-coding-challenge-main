import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';

import { FilterArgument } from '../../../types';

export interface CountQueryData {
    totalCount: Array<{
        count: number;
    }>;
}

const countQuery = gql`
    query specimenCount($filter: [Filter]) {
        totalCount: aio_specimenCounts(filter: $filter) {
            count
        }
    }
`;

export const useCountQuery = (filter: FilterArgument[]) => {
    const options = { query: countQuery, variables: { filter } };
    const response = useQuery<CountQueryData>(countQuery, options);
    const data = get(response, ['data', 'totalCount', '0', 'count']);

    return { ...response, data };
};
