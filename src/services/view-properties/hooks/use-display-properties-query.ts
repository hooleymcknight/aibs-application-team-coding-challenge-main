import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { ImageDimension, MeasurementType } from '../../../types';

export interface DisplayPropertiesQueryPayload {
    getDisplayProperty: DisplayFeaturesPayload;
}

export interface DisplayFeaturesPayload {
    displayFeatures: DisplayPropertiesPayload[];
}

export interface DisplayPropertiesPayload {
    type: string;
    featureType: FeatureTypePayload;
    dimensions?: Pick<ImageDimension, 'height' | 'width'>;
    measurementType?: MeasurementType;
    unit?: string;
}

export interface FeatureTypePayload {
    referenceId: string;
}

export const displayPropertiesQuery = gql`
    query displayProperties($typeReferenceId: String!) {
        getDisplayProperty(displayPropertyFilter: { typeReferenceId: $typeReferenceId, type: PROJECT }) {
            ... on ProjectDisplayProperty {
                displayFeatures {
                    featureType {
                        referenceId
                    }
                    type
                    ... on ImageDisplayProperty {
                        dimensions {
                            height
                            width
                        }
                    }
                    ... on MeasurementDisplayProperty {
                        measurementType
                        unit
                    }
                }
            }
        }
    }
`;

export const useDisplayPropertiesQuery = (projectReferenceId: string) =>
    useQuery<DisplayPropertiesQueryPayload>(displayPropertiesQuery, {
        variables: {
            typeReferenceId: projectReferenceId,
        },
        skip: !projectReferenceId,
    });
