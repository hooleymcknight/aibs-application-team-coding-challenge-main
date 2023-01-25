import {
    setOffsetReducer,
    setOffsetPrepare,
    resetOffsetReducer,
    resetOffsetPrepare,
    OffsetState,
    INITIAL_OFFSET,
} from './offset-slice';

const keyA = 'keyA';
const keyB = 'keyB';

describe('Offset Slice Test', () => {
    describe('setOffsetReducer', () => {
        const state = {};

        test('sets an offset to a key', () => {
            const resultA = setOffsetReducer(state, {
                ...setOffsetPrepare(15, keyA),
                type: 'test',
            }) as OffsetState;

            expect(resultA).toEqual({
                [keyA]: 15,
            });

            const resultB = setOffsetReducer(resultA, {
                ...setOffsetPrepare(25, keyB),
                type: 'test',
            });

            expect(resultB).toEqual({
                [keyA]: 15,
                [keyB]: 25,
            });
        });
    });

    describe('resetOffsetReducer', () => {
        const state = {};

        test('resets offset to an initial value for a key', () => {
            const result = resetOffsetReducer(state, {
                ...resetOffsetPrepare(keyA),
                type: 'test',
            });

            expect(result).toEqual({
                [keyA]: INITIAL_OFFSET,
            });
        });
    });
});
