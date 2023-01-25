import { createSelector } from 'reselect';
import { RootState } from '../redux';
import { FeatureType, TableFacetProperty } from '../../types';
import { PropertyReferenceIds } from '../table/property-names-slice';
import { selectKey } from '../key/selectors';
import { selectFacetPropertiesState } from '../facet-properties';

const selectFilterPropertyReferenceIdsState = (state: RootState): PropertyReferenceIds =>
    state.filterPropertyReferenceIds;

export const selectFilterPropertyReferenceIds = createSelector(
    [selectKey, selectFilterPropertyReferenceIdsState],
    (key, filterColumnsState) => filterColumnsState[key]
);

export const selectFilterPropertyReferenceIdsQueryOption = createSelector(
    [selectFilterPropertyReferenceIds],
    (filterProperties) => ({ filterProperties })
);

/**
 * Create a lookup object for key value mapping in a property FeatureType
 * @returns lookup object
 */
const getFeatureTypeMap = (properties: TableFacetProperty[], value: keyof FeatureType, key: keyof FeatureType) =>
    properties.reduce<{ [title: string]: string }>((acc, facetProperty) => {
        const fromKey = facetProperty.featureType[key];
        const toValue = facetProperty.featureType[value];
        acc[fromKey] = toValue;

        return acc;
    }, {});
/**
 * Select a lookup object for "referenceId" keyed by "title"
 */
export const selectReferenceIdFromTitle = createSelector([selectFacetPropertiesState], (properties) => {
    const referenceIdFromTitleMap = getFeatureTypeMap(properties, 'referenceId', 'title');
    return (title: string) => referenceIdFromTitleMap[title];
});

/**
 * Select a lookup object from "title" keyed by "referenceId"
 */
export const selectTitleFromReferenceId = createSelector([selectFacetPropertiesState], (properties) => {
    const referenceIdFromTitleMap = getFeatureTypeMap(properties, 'title', 'referenceId');
    return (referenceId: string) => referenceIdFromTitleMap[referenceId];
});
