import { renderHook } from '@testing-library/react-hooks';

import { PropertiesNotFoundError } from '../../../../types';
import { getMockQueryProvider } from '../../../../utils';
import {
    useSearchFields,
    useTextFields,
    useImageFields,
    useAllFieldsQuery,
    useAllFieldsMap,
} from '../use-all-fields-query';
import {
    allFieldsMockResponse,
    allFieldsAndDefaultsResponse,
    allFieldsMockEmptyOptionsResponse,
    transformedSpecimenIdRowMock,
    imageMockOption,
    summaryMockOption,
} from './use-specimens-all-fields-query.mock';

describe('useAllFieldsQuery', () => {
    it('should return CRID and IMAGEs', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsMockResponse });
        const { result, waitForNextUpdate } = renderHook(() => useAllFieldsQuery('123ABC'), { wrapper });
        await waitForNextUpdate();
        const expected = [transformedSpecimenIdRowMock, imageMockOption, summaryMockOption];
        expect(result.current.data).toEqual(expected);
    });

    it('Should return an error if options are empty', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsMockEmptyOptionsResponse });
        const { result, waitForNextUpdate } = renderHook(() => useAllFieldsQuery('123ABC'), { wrapper });
        await waitForNextUpdate();
        expect(result.current.error).toBeInstanceOf(PropertiesNotFoundError);
        expect(result.current.data).toEqual([transformedSpecimenIdRowMock]);
    });
});

describe('useTextFields', () => {
    it('should return CRID as option, but not IMAGEs', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsMockResponse });
        const { result, waitForNextUpdate } = renderHook(() => useTextFields('123ABC'), { wrapper });
        await waitForNextUpdate();
        expect(result.current.data).toEqual([transformedSpecimenIdRowMock]);
    });
});

describe('useSearchFields', () => {
    it('should not return IMAGEs or CRID as options', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsMockResponse });
        const { result, waitForNextUpdate } = renderHook(() => useSearchFields('123ABC'), { wrapper });
        await waitForNextUpdate();
        expect(result.current.data).toEqual([]);
    });
});

describe('useImageFields', () => {
    it('should return IMAGEs but not CRIDs', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsAndDefaultsResponse });
        const { result, waitForNextUpdate } = renderHook(() => useImageFields('123ABC'), { wrapper });
        await waitForNextUpdate();
        expect(result.current.data).toEqual([summaryMockOption, imageMockOption]);
    });
});

describe('useAllFieldsMap', () => {
    it('should return a map of all fields keyed by featureType.referenceId', async () => {
        const wrapper = getMockQueryProvider({ mocks: allFieldsMockResponse });
        const { result, waitForNextUpdate } = renderHook(() => useAllFieldsMap('123ABC'), { wrapper });
        await waitForNextUpdate();
        const expected = {
            SPECIMENS_SUMMARY_CELL: summaryMockOption,
            ActionPotentialRefId: imageMockOption,
            SpecimenIdCridReferenceId: transformedSpecimenIdRowMock,
        };
        expect(result.current.data).toEqual(expected);
    });
});
