import { FilterType, Operator } from '../../../types';
import { getItemCountQuery } from '../hooks/use-item-count-query';
import { FilterCategoryArguments } from '../types';

export const MEASUREMENT_BASE_NAME = 'fake measurement';
export const similarMeasurementBase: FilterCategoryArguments = {
    name: MEASUREMENT_BASE_NAME,
    type: FilterType.MEASUREMENT,
    get description() {
        return `${this.name} description`;
    },
    referenceId: '1234',
    filterOperator: Operator.BETWEEN,
    measurementStats: {
        min: 0,
        max: 100,
        avg: 50,
        std: 3,
        step: 5,
    },
};

export const mockSimilarMeasurement1: FilterCategoryArguments = {
    ...similarMeasurementBase,
    name: `${MEASUREMENT_BASE_NAME} 1`,
    referenceId: '1234',
};

export const mockSimilarMeasurement2: FilterCategoryArguments = {
    ...similarMeasurementBase,
    name: `${MEASUREMENT_BASE_NAME} 2`,
    referenceId: '5678',
};

describe('use-item-count-query', () => {
    it('DT-1359: Features with numeric differentiators have different query aliases', () => {
        const categoryArgs = [mockSimilarMeasurement1, mockSimilarMeasurement2];
        const query = getItemCountQuery(categoryArgs);
        query.definitions.forEach((node) => {
            if (!('selectionSet' in node)) {
                throw new Error('unexpected result from test body.');
            }

            const aliases = node.selectionSet.selections.map((selection) => {
                if (!('alias' in selection)) {
                    throw new Error('unexpected result from test body.');
                }
                return selection.alias.value;
            });

            const uniqAliases = [...new Set(aliases)];

            expect(uniqAliases.length).toEqual(categoryArgs.length);
        });
    });
});
