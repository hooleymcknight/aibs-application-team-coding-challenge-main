import { combineReducers } from '@reduxjs/toolkit';
import { errorSlice } from '../error';
import { keySlice } from '../key';
import { filterPropertyReferenceIdsSlice } from '../view-properties/property-names-slices';
import { filterViewSlice } from '../filter-view/filter-view-slice';
import { filterSlice } from '../code-challenge-filter/filter-slice';
import { facetPropertiesSlice } from '../view-properties/facet-properties-slice';
import { filterColumnSyncSlice } from '../filter-column-sync/filter-column-sync-slice';

export const rootReducer = combineReducers({
    key: keySlice.reducer,
    filter: filterSlice.reducer,
    filterView: filterViewSlice.reducer,
    facetProperties: facetPropertiesSlice.reducer,
    filterPropertyReferenceIds: filterPropertyReferenceIdsSlice.reducer,
    filterColumnSync: filterColumnSyncSlice.reducer,
    errors: errorSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
