import { createSelector } from 'reselect';
import { RootState } from '../redux';
import { FilterColumnSyncState } from '../table/filter-column-sync-slice';
import { selectKey } from '../key';

const selectFilterColumnSyncState = (state: RootState): FilterColumnSyncState => state.filterColumnSync;

// initial state will not have a key but will have [""] property
// if no key is present than use initial state value
export const selectTableSyncState = createSelector(
    [selectKey, selectFilterColumnSyncState],
    (key, filterColumnSyncState) => {
        const tableSyncState =
            filterColumnSyncState[key] === undefined ? filterColumnSyncState[''] : filterColumnSyncState[key];
        return tableSyncState;
    }
);
