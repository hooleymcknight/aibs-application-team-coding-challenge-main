import { CategoryCount } from '../../../../services/filter';
import { FilterCategoryState, FilterType } from '../../../../types';

export const mockCategory: CategoryCount = {
    description: 'T type membership probability',
    items: [
        {
            count: 25,
            maxRange: 0.199,
            minRange: 0.11,
            name: '[0.11, 0.199]',
        },
        {
            count: 62,
            maxRange: 0.288,
            minRange: 0.19900000000000023,
            name: '[0.19900000000000023, 0.288]',
        },
    ],
    measurementStats: {
        avg: 0.792733426704013,
        max: 1,
        min: 0.11,
        std: 0.236581070140552,
        step: 0.0178,
    },
    name: 'T type assignment probability',
    taxonomy: undefined,
    taxonomyCategories: undefined,
    unit: undefined,
    type: FilterType.MEASUREMENT,
};

export const mockFilterCategoryState: FilterCategoryState = {
    description: 'T type membership probability',
    field: '75VJLLCLB2ADNQCABJD',
    items: [],
    name: 'T type assignment probability',
    slider: {
        max: 0.288,
        maxRange: 1,
        min: 0.11,
        minRange: 0.11,
    },
    type: FilterType.MEASUREMENT,
};
