import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import has from 'lodash/has';

import { BaseKeyPayload, PrepareReturn } from '../../types';
import { parseLimitFromSearch } from '../../utils';

export type LimitState = {
    [key: string]: number;
};

export const INITIAL_LIMIT = 50;
const INITIAL_STATE: LimitState = {};

type LimitPayload = BaseKeyPayload & {
    limit: number;
};

type SetLimitReducer = CaseReducer<LimitState, PayloadAction<LimitPayload>>;
export const setLimitReducer: SetLimitReducer = (state, action) => {
    const { limit, key } = action.payload;
    return {
        ...state,
        [key]: limit,
    };
};

export const setLimitPrepare = (limit: number, key: string): PrepareReturn<LimitPayload> => ({
    payload: {
        limit,
        key,
    },
});

type InitializeLimitReducer = CaseReducer<LimitState, PayloadAction<LimitPayload>>;
const initializeLimitReducer: InitializeLimitReducer = (state, action) => {
    const { key, limit } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: limit,
    };
};

const initializeLimitPrepare = (key: string, search: string): PrepareReturn<LimitPayload> => {
    const limit = parseLimitFromSearch(search, INITIAL_LIMIT);

    return {
        payload: {
            key,
            limit,
        },
    };
};

export const createLimitSlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setLimit: {
                reducer: setLimitReducer,
                prepare: setLimitPrepare,
            },
            initializeLimit: {
                reducer: initializeLimitReducer,
                prepare: initializeLimitPrepare,
            },
        },
    });
