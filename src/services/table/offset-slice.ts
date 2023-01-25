import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import has from 'lodash/has';

import { BaseKeyPayload, PrepareReturn } from '../../types';
import { parseOffsetFromSearch } from '../../utils';

export type OffsetState = {
    [key: string]: number;
};

export const INITIAL_OFFSET = 0;
const INITIAL_STATE: OffsetState = {};

type OffsetPayload = BaseKeyPayload & {
    offset: number;
};

type SetOffsetReducer = CaseReducer<OffsetState, PayloadAction<OffsetPayload>>;
export const setOffsetReducer: SetOffsetReducer = (state, action) => {
    const { offset, key } = action.payload;
    return {
        ...state,
        [key]: offset,
    };
};

export const setOffsetPrepare = (offset: number, key: string): PrepareReturn<OffsetPayload> => ({
    payload: {
        offset,
        key,
    },
});

type ResetOffsetReducer = CaseReducer<OffsetState, PayloadAction<BaseKeyPayload>>;
export const resetOffsetReducer: ResetOffsetReducer = (state, action) => {
    const { key } = action.payload;
    return {
        ...state,
        [key]: INITIAL_OFFSET,
    };
};

export const resetOffsetPrepare = (key: string): PrepareReturn<BaseKeyPayload> => ({
    payload: {
        key,
    },
});

type InitializeOffsetReducer = CaseReducer<OffsetState, PayloadAction<OffsetPayload>>;
export const initializeOffsetReducer: InitializeOffsetReducer = (state, action) => {
    const { key, offset } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: offset,
    };
};

const initializeOffsetPrepare = (key: string, search: string): PrepareReturn<OffsetPayload> => {
    const offset = parseOffsetFromSearch(search, INITIAL_OFFSET);

    return {
        payload: {
            key,
            offset,
        },
    };
};

type OffsetExtraReducers = {
    [actionName: string]: ResetOffsetReducer;
};

export const createOffsetSlice = (name: string, resetReducers: string[]) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setOffset: {
                reducer: setOffsetReducer,
                prepare: setOffsetPrepare,
            },
            resetOffset: {
                reducer: resetOffsetReducer,
                prepare: resetOffsetPrepare,
            },
            initializeOffset: {
                reducer: initializeOffsetReducer,
                prepare: initializeOffsetPrepare,
            },
        },
        extraReducers: resetReducers.reduce((acc, next) => {
            acc[next] = resetOffsetReducer;
            return acc;
        }, {} as OffsetExtraReducers),
    });
