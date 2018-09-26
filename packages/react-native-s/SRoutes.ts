import * as React from 'react';

export class SRoutes {

    readonly defaultRoute: string;
    private routes: Map<string, React.ComponentType<{}>>;
    constructor(defaultRoute: string, map: Map<string, React.ComponentType<{}>>) {
        this.defaultRoute = defaultRoute;
        this.routes = map;
    }
    resolvePath(name: string) {
        if (!this.routes.has(name)) {
            throw Error('Unable to resolve path ' + name);
        }
        return this.routes.get(name)!!;
    }
}

export class SRoutesBuilder {
    private defaultRoute: string | null = null;
    private routes = new Map<string, React.ComponentType<{}>>();

    addRoute(name: string, component: React.ComponentType<{}>): SRoutesBuilder {
        if (this.defaultRoute === null) {
            this.defaultRoute = name;
        }
        this.routes.set(name, component);
        return this;
    }

    build(initial?: string) {
        return new SRoutes(initial || this.defaultRoute!, this.routes);
    }
}