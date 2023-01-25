export interface CategoryArguments {
    alias: string;
    categoryProperty: string;
}

export interface CategoryDisplayArguments extends CategoryArguments {
    displayName: string;
}

export interface CategoryDisplayQuery {
    getFilterField: CategoryDisplayArguments[];
}

export interface CategoryDisplayNameMap {
    [alias: string]: string;
}
