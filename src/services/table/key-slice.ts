import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { BaseKeyPayload, PrepareReturn } from '../../types';

const INITIAL_STATE = '';

type SetKeyReducer = CaseReducer<string, PayloadAction<BaseKeyPayload>>;
export const setKeyReducer: SetKeyReducer = (state, action) => {
    const { key } = action.payload;
    return key;
};

export const setKeyPrepare = (key: string): PrepareReturn<BaseKeyPayload> => ({
    payload: {
        key,
    },
});

export const createKeySlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setKey: {
                reducer: setKeyReducer,
                prepare: setKeyPrepare,
            },
        },
    });
