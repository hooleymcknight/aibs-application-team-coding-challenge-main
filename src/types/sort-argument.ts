export interface SortArgument {
    field: string;
    order: SortOrder;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}
