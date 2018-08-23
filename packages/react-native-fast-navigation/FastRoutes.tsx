import * as React from 'react';

export class FastRoutesBuilder {
    private defaultRoute: string | null = null;
    private routes = new Map<string, React.ComponentType<{}>>();

    addRoute(name: string, component: React.ComponentType<{}>): FastRoutesBuilder {
        if (this.defaultRoute === null) {
            this.defaultRoute = name;
        }
        this.routes.set(name, component);
        return this;
    }

    build() {
        return new FastRoutes(this.defaultRoute!, this.routes);
    }
}

export class FastRoutes {
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