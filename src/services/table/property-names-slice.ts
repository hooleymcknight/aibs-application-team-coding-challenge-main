import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import has from 'lodash/has';
import queryString, { ParsedQuery } from 'query-string';
import castArray from 'lodash/castArray';

import { BaseKeyPayload, PrepareReturn } from '../../types';

export type PropertyReferenceIds = {
    [key: string]: string[];
};

const INITIAL_STATE: PropertyReferenceIds = {};

export type SetPropertyReferenceIdsPayload = BaseKeyPayload & {
    properties: string[];
};

const setPropertyReferenceIdsReducer: CaseReducer<
    PropertyReferenceIds,
    PayloadAction<SetPropertyReferenceIdsPayload>
> = (state, action) => {
    const { properties, key } = action.payload;

    return {
        ...state,
        [key]: properties,
    };
};

const setPropertyReferenceIdsPrepare = (
    key: string,
    properties: string[]
): PrepareReturn<SetPropertyReferenceIdsPayload> => ({
    payload: {
        key,
        properties,
    },
});

type InitPropertyReferenceIdsReducer = CaseReducer<PropertyReferenceIds, PayloadAction<SetPropertyReferenceIdsPayload>>;

const initPropertyReferenceIdsReducer: InitPropertyReferenceIdsReducer = (state, action) => {
    const { properties, key } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: properties,
    };
};

const parsePropertiesFromSearch = (config: ParsedQuery, queryName: string, validationSet: Set<string>) => {
    const properties = castArray(config?.[queryName] ?? []);
    return properties?.filter((property) => validationSet.has(property));
};

const initPropertyReferenceIdsPrepare =
    (queryName: string) =>
    (
        key: string,
        search: string,
        allReferenceIdsData: Set<string>,
        viewDefaultOptions: string[]
    ): PrepareReturn<SetPropertyReferenceIdsPayload> => {
        const config = queryString.parse(search, { arrayFormat: 'comma' });
        const urlProperties = parsePropertiesFromSearch(config, queryName, allReferenceIdsData);
        const properties = urlProperties?.length ? urlProperties : viewDefaultOptions;

        return {
            payload: {
                key,
                properties,
            },
        };
    };

export const createPropertyNamesSlice = (name: string, queryName: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setPropertyReferenceIds: {
                reducer: setPropertyReferenceIdsReducer,
                prepare: setPropertyReferenceIdsPrepare,
            },
            initPropertyReferenceIds: {
                reducer: initPropertyReferenceIdsReducer,
                prepare: initPropertyReferenceIdsPrepare(queryName),
            },
        },
    });
