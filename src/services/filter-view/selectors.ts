import { createSelector } from 'reselect';
import { selectKey } from '../key';

import { RootState } from '../redux';

const selectFilterViewState = (state: RootState) => state.filterView;

export const selectFilterView = createSelector(
    [selectKey, selectFilterViewState],
    (key, filterViewState) => filterViewState[key]
);
