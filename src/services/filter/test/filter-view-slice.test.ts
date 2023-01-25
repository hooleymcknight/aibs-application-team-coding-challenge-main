import { DEFAULT_TABLE_FILTER_HEIGHT } from '../../../constants';
import {
    filterViewState,
    setFilterIsOpenReducer,
    initializeFilterViewReducer,
    filterViewPrepare,
    setFilterHeightReducer,
    filterHeightPrepare,
} from '../filter-view-slice';

const keyA = 'keyA';

const filterViewStateArgument: filterViewState = {
    [keyA]: {
        isOpen: true,
        height: 10,
    },
};

const filterViewStateDefaultHeight: filterViewState = {
    [keyA]: {
        isOpen: true,
        height: DEFAULT_TABLE_FILTER_HEIGHT,
    },
};

const filterViewStateChangedHeight: filterViewState = {
    [keyA]: {
        isOpen: false,
        height: 20,
    },
};

describe(' Filter View Slice Test', () => {
    describe('setFilterIsOpenReducer', () => {
        const state = {
            [keyA]: {
                isOpen: false,
                height: 10,
            },
        } as filterViewState;

        test('sets isOpen state', () => {
            const resultA = setFilterIsOpenReducer(state, {
                ...filterViewPrepare(keyA, true),
                type: 'test',
            }) as filterViewState;

            expect(resultA).toEqual(filterViewStateArgument);
        });
    });

    describe('initializeFilterViewReducer', () => {
        const state = {
            [keyA]: {
                isOpen: false,
                height: 10,
            },
        } as filterViewState;

        test('if state and key properties are present return existing state', () => {
            const result = initializeFilterViewReducer(state, {
                ...filterViewPrepare(keyA, true),
                type: 'test',
            });

            expect(result).toEqual(state);
        });

        test('initializes state with isOpen and default height if state is empty object', () => {
            const result = initializeFilterViewReducer(
                {},
                {
                    ...filterViewPrepare(keyA, true),
                    type: 'test',
                }
            );

            expect(result).toEqual(filterViewStateDefaultHeight);
        });
    });

    describe('setFilterHeightReducer', () => {
        const state = {
            [keyA]: {
                isOpen: false,
                height: 10,
            },
        } as filterViewState;

        test('sets a new value for height property of state', () => {
            const result = setFilterHeightReducer(state, {
                ...filterHeightPrepare(keyA, 20),
                type: 'test',
            });

            expect(result).toEqual(filterViewStateChangedHeight);
        });
    });
});
