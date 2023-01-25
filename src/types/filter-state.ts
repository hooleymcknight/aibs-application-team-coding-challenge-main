import { FilterType } from './filter-argument';
import { AIOMeasurementStats } from './table';

// Filter State
export interface FilterItemState {
    name: string;
}

export interface SliderItemState {
    minRange: number;
    maxRange: number;
    min: number;
    max: number;
}

export interface FilterCategoryState {
    name: string;
    type: FilterType;
    description?: string;
    items?: FilterItemState[];
    slider?: SliderItemState;
    field?: string;
}

export type FilterState = FilterCategoryState[];

export interface FilterItemStateUpdate {
    categoryName: string;
    type: FilterType;
    itemName?: string;
    slider?: SliderItemState;
}

export interface CountMap {
    [alias: string]: number;
}

export interface RenderTree {
    maxCount?: number;
    nodeId: string;
    name: string;
    speciesCount: number;
    children?: RenderTree[];
}

// Counts
export interface ItemCount {
    name: string;
    count: number;
    minRange?: number;
    maxRange?: number;
}

export interface Mark {
    value: number;
    label: string;
}

export interface FilterMeasurementStats extends AIOMeasurementStats {
    step: number;
}
export interface ItemCountQueryData {
    [alias: string]: ItemCount[];
}
