import { FilterType, Operator } from './filter-argument';

export interface AIOMeasurementStats {
    min: number;
    max: number;
    avg: number;
    std: number;
}

export interface ImageDimension {
    referenceId: string;
    height: number;
    width: number;
}

export interface FeatureType {
    title: string;
    referenceId: string;
    description: string;
}

export interface TableFeatureTypeBase {
    referenceId: string;
    featureType: FeatureType;
}

export interface Annotation extends TableFeatureTypeBase {
    taxons: Taxon[];
}

export interface LinkAnnotation extends Annotation {
    tooltipTitle: string;
    link: string;
}

export interface Taxon {
    symbol: string;
    cRID?: cRID;
}

export interface Measurement extends TableFeatureTypeBase {
    value: string;
    measurementType: MeasurementType;
    unit?: string;
}

export interface CridRegistry {
    referenceId: string;
    description: string;
}

export type FeatureValue = Annotation | Measurement;
export interface cRID {
    symbol: string;
    registry: CridRegistry;
}

export enum MeasurementType {
    QUANTITATIVE = 'QUANTITATIVE',
    QUALITATIVE = 'QUALITATIVE',
}

export interface TableImage extends TableFeatureTypeBase {
    url: string;
    annotated: boolean;
    height: number;
    width: number;
}

export interface TableImageRow extends TableRow {
    referenceId: string;
    images: TableImage[];
}

export interface ThumbnailImage {
    referenceId?: string;
    defaultUrl: string;
    annotatedUrl: string;
    width: number;
    height: number;
    description?: string;
}

export type ThumbnailImageMap = Record<string, ThumbnailImage>;
export interface TransformedTableImageRow extends TableImageRow, TransformedTableRow {
    imageMap: ThumbnailImageMap;
}

export interface TableFacetProperty extends TableFeatureTypeBase {
    modality: Array<{ name: string }>;
    type: FilterType;
    filterOperator: Operator;
    measurementStats?: AIOMeasurementStats;
}

export interface TableRow {
    cRID: cRID;
    annotations: Annotation[];
    measurements: Measurement[];
}

export interface TransformedTableRow {
    annotationsDictionary: { [index: string]: Annotation };
    measurementsDictionary: { [index: string]: Measurement };
}

export interface DisplayFeatures {
    displayFeatures: TableFacetProperty[];
}
