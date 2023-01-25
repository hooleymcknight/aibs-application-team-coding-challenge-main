export interface FilterArgument {
    field: string;
    value: string;
    operator: Operator;
}

export enum Operator {
    EQ = 'EQ',
    CONTAINS = 'CONTAINS',
    BETWEEN = 'BETWEEN',
}

export enum FilterType {
    ANNOTATION = 'ANNOTATION',
    MEASUREMENT = 'MEASUREMENT',
    IMAGE = 'IMAGE',
}
