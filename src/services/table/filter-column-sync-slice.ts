import has from 'lodash/has';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrepareReturn } from '../../types';

export interface FilterColumnSyncState {
    [key: string]: boolean;
}

export interface FilterColumnSyncPayload {
    key: string;
    synced: boolean;
}

const INITIAL_STATE: FilterColumnSyncState = {};

type InitFilterColumnSyncReducer = CaseReducer<FilterColumnSyncState, PayloadAction<FilterColumnSyncPayload>>;

const initFilterColumnSyncPrepare =
    (synced: boolean) =>
    (key: string): PrepareReturn<FilterColumnSyncPayload> => ({
        payload: {
            key,
            synced,
        },
    });

const initFilterColumnSyncReducer: InitFilterColumnSyncReducer = (state, action) => {
    const { key, synced } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: synced,
    };
};

const setFilterColumnSyncPrepare = (key: string, synced: boolean): PrepareReturn<FilterColumnSyncPayload> => ({
    payload: {
        key,
        synced,
    },
});

type SetFilterColumnSyncReducer = CaseReducer<FilterColumnSyncState, PayloadAction<FilterColumnSyncPayload>>;
const setFilterColumnSyncReducer: SetFilterColumnSyncReducer = (state, action) => {
    const { key, synced } = action.payload;

    return {
        ...state,
        [key]: synced,
    };
};

export const createFilterColumnSyncSlice = (name: string, initialSyncState: boolean) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            initFilterColumnSync: {
                reducer: initFilterColumnSyncReducer,
                prepare: initFilterColumnSyncPrepare(initialSyncState),
            },
            setFilterColumnSync: {
                reducer: setFilterColumnSyncReducer,
                prepare: setFilterColumnSyncPrepare,
            },
        },
    });
