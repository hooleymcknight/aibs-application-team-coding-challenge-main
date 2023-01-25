import { SortArgument, SortOrder } from '../../types';
import {
    removeSortPrepare,
    removeSortReducer,
    saveSortPrepare,
    saveSortReducer,
    setSortPrepare,
    setSortReducer,
    SortState,
} from './sort-slice';

const keyA = 'keyA';
const keyB = 'keyB';
const fieldA = 'fieldA';
const fieldB = 'fieldB';
const sortArgumentA = {
    field: fieldA,
    order: SortOrder.ASC,
} as SortArgument;
const sortArgumentB = {
    field: fieldB,
    order: SortOrder.ASC,
} as SortArgument;
const sortArgumentAD = {
    field: fieldA,
    order: SortOrder.DESC,
} as SortArgument;

describe('Sort Slice Test', () => {
    describe('saveSortReducer', () => {
        const state = {
            [keyA]: [],
            [keyB]: [],
        } as SortState;

        test('saves a sort argument to a key', () => {
            const resultA = saveSortReducer(state, {
                ...saveSortPrepare(sortArgumentA, keyA),
                type: 'test',
            }) as SortState;

            expect(resultA).toEqual({
                [keyA]: [sortArgumentA],
                [keyB]: [],
            });

            const resultB = saveSortReducer(resultA, {
                ...saveSortPrepare(sortArgumentB, keyB),
                type: 'test',
            }) as SortState;

            expect(resultB).toEqual({
                [keyA]: [sortArgumentA],
                [keyB]: [sortArgumentB],
            });

            const resultC = saveSortReducer(resultB, {
                ...saveSortPrepare(sortArgumentAD, keyA),
                type: 'test',
            }) as SortState;

            expect(resultC).toEqual({
                [keyA]: [sortArgumentAD],
                [keyB]: [sortArgumentB],
            });

            const resultD = saveSortReducer(resultC, {
                ...saveSortPrepare(sortArgumentA, keyB),
                type: 'test',
            });

            expect(resultD).toEqual({
                [keyA]: [sortArgumentAD],
                [keyB]: [sortArgumentB, sortArgumentA],
            });
        });
    });

    describe('removeSortReducer', () => {
        const state = {
            [keyA]: [sortArgumentA, sortArgumentB],
            [keyB]: [sortArgumentB],
        };

        test('removes a sort argument from a key', () => {
            const result = removeSortReducer(state, {
                ...removeSortPrepare(sortArgumentB, keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [sortArgumentA],
                [keyB]: [sortArgumentB],
            });
        });
    });

    describe('setSortReducer', () => {
        const state = {};

        test('sets a sort argument array for a key', () => {
            const result = setSortReducer(state, {
                ...setSortPrepare([sortArgumentA, sortArgumentB], keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: [sortArgumentA, sortArgumentB],
            });
        });
    });
});
