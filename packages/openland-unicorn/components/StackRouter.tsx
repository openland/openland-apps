import * as React from 'react';
import uuid from 'uuid';
import { URouting } from 'openland-unicorn/URouting';
import { NotFound } from 'openland-unicorn/NotFound';

export interface StackItems {
    key: string;
    path: string;
    component: any;
}

export type StackRouterAction =
    { type: 'push', key: string, component: any } |
    { type: 'pop', key: string };

export class StackRouter {
    readonly ref: React.RefObject<HTMLDivElement> = React.createRef();
    readonly rootPath: string;
    readonly pages: StackItems[] = [];
    readonly routing: URouting;
    private readonly _listeners: ((action: StackRouterAction) => void)[] = [];

    constructor(rootPath: string, routing: URouting) {
        this.rootPath = rootPath;
        this.routing = routing;
    }

    push = (path: string) => {
        // Ignore action if not mounted
        if (!this.ref.current) {
            return;
        }

        // Push page to stack
        let ex = this.routing.resolve(path);
        let component: any;
        if (!ex) {
            console.warn('Unable to resolve component for ' + path);
            component = <NotFound />;
        } else {
            let Component = ex.route.factory();
            component = <Component />;
        }
        let key = uuid();

        this.pages.push({ path, key, component });
        for (let l of this._listeners) {
            l({ type: 'push', key, component });
        }
    }

    pop = () => {
        // Ignore action if not mounted
        if (!this.ref.current) {
            return;
        }

        // Pop if there are pages in stack
        if (this.pages.length > 0) {
            let r = this.pages.splice(this.pages.length - 1, 1);
            for (let l of this._listeners) {
                l({ type: 'pop', key: r[0].key });
            }
        }
    }

    addListener = (handler: (action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void) => {
        this._listeners.push(handler);
        return () => {
            this._listeners.splice(this._listeners.indexOf(handler), 1);
        };
    }
}

export const StackRouterContext = React.createContext<StackRouter>(undefined as any);

export const useStackRouter = () => React.useContext(StackRouterContext);