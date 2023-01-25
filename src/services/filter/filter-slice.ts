import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import has from 'lodash/has';
import castArray from 'lodash/castArray';
import queryString from 'query-string';
import uniqBy from 'lodash/uniqBy';

import { BaseKeyPayload, FilterArgument, Operator, PrepareReturn } from '../../types';
import {
    FILTER_ARGUMENT_QUERY_DELIMITER,
    FILTER_FIELD_QUERY_DELIMITER,
    PROJECT_REFERENCE_IDS,
    QUERYSTRING_COMMA_REPLACER,
} from '../../constants';
import { createProjectFilter } from '../../utils';
import { filterPropertyReferenceIdsSlice } from '../view-properties';
import { SetPropertyReferenceIdsPayload } from '../table/property-names-slice';

export type FilterState = {
    [key: string]: FilterArgument[];
};

const INITIAL_STATE: FilterState = {};
const MANDATORY_FIELDS = [PROJECT_REFERENCE_IDS];

export type FiltersPayload = BaseKeyPayload & {
    filterArguments: FilterArgument[];
};

const commonFilterPrepare = (filterArgument: FilterArgument, key: string): PrepareReturn<FiltersPayload> => ({
    payload: {
        filterArguments: [filterArgument],
        key,
    },
});

const commonFiltersPrepare = (filterArguments: FilterArgument[], key: string): PrepareReturn<FiltersPayload> => ({
    payload: {
        filterArguments,
        key,
    },
});

type AppendFiltersReducer = CaseReducer<FilterState, PayloadAction<FiltersPayload>>;
export const appendFiltersReducer: AppendFiltersReducer = (state, action) => {
    const { filterArguments, key } = action.payload;
    const keyState = state[key];

    return {
        ...state,
        [key]: sortBy([...keyState, ...filterArguments], ['field', 'value']),
    };
};

export const appendFilterPrepare = commonFilterPrepare;

export const appendFiltersPrepare = commonFiltersPrepare;

type RemoveFiltersReducer = CaseReducer<FilterState, PayloadAction<FiltersPayload>>;
export const removeFiltersReducer: RemoveFiltersReducer = (state, action) => {
    const { filterArguments, key } = action.payload;
    const keyState = state[key];

    const filterArgumentValues = filterArguments.map((fa) => fa.value);

    return {
        ...state,
        [key]: keyState.filter(({ value }) => !filterArgumentValues.includes(value)),
    };
};

export const removeFilterPrepare = commonFilterPrepare;
export const removeFiltersPrepare = commonFiltersPrepare;

export type ClearFieldFilterPayload = BaseKeyPayload & { clearField: string };

type ClearFieldFilterReducer = CaseReducer<FilterState, PayloadAction<ClearFieldFilterPayload>>;
export const clearFieldFilterReducer: ClearFieldFilterReducer = (state, action) => {
    const { clearField, key } = action.payload;
    const keyState = state[key];
    return {
        ...state,
        [key]: keyState.filter(({ field }) => field !== clearField),
    };
};

export const clearFieldFilterPrepare = (clearField: string, key: string): PrepareReturn<ClearFieldFilterPayload> => ({
    payload: {
        key,
        clearField,
    },
});

type ClearFilterReducer = CaseReducer<FilterState, PayloadAction<BaseKeyPayload>>;
export const clearFilterReducer: ClearFilterReducer = (state, action) => {
    const { key } = action.payload;
    return {
        ...state,
        [key]: [],
    };
};

export const clearFilterPrepare = (key: string): PrepareReturn<BaseKeyPayload> => ({
    payload: {
        key,
    },
});

export const appendProjectFilter = (projectReferenceId: string, filter: FilterArgument[]) =>
    // Unique by hash de-dupes array since using a set won't catch object reference dupes
    uniqBy<FilterArgument>(
        [...filter, createProjectFilter(projectReferenceId)],
        ({ field, operator, value }) => `${field}:${operator}:${value}`
    );

export type SetFilterPayload = BaseKeyPayload & {
    filter: FilterArgument[];
};
type SetFilterReducer = CaseReducer<FilterState, PayloadAction<SetFilterPayload>>;
export const setFilterReducer: SetFilterReducer = (state, action) => {
    const { key, filter } = action.payload;
    return {
        ...state,
        [key]: filter,
    };
};

