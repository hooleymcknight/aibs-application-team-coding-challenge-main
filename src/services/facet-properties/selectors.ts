import { createSelector } from 'reselect';
import { selectKey } from '../key';
import { RootState } from '../redux';

const selectFacetPropertiesStates = (state: RootState) => state.facetProperties;

export const selectFacetPropertiesState = createSelector(
    [selectKey, selectFacetPropertiesStates],
    (key, facetedPropertiesLookup) => facetedPropertiesLookup[key]
);
