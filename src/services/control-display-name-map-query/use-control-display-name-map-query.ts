import gql from 'graphql-tag';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { useQuery } from '@apollo/client';
import { CategoryDisplayQuery, CategoryDisplayNameMap } from '../../types';

const query = gql`
    query filterDisplayNamesQuery {
        getFilterField {
            alias
            displayName
        }
    }
`;

export const useFilterDisplayNameMap = () => {
    const { data: payload, loading, error } = useQuery<CategoryDisplayQuery>(query);
    const keyedPayload = keyBy(payload?.getFilterField, 'alias');
    const data: CategoryDisplayNameMap = mapValues(keyedPayload, (obj) => obj.displayName);
    return { data, loading, error };
};
