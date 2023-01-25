/* eslint-disable max-len */
import { ApolloClient, HttpLink, ApolloLink, NormalizedCacheObject, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Dispatch } from '@reduxjs/toolkit';
import xor from 'lodash/xor';
import { FETCH_ERROR_MESSAGE } from '../../constants';
import { donorTableDataCacheKey } from '../../utils/strings';
import { errorSlice } from '../error';

/**
 * Adapted from https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
 */
export const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
        const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);
        operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation);
});

const getFeatureTypesFromKeys = (key: string) => {
    // Substring between square brackets and Remove all double quotes around featureTypes
    const match = key.match(/\[(.*?)\]/);

    // If no matches are found, there are no feature types
    if (match === null) {
        return [];
    }

    const featureTypeSubString = match[1].replace(/"/g, '');
    return featureTypeSubString.split(',') || [];
};

export const bkpServerClient = (dispatch: Dispatch) =>
    new ApolloClient<NormalizedCacheObject>({
        link: ApolloLink.from([
            cleanTypeName,
            onError(({ graphQLErrors, networkError }) => {
                dispatch(errorSlice.actions.nonFatalError(FETCH_ERROR_MESSAGE, graphQLErrors));
                if (graphQLErrors) {
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        // eslint-disable-next-line no-console
                        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                    );
                }
                // eslint-disable-next-line no-console
                if (networkError) console.error(`[Network error]: ${networkError}`);
            }),
            new HttpLink({
                uri: process.env.BKP_URL || 'http://localhost:4000/graphql',
                credentials: 'same-origin',
            }),
        ]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        aio_specimen: {
                            // TODO: Examine if merge having a default is even doing anything, since the linter
                            //       is not too happy about it being this way
                            // eslint-disable-next-line default-param-last
                            merge(
                                existing = [],
                                incoming,
                                {
                                    storeFieldName,
                                    args: { limit = 0, offset = 0, filter = [], sort = [] },
                                    variables: { featureTypes: incomingFeatureTypes, imageRefIds: incomingImageRefIds },
                                }
                            ) {
                                const donorTableDataMatchName = donorTableDataCacheKey(filter, sort);
                                const isSupported = storeFieldName === donorTableDataMatchName;
                                const existingLen = existing.length;

                                // If featureTypes properties have changed, invalidate the cache.
                                if (existingLen) {
                                    const existingFeatureTypesKey: string =
                                        Object.keys(existing[0]).find((key: string) => key.includes('featureTypes')) ||
                                        '';
                                    const existingFeatureTypes: string[] =
                                        getFeatureTypesFromKeys(existingFeatureTypesKey);
                                    const haveFeaturesTypesChanged = Boolean(
                                        xor(existingFeatureTypes, incomingFeatureTypes).length
                                    );

                                    const existingImageFeatureTypesKey: string =
                                        Object.keys(existing[0]).find(
                                            (key: string) => key.includes('images') && key.includes('featureTypes')
                                        ) || '';
                                    const existingImageFeatureTypes: string[] =
                                        getFeatureTypesFromKeys(existingImageFeatureTypesKey);
                                    const haveImageFeaturesTypesChanged = Boolean(
                                        xor(existingImageFeatureTypes, incomingImageRefIds).length
                                    );

                                    if (haveFeaturesTypesChanged || haveImageFeaturesTypesChanged) {
                                        return incoming;
                                    }
                                }

                                if (!isSupported) {
                                    return incoming;
                                }

                                const isConsecutive = offset < existingLen;
                                if (isConsecutive) {
                                    return [
                                        ...existing.slice(0, offset),
                                        ...incoming,
                                        ...existing.slice(offset + limit, existingLen),
                                    ];
                                }

                                return [...existing, ...Array(offset - existingLen).fill(null), ...incoming];
                            },
                        },
                    },
                },
            },
        }),
    });
