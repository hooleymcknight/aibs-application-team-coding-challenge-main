import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import has from 'lodash/has';
import { DEFAULT_TABLE_FILTER_HEIGHT } from '../../constants';

import { BaseKeyPayload, PrepareReturn } from '../../types';

export type filterViewState = {
    [key: string]: {
        isOpen: boolean;
        height: number;
    };
};

const INITIAL_STATE: filterViewState = {};

interface filterIsOpenPayload extends BaseKeyPayload {
    isOpen: boolean;
}

interface filterHeightPayload extends BaseKeyPayload {
    height: number;
}

type SetFilterIsOpenReducer = CaseReducer<filterViewState, PayloadAction<filterIsOpenPayload>>;
export const setFilterIsOpenReducer: SetFilterIsOpenReducer = (state, action) => {
    const { isOpen, key } = action.payload;
    const previousState = state[key];

    return {
        ...state,
        [key]: {
            ...previousState,
            isOpen,
        },
    };
};

type InitializeFilterViewReducer = CaseReducer<filterViewState, PayloadAction<filterIsOpenPayload>>;
export const initializeFilterViewReducer: InitializeFilterViewReducer = (state, action) => {
    const { key, isOpen } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: {
            isOpen,
            height: DEFAULT_TABLE_FILTER_HEIGHT,
        },
    };
};

export const filterViewPrepare = (key: string, isOpen: boolean): PrepareReturn<filterIsOpenPayload> => ({
    payload: {
        key,
        isOpen,
    },
});

type SetFilterHeightReducer = CaseReducer<filterViewState, PayloadAction<filterHeightPayload>>;
export const setFilterHeightReducer: SetFilterHeightReducer = (state, action) => {
    const { height, key } = action.payload;
    const previousState = state[key];

    return {
        ...state,
        [key]: {
            ...previousState,
            height,
        },
    };
};

export const filterHeightPrepare = (key: string, height: number): PrepareReturn<filterHeightPayload> => ({
    payload: {
        key,
        height,
    },
});

export const createFilterViewSlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setFilterIsOpen: {
                reducer: setFilterIsOpenReducer,
                prepare: filterViewPrepare,
            },
            setFilterHeight: {
                reducer: setFilterHeightReducer,
                prepare: filterHeightPrepare,
            },
            initializeFilterView: {
                reducer: initializeFilterViewReducer,
                prepare: filterViewPrepare,
            },
        },
    });
