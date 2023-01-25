import { setLimitPrepare, setLimitReducer, LimitState } from './limit-slice';

const keyA = 'keyA';
const keyB = 'keyB';

describe('Limit Slice Test', () => {
    describe('setLimitReducer', () => {
        const state = {};

        test('sets a limit to a key', () => {
            const resultA = setLimitReducer(state, {
                ...setLimitPrepare(15, keyA),
                type: 'test',
            }) as LimitState;

            expect(resultA).toEqual({
                [keyA]: 15,
            });

            const resultB = setLimitReducer(resultA, {
                ...setLimitPrepare(25, keyB),
                type: 'test',
            });

            expect(resultB).toEqual({
                [keyA]: 15,
                [keyB]: 25,
            });
        });
    });
});
