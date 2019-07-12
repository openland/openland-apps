import pathToRegexp from 'path-to-regexp';

export interface URoute {
    keys: {
        name: string | number;
        prefix: string;
        delimiter: string;
        optional: boolean;
        repeat: boolean;
        pattern: string;
    }[];
    path: string;
    regexp: RegExp;
    factory: () => React.ComponentType<any>;
}

export interface UResolvedRoute {
    params: any;
    route: URoute;
}

export class URouting {

    private _routes: URoute[] = [];

    addRoute(path: string, factory: () => React.ComponentType<any>) {
        let keys: {
            name: string | number;
            prefix: string;
            delimiter: string;
            optional: boolean;
            repeat: boolean;
            pattern: string;
        }[] = [];
        let regexp = pathToRegexp(path, keys, { strict: false });
        this._routes.push(Object.freeze({
            keys,
            regexp,
            path,
            factory
        }));
    }

    resolve(path: string): UResolvedRoute | null {
        for (let r of this._routes) {
            let r2 = r.regexp.exec(path);
            if (r2) {
                let qp = r2.slice(1).reduce((params, val, i) => {
                    if (val === undefined) {
                        return params;
                    }
                    return Object.assign(params, {
                        [r.keys[i].name]: decodeURIComponent(val)
                    });
                }, {});
                return {
                    route: r,
                    params: qp
                };
            }
        }
        return null;
    }
}