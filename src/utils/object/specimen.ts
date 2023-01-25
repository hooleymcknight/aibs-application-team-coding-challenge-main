import keyBy from 'lodash/keyBy';

import { Annotation, Operator, TableRow, TransformedTableRow } from '../../types';
import { castCridToAnnotation } from '../crid';
import { SPECIMEN_ID_TITLE, PROJECT_REFERENCE_IDS, DISPLAY_PROPERTY_TYPE_PROJECT } from '../../constants';

export const getAnnotationValue = (annotation: Annotation): string =>
    annotation?.taxons?.map(({ symbol }) => symbol).join();

export const transformRow = (row: TableRow): TransformedTableRow => {
    if (row === null) {
        return { annotationsDictionary: {}, measurementsDictionary: {} };
    }
    const annotations = [castCridToAnnotation(row.cRID, SPECIMEN_ID_TITLE), ...row.annotations];
    return {
        annotationsDictionary: keyBy(annotations, 'featureType.referenceId'),
        measurementsDictionary: keyBy(row.measurements, 'featureType.referenceId'),
    };
};

export const createProjectFilter = (projectReferenceId: string) => ({
    field: PROJECT_REFERENCE_IDS,
    operator: Operator.CONTAINS,
    value: projectReferenceId,
});

export const createDisplayPropertyFilter = (projectReferenceId: string) => ({
    typeReferenceId: projectReferenceId,
    type: DISPLAY_PROPERTY_TYPE_PROJECT,
});