export const setFilterPrepare = (filterArguments: FilterArgument[], key: string): PrepareReturn<SetFilterPayload> => ({
    payload: {
        filter: appendProjectFilter(key, filterArguments),
        key,
    },
});

export type SetFieldFilterPayload = BaseKeyPayload & {
    filterField: string;
    filter: FilterArgument[];
};
type SetFieldFilterReducer = CaseReducer<FilterState, PayloadAction<SetFieldFilterPayload>>;

export const setFieldFilterReducer: SetFieldFilterReducer = (state, action) => {
    const { key, filter, filterField } = action.payload;
    const currentKeyState = state[key];
    const reducedFilter = currentKeyState.filter((item) => item.field !== filterField);
    const nextFilter = [...reducedFilter, ...filter];

    return {
        ...state,
        [key]: nextFilter,
    };
};

export const setFieldFilterPrepare = (
    filterField: string,
    filterArguments: FilterArgument[],
    key: string
): PrepareReturn<SetFieldFilterPayload> => ({
    payload: {
        filterField,
        filter: filterArguments,
        key,
    },
});

type InitializeFilterReducer = CaseReducer<FilterState, PayloadAction<SetFilterPayload>>;
export const initializeFilterReducer: InitializeFilterReducer = (state, action) => {
    const { key, filter } = action.payload;

    if (has(state, key)) {
        return state;
    }

    return {
        ...state,
        [key]: filter || [],
    };
};

export const initializeFilterPrepare = (
    key: string,
    search: string,
    defaultFilter: FilterArgument[]
): PrepareReturn<SetFilterPayload> => {
    const config = queryString.parse(search, { arrayFormat: 'comma' });
    const unparsedFilterFields = Object.keys(config).filter(
        (configKey) => configKey.split(FILTER_FIELD_QUERY_DELIMITER)[0] === 'filter'
    );
    const filterArguments = unparsedFilterFields.reduce<FilterArgument[]>((acc, fieldKey) => {
        const [, field] = fieldKey.split(FILTER_FIELD_QUERY_DELIMITER);
        const parsedFilterArgs = castArray(config[fieldKey]).map<FilterArgument>((partialFilter) => {
            const [filterOperator, preValue] = partialFilter.split(FILTER_ARGUMENT_QUERY_DELIMITER);
            const value = preValue.replace(QUERYSTRING_COMMA_REPLACER, ',');
            const operator = filterOperator as Operator;
            return {
                field,
                operator,
                value,
            };
        });
        return [...acc, ...parsedFilterArgs];
    }, []);

    return {
        payload: {
            key,
            filter: appendProjectFilter(key, filterArguments.length ? filterArguments : defaultFilter),
        },
    };
};

type OnPropertySet = CaseReducer<FilterState, PayloadAction<SetPropertyReferenceIdsPayload>>;
export const onPropertySet: OnPropertySet = (state, { payload }) => {
    const { properties, key } = payload;

    const newState = state[key]?.filter(({ field }) => properties.includes(field) || MANDATORY_FIELDS.includes(field));

    return {
        ...state,
        [key]: newState,
    };
};

export const createFilterSlice = (name: string) =>
    createSlice({
        name,
        initialState: INITIAL_STATE,
        reducers: {
            appendFilter: {
                reducer: appendFiltersReducer,
                prepare: appendFilterPrepare,
            },
            appendFilters: {
                reducer: appendFiltersReducer,
                prepare: appendFiltersPrepare,
            },
            removeFilter: {
                reducer: removeFiltersReducer,
                prepare: removeFilterPrepare,
            },
            removeFilters: {
                reducer: removeFiltersReducer,
                prepare: removeFiltersPrepare,
            },
            clearFieldFilter: {
                reducer: clearFieldFilterReducer,
                prepare: clearFieldFilterPrepare,
            },
            clearFilter: {
                reducer: clearFilterReducer,
                prepare: clearFilterPrepare,
            },
            setFieldFilter: {
                reducer: setFieldFilterReducer,
                prepare: setFieldFilterPrepare,
            },
            setFilter: {
                reducer: setFilterReducer,
                prepare: setFilterPrepare,
            },
            initializeFilter: {
                reducer: initializeFilterReducer,
                prepare: initializeFilterPrepare,
            },
        },
        extraReducers: {
            [filterPropertyReferenceIdsSlice.actions.setPropertyReferenceIds.type]: onPropertySet,
        },
    });
