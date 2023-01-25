import { useMemo } from 'react';

import { FilterType, MeasurementType } from '../../../types';
import { useDisplayPropertiesQuery } from './use-display-properties-query';

type MeasurementUnitMap = Record<string, string>;

export const useMeasurementUnitMap = (projectReferenceId: string) => {
    const response = useDisplayPropertiesQuery(projectReferenceId);
    const data = useMemo(
        () =>
            response.data?.getDisplayProperty.displayFeatures
                .filter(
                    (displayFeature) =>
                        displayFeature.type === FilterType.MEASUREMENT &&
                        displayFeature.measurementType === MeasurementType.QUANTITATIVE &&
                        displayFeature.unit !== ''
                )
                .reduce((acc: MeasurementUnitMap, displayFeature) => {
                    acc[displayFeature.featureType.referenceId] = displayFeature.unit;
                    return acc;
                }, {}),
        [response.data]
    );
    return { ...response, data };
};
