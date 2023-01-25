import {
    FilterArgument,
    SortArgument,
    DisplayFeatures,
    TableRow,
    FilterType,
    Operator,
    FilterMeasurementStats,
    ItemCount,
    Mark,
    RenderTree,
} from '../../types';

export interface ViewDefaultOptions {
    properties: string[];
    defaultSort: SortArgument[];
    defaultFilter: FilterArgument[];
    listImageFeatures: string[];
    summaryFeatures: string[];
}

export interface ViewDefaultOptionsPayload {
    defaultOptions: ViewDefaultOptions;
}

export interface AllPropertiesData {
    options: DisplayFeatures;
    idOption: TableRow[];
}

export interface FilterCategoryArguments {
    name: string;
    type: FilterType;
    description: string;
    referenceId: string;
    filterOperator?: Operator;
    measurementStats?: FilterMeasurementStats;
    unit?: string;
}

interface ItemValue {
    value: string;
}

interface FilterItemCount {
    properties: ItemValue[];
    count: number;
}

export interface FilterCategoryCounts {
    [alias: string]: FilterItemCount[];
}
export interface TaxonomyCategories {
    [alias: string]: FilterCategoryArguments;
}

export interface CategoryCount {
    name: string;
    type: FilterType;
    description?: string;
    items: ItemCount[];
    marks?: Mark[];
    measurementStats?: FilterMeasurementStats;
    taxonomyCategories?: TaxonomyCategories;
    unit?: string;
    isTree?: boolean;
    treeObject?: RenderTree[];
}

export type TotalCounts = CategoryCount[];
export type FilterCounts = CategoryCount[];
