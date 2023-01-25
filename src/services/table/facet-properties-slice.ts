import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrepareReturn, TableFacetProperty } from '../../types';

export interface FacetPropertyState {
    [key: string]: TableFacetProperty[];
}

export interface FacetPropertyPayload {
    facetProperties: TableFacetProperty[];
    key: string;
}

const INITIAL_STATE: FacetPropertyState = {};

const setFacetPropertiesPrepare = (
    key: string,
    facetProperties: TableFacetProperty[]
): PrepareReturn<FacetPropertyPayload> => ({
    payload: {
        facetProperties,
        key,
    },
});

type SetFacetPropertiesReducer = CaseReducer<FacetPropertyState, PayloadAction<FacetPropertyPayload>>;
const setFacetPropertiesReducer: SetFacetPropertiesReducer = (state, action) => {
    const { facetProperties, key } = action.payload;

    return {
        ...state,
        [key]: facetProperties,
    };
};

export const createFacetPropertiesSlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            setFacetProperties: {
                reducer: setFacetPropertiesReducer,
                prepare: setFacetPropertiesPrepare,
            },
        },
    });
