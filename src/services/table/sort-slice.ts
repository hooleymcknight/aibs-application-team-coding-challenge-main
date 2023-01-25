import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import findIndex from 'lodash/findIndex';
import has from 'lodash/has';
import castArray from 'lodash/castArray';
import queryString from 'query-string';

import { BaseKeyPayload, PrepareReturn, SortArgument, SortOrder } from '../../types';
import { SORT_QUERY_DELIMITER } from '../../constants';

export type SortState = {
    [key: string]: SortArgument[];
};

const INITIAL_STATE: SortState = {};

type SortPayload = BaseKeyPayload & {
    sortArgument: SortArgument;
};

type SetSortPayload = BaseKeyPayload & {
    sortArguments: SortArgument[];
};

const commonSortPrepare = (sortArgument: SortArgument, key: string): PrepareReturn<SortPayload> => ({
    payload: {
        sortArgument,
        key,
    },
});

type SaveSortReducer = CaseReducer<SortState, PayloadAction<SortPayload>>;
export const saveSortReducer: SaveSortReducer = (state, action) => {
    const { sortArgument, key } = action.payload;
    const keyState = state[key];

    const updateSortArgumentIndex = findIndex(keyState, ({ field }) => field === sortArgument.field);

    if (updateSortArgumentIndex >= 0) {
        keyState[updateSortArgumentIndex] = sortArgument;
    } else {
        keyState.push(sortArgument);
    }

    return state;
};

export const saveSortPrepare = commonSortPrepare;

type RemoveSortReducer = CaseReducer<SortState, PayloadAction<SortPayload>>;
export const removeSortReducer: RemoveSortReducer = (state, action) => {
    const { sortArgument, key } = action.payload;
    const keyState = state[key];

    return {
        ...state,
        [key]: keyState.filter(({ field }) => field !== sortArgument.field),
    };
};

export const removeSortPrepare = commonSortPrepare;

type SetSortReducer = CaseReducer<SortState, PayloadAction<SetSortPayload>>;
export const setSortReducer: SetSortReducer = (state, action) => {
    const { sortArguments, key } = action.payload;

    return {
        ...state,
        [key]: sortArguments,
    };
};

export const setSortPrepare = (sortArguments: SortArgument[], key: string): PrepareReturn<SetSortPayload> => ({
    payload: {
        sortArguments,
        key,
    },
});

type InitializeSortReducer = CaseReducer<SortState, PayloadAction<SetSortPayload>>;
export const initializeSortReducer: InitializeSortReducer = (state, action) => {
    const { key, sortArguments } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: sortArguments,
    };
};

export const initializeSortPrepare = (
    key: string,
    search: string,
    defaultSort: SortArgument[]
): PrepareReturn<SetSortPayload> => {
    const config = queryString.parse(search, { arrayFormat: 'comma' });
    const unparsedSort = castArray(config?.sort ?? []);
    const parsedSort = unparsedSort.map<SortArgument>((sortSearch) => {
        const [field, sortOrder] = sortSearch.split(SORT_QUERY_DELIMITER);
        const order = sortOrder as SortOrder;

        return {
            field,
            order,
        };
    });

    const sortArguments = parsedSort.length ? parsedSort : defaultSort;

    return {
        payload: {
            key,
            sortArguments,
        },
    };
};

export const createSortSlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            saveSort: {
                reducer: saveSortReducer,
                prepare: saveSortPrepare,
            },
            removeSort: {
                reducer: removeSortReducer,
                prepare: removeSortPrepare,
            },
            setSort: {
                reducer: setSortReducer,
                prepare: setSortPrepare,
            },
            initializeSort: {
                reducer: initializeSortReducer,
                prepare: initializeSortPrepare,
            },
        },
    });
