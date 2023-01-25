import { MockedResponse } from '@apollo/client/testing';

import { allFieldsQuery } from '../use-all-fields-query';
import { viewDefaultPropertiesQuery } from '../use-defaults-query';
import { AllPropertiesData, ViewDefaultOptions, ViewDefaultOptionsPayload } from '../../../filter/types';
import { FilterType, TableRow, TableFacetProperty, AIOMeasurementStats, DisplayFeatures } from '../../../../types';
import {
    SPECIMENS_SUMMARY_CELL,
    SPECIMENS_SUMMARY_CELL_TITLE,
    SPECIMENS_SUMMARY_CELL_DESCRIPTION,
} from '../../../../constants';
import { createDisplayPropertyFilter } from '../../../../utils';

// In order for the Apollo mock server to correctly return the data using fragments,
// we need to return the `__typename` field. However, our types don't have `__typename`
// so these mocks extend the data model to included them where needed.
// Further details can be found here: https://github.com/apollographql/apollo-client/issues/8276
interface SpecimenAllPropertiesDataMock extends AllPropertiesData {
    options: DisplayFeaturesMock;
}

interface DisplayFeaturesMock extends DisplayFeatures {
    __typename: String;
}

interface SpecimenFacetPropertyMock extends TableFacetProperty {
    __typename: String;
    measurementStats: AIOMeasurementStatsMock;
}

interface AIOMeasurementStatsMock extends AIOMeasurementStats {
    __typename: String;
}

export const mockDisplayDefault: ViewDefaultOptions = {
    listImageFeatures: ['ActionPotentialRefId'],
    defaultFilter: [],
    defaultSort: [],
    properties: [],
    summaryFeatures: [],
};

export const summaryMockOption: Partial<SpecimenFacetPropertyMock> = {
    featureType: {
        description: SPECIMENS_SUMMARY_CELL_DESCRIPTION,
        referenceId: SPECIMENS_SUMMARY_CELL,
        title: SPECIMENS_SUMMARY_CELL_TITLE,
    },
    filterOperator: null,
    modality: [{ name: 'general' }],
    referenceId: SPECIMENS_SUMMARY_CELL,
    type: FilterType.IMAGE,
};

export const imageMockOption: Partial<SpecimenFacetPropertyMock> = {
    featureType: {
        referenceId: 'ActionPotentialRefId',
        title: 'Action Potential',
        description: 'Action Potential (Thumbnail)',
    },
    modality: [{ name: 'Ephys' }],
    type: FilterType.IMAGE,
    filterOperator: null,
};

export const specimenIdRowMock: Partial<TableRow> = {
    cRID: {
        symbol: 'IdCridSymbol',
        registry: {
            referenceId: 'SpecimenIdCridReferenceId',
            description: 'Test Specimen ID as annotation',
        },
    },
};

export const transformedSpecimenIdRowMock: TableFacetProperty = {
    referenceId: 'SpecimenIdCridReferenceId',
    featureType: {
        title: 'Specimen ID',
        description: 'Test Specimen ID as annotation',
        referenceId: 'SpecimenIdCridReferenceId',
    },
    type: FilterType.ANNOTATION,
    filterOperator: null,
    modality: [{ name: 'general' }],
};

export const mockRequest = {
    query: allFieldsQuery,
    variables: {
        filter: [{ field: 'projectReferenceIds', operator: 'CONTAINS', value: '123ABC' }],
        displayPropertyFilter: createDisplayPropertyFilter('123ABC'),
    },
};

export const mockRequestDefaults = {
    query: viewDefaultPropertiesQuery,
    variables: { referenceId: '123ABC' },
};

export const allFieldsMockResponseItem: MockedResponse<SpecimenAllPropertiesDataMock> = {
    request: mockRequest,
    result: {
        data: {
            options: {
                __typename: 'ProjectDisplayProperty',
                displayFeatures: [imageMockOption as TableFacetProperty],
            },
            idOption: [specimenIdRowMock as TableRow],
        },
    },
};

export const allFieldsMockResponse: MockedResponse<SpecimenAllPropertiesDataMock>[] = [allFieldsMockResponseItem];

export const allFieldsMockEmptyOptionsResponse: MockedResponse<SpecimenAllPropertiesDataMock>[] = [
    {
        request: mockRequest,
        result: {
            data: {
                options: {
                    __typename: 'ProjectDisplayProperty',
                    displayFeatures: [],
                },
                idOption: [specimenIdRowMock as TableRow],
            },
        },
    },
];

export const allFieldsAndDefaultsResponse: [
    MockedResponse<SpecimenAllPropertiesDataMock>,
    MockedResponse<ViewDefaultOptionsPayload>
] = [
    allFieldsMockResponseItem,
    {
        request: mockRequestDefaults,
        result: {
            data: {
                defaultOptions: mockDisplayDefault,
            },
        },
    },
];
