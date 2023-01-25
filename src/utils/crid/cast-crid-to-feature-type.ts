import { cRID, FeatureType } from '../../types';

export const castCridToFeatureType = (crid: cRID, title: string): FeatureType => ({
    title,
    description: crid.registry.description,
    referenceId: crid.registry.referenceId,
});
