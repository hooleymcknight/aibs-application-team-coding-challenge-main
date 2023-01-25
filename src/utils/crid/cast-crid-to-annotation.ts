import { cRID } from '../../types';
import { castCridToFeatureType } from './cast-crid-to-feature-type';

export const castCridToAnnotation = (crid: cRID, title: string) => ({
    referenceId: crid.registry.referenceId,
    taxons: [{ symbol: crid.symbol }],
    featureType: castCridToFeatureType(crid, title),
});
