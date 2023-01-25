export interface URLConfig {
    origin: string;
    pathname?: string;
    search?: string;
}

export const getURLString = ({ origin, pathname = '', search }: URLConfig): string => {
    const base = `${origin}${pathname}`;
    return search ? `${base}?${search}` : base;
};
