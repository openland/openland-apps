export interface XRouter {

    readonly href: string;
    readonly protocol: string;
    readonly hostName: string;
    readonly path: string;
    readonly query: { [key: string]: any };

    readonly route: string;
    readonly routeQuery: { [key: string]: any };

    push: (path: string) => void;
    pushQuery: (field: string, value?: string, clear?: boolean) => void;
    pushQueryParams: (params: {}) => void;
    replace: (path: string) => void;
    replaceQuery: (field: string, value?: string) => void;
    replaceQueryParams: (params: {}) => void;
    resolveLink: (path: string) => string;
}