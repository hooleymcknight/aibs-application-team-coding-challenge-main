import { REF_ID_ALIAS_PREFIX, REMOVE_NON_INITIAL_GRAPHQL_UNSAFE_NAME_CHARS } from '../../constants';

/**
 * Provides a query-safe alias for a given string
 */
export const getQuerySafeAlias = (prefix: string, value: string) =>
    `${prefix}${value.replace(REMOVE_NON_INITIAL_GRAPHQL_UNSAFE_NAME_CHARS, '')}`;

/**
 * Query safe alias util, specifically for referenceId
 */
export const getRefIdAlias = getQuerySafeAlias.bind(null, REF_ID_ALIAS_PREFIX);
