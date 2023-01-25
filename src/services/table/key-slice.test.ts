import { setKeyReducer, setKeyPrepare } from './key-slice';

const keyA = 'keyA';
const keyB = 'keyB';

describe('Key Slice Test', () => {
    describe('setKeyReducer', () => {
        const state = '';

        test('sets an initial key', () => {
            const keyResult = setKeyReducer(state, {
                ...setKeyPrepare(keyA),
                type: 'test',
            });

            expect(keyResult).toEqual(keyA);
        });
        test('switches keys', () => {
            const initialState = keyA;
            const keyResult = setKeyReducer(initialState, {
                ...setKeyPrepare(keyB),
                type: 'test',
            });

            expect(keyResult).toEqual(keyB);
        });
    });
});
