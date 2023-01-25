import { CaseReducer, createSlice, PayloadAction, PrepareAction } from '@reduxjs/toolkit';
import remove from 'lodash/remove';
import uniqueId from 'lodash/uniqueId';

export interface NonFatalError {
    friendlyMessage: string;
    originalError: Error;
    errorId: string;
}

export interface ErrorState {
    fatalError: null | FatalError;
    nonFatalErrors: NonFatalError[];
}

export interface FatalError {
    error: Error;
    componentStack: string;
}

const initialState: ErrorState = {
    fatalError: null,
    nonFatalErrors: [],
};

type FatalErrorReducer = CaseReducer<ErrorState, PayloadAction<FatalError>>;
const fatalErrorReducer: FatalErrorReducer = (state, { payload }) => {
    state.fatalError = payload;
};

type FatalErrorPrepare = PrepareAction<FatalError>;
const fatalErrorPrepare: FatalErrorPrepare = (error: Error, componentStack: string) => ({
    payload: {
        error,
        componentStack,
    },
});

type NonFatalErrorReducer = CaseReducer<ErrorState, PayloadAction<NonFatalError>>;
const nonFatalErrorReducer: NonFatalErrorReducer = (state, { payload }) => {
    state.nonFatalErrors.push(payload);
};

// NOTE: Below we must submit a plain JS object for the error property.
// https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions
type NonFatalErrorPrepare = PrepareAction<NonFatalError>;
const nonFatalErrorPrepare: NonFatalErrorPrepare = (friendlyMessage: string, error: Error) => ({
    payload: {
        friendlyMessage,
        originalError: { ...error },
        errorId: uniqueId('error_'),
    },
});

type DismissNonFatalErrorReducer = CaseReducer<ErrorState, PayloadAction<string>>;
const dismissNonFatalErrorReducer: DismissNonFatalErrorReducer = (state, { payload }) => {
    remove<NonFatalError>(state.nonFatalErrors, ({ errorId: id }) => id === payload);
};

type DismissNonFatalErrorPrepare = PrepareAction<string>;
const dismissNonFatalErrorPrepare: DismissNonFatalErrorPrepare = (errorId) => ({
    payload: errorId,
});

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        fatalError: {
            reducer: fatalErrorReducer,
            prepare: fatalErrorPrepare,
        },
        nonFatalError: {
            reducer: nonFatalErrorReducer,
            prepare: nonFatalErrorPrepare,
        },
        dismissNonFatalError: {
            reducer: dismissNonFatalErrorReducer,
            prepare: dismissNonFatalErrorPrepare,
        },
    },
});
