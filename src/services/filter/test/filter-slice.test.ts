import { FilterArgument, Operator } from '../../../types';
import {
    FilterState,
    appendFilterPrepare,
    removeFilterPrepare,
    clearFieldFilterReducer,
    clearFieldFilterPrepare,
    clearFilterReducer,
    clearFilterPrepare,
    setFilterReducer,
    setFilterPrepare,
    appendFiltersReducer,
    removeFiltersReducer,
    appendFiltersPrepare,
    removeFiltersPrepare,
    setFieldFilterReducer,
    setFieldFilterPrepare,
    initializeFilterReducer,
    initializeFilterPrepare,
} from '../filter-slice';

const keyA = 'keyA';
const keyB = 'keyB';
const mockReferenceId = keyA;
const fieldA = 'fieldA';
const fieldB = 'fieldB';
const valueA = 'valueA';
const valueB = 'valueB';
const filterArgumentAA: FilterArgument = {
    field: fieldA,
    operator: Operator.CONTAINS,
    value: valueA,
};
const filterArgumentAB: FilterArgument = {
    field: fieldA,
    operator: Operator.CONTAINS,
    value: valueB,
};
const filterArgumentBA: FilterArgument = {
    field: fieldB,
    operator: Operator.CONTAINS,
    value: valueA,
};
const filterArgumentBB: FilterArgument = {
    field: fieldB,
    operator: Operator.CONTAINS,
    value: valueB,
};
const filterArgumentProjectReferenceId: FilterArgument = {
    field: 'projectReferenceIds',
    operator: Operator.CONTAINS,
    value: mockReferenceId,
};

describe(' Filter Slice Test', () => {
    describe('appendFiltersReducer', () => {
        const state = {
            [keyA]: [],
            [keyB]: [filterArgumentBA],
        } as FilterState;

        test('appends a filter argument to a key', () => {
            const resultA = appendFiltersReducer(state, {
                ...appendFilterPrepare(filterArgumentAA, keyA),
                type: 'test',
            }) as FilterState;

            expect(resultA).toEqual({
                [keyA]: [filterArgumentAA],
                [keyB]: [filterArgumentBA],
            });

            const resultB = appendFiltersReducer(resultA, {
                ...appendFilterPrepare(filterArgumentBB, keyB),
                type: 'test',
            });

            expect(resultB).toEqual({
                [keyA]: [filterArgumentAA],
                [keyB]: [filterArgumentBA, filterArgumentBB],
            });
        });

        test('appends multiple filter arguments to a  key', () => {
            const resultA = appendFiltersReducer(state, {
                ...appendFiltersPrepare([filterArgumentAA, filterArgumentBA], keyA),
                type: 'test',
            }) as FilterState;

            expect(resultA).toEqual({
                [keyA]: [filterArgumentAA, filterArgumentBA],
                [keyB]: [filterArgumentBA],
            });
        });
    });

    describe('removeFiltersReducer', () => {
        const state = {
            [keyA]: [filterArgumentAA, filterArgumentAB],
            [keyB]: [filterArgumentBA],
        } as FilterState;

        test('removes a filter argument from a  key', () => {
            const result = removeFiltersReducer(state, {
                ...removeFilterPrepare(filterArgumentAA, keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [filterArgumentAB],
                [keyB]: [filterArgumentBA],
            });
        });

        test('removes multiple filter arguments from a  key', () => {
            const result = removeFiltersReducer(state, {
                ...removeFiltersPrepare([filterArgumentAA, filterArgumentAB], keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [],
                [keyB]: [filterArgumentBA],
            });
        });
    });

    describe('clearFieldFilterReducer', () => {
        const state = {
            [keyA]: [filterArgumentAB, filterArgumentAA, filterArgumentBA, filterArgumentBB],
            [keyB]: [filterArgumentBA],
        } as FilterState;

        test('clears a filter field from a  key', () => {
            const result = clearFieldFilterReducer(state, {
                ...clearFieldFilterPrepare(fieldB, keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [filterArgumentAB, filterArgumentAA],
                [keyB]: [filterArgumentBA],
            });
        });
    });

    describe('clearFilterReducer', () => {
        const state = {
            [keyA]: [filterArgumentAA, filterArgumentAB],
            [keyB]: [filterArgumentBB],
        } as FilterState;

        test('clears a filter for a  key', () => {
            const result = clearFilterReducer(state, {
                ...clearFilterPrepare(keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [],
                [keyB]: [filterArgumentBB],
            });
        });
    });

    describe('setFilterReducer', () => {
        const state = {} as FilterState;
        const filterArguments = [filterArgumentAA, filterArgumentAB, filterArgumentProjectReferenceId];
        test('sets a filter for a  key from a querystring', () => {
            const result = setFilterReducer(state, {
                ...setFilterPrepare(filterArguments, keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: filterArguments,
            });
        });
    });
    describe('setFieldFilterReducer', () => {
        const state = {
            [keyA]: [filterArgumentAA, filterArgumentAB],
        } as FilterState;
        const filterArguments = [filterArgumentAA, filterArgumentAB, filterArgumentBB];
        test('sets filter item state with field not matching existing filters', () => {
            const result = setFieldFilterReducer(state, {
                ...setFieldFilterPrepare(fieldB, [filterArgumentBB], keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: filterArguments,
            });
        });
        test('sets filter item state with field matching existing filters', () => {
            const result = setFieldFilterReducer(state, {
                ...setFieldFilterPrepare(fieldA, [filterArgumentBB], keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [filterArgumentBB],
            });
        });
    });
    describe('initializeFilterReducer', () => {
        test('returns existing state if state and key are present', () => {
            const state = {
                [keyA]: [filterArgumentAA, filterArgumentAB],
            } as FilterState;

            const result = initializeFilterReducer(state, {
                ...initializeFilterPrepare(keyA, fieldA, [filterArgumentBB]),
                type: 'test',
            });

            expect(result).toEqual(state);
        });
        test('returns state with new key/filter property if state has not been initialized', () => {
            const state = {};
            const result = initializeFilterReducer(state, {
                ...initializeFilterPrepare(keyA, fieldA, [filterArgumentBB]),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [filterArgumentBB, filterArgumentProjectReferenceId],
            });
        });
    });
});
