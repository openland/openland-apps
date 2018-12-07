export interface XRouting {
    push: (path: string) => void;
    pushQuery: (field: string, value?: string, clear?: boolean) => void;
    pushQueryParams: (params: {}) => void;
    replace: (path: string) => void;
    replaceQuery: (field: string, value?: string) => void;
    replaceQueryParams: (params: {}) => void;
    resolveLink: (path: string) => string;
}