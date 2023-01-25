export interface PropertyDisplayName {
    shortName: string;
    longName: string;
    description: string;
    emphasis?: boolean;
}

export interface PropertyDisplayNameConfiguration {
    [key: string]: PropertyDisplayName;
}

export interface DisplayProperty<T> {
    value: T;
    metadata: PropertyDisplayName;
}
