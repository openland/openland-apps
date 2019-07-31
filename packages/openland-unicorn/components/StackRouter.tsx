import * as React from 'react';
import uuid from 'uuid';
import { URouting } from 'openland-unicorn/URouting';
import { NotFound } from 'openland-unicorn/NotFound';

export interface StackItems {
    key: string;
    path: string;
    query: any;
    id?: string;
    component: any;
}

export type StackRouterAction =
    { type: 'push', key: string, component: any, query: any, id?: string, path: string; } |
    { type: 'pop', key: string } |
    { type: 'reset', pages: StackItems[] };

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

    historyChanged = (paths: string[]) => {
        let same = false;
        if (this.pages.length === paths.length) {
            same = true;
            for (let i = 0; i < this.pages.length; i++) {
                if (this.pages[i].path !== paths[i]) {
                    same = false;
                    break;
                }
            }
        }
        if (same) {
            return;
        }

        // If navigate next
        if (paths.length - 1 === this.pages.length) {
            same = true;
            for (let i = 0; i < this.pages.length; i++) {
                if (this.pages[i].path !== paths[i]) {
                    same = false;
                    break;
                }
            }

            if (same) {
                this.push(paths[paths.length - 1]);
                return;
            }
        }

        // If navigate back
        if (paths.length === this.pages.length - 1) {
            same = true;
            for (let i = 0; i < this.pages.length - 1; i++) {
                if (this.pages[i].path !== paths[i]) {
                    same = false;
                    break;
                }
            }

            if (same) {
                this.pop();
                return;
            }
        }

        // Reset stack
        this.pages.splice(0, this.pages.length);
        for (let p of paths) {
            this.pages.push(this.resolve(p));
        }
        for (let l of this._listeners) {
            l({ type: 'reset', pages: [...this.pages] });
        }
    }

    reset = (path?: string) => {
        this.pages.splice(0, this.pages.length);
        if (path) {
            this.pages.push(this.resolve(path));
        }

        setTimeout(() => {
            for (let l of this._listeners) {
                l({ type: 'reset', pages: [...this.pages] });
            }
        }, 10);
    }

    restore = (paths: string[]) => {
        this.pages.splice(0, this.pages.length - 1);

        for (let p of paths) {
            this.pages.push(this.resolve(p));
        }
    }

    push = (path: string) => {
        // Ignore action if not mounted
        if (!this.ref.current) {
            return;
        }

        // Push page to stack
        let item = this.resolve(path);
        this.pages.push(item);
        for (let l of this._listeners) {
            l({ type: 'push', ...item });
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

    addListener = (handler: (action: { type: 'push', key: string, component: any, query: any, id?: string, path: string; } | { type: 'pop', key: string }) => void) => {
        this._listeners.push(handler);
        return () => {
            this._listeners.splice(this._listeners.indexOf(handler), 1);
        };
    }

    private resolve(path: string): StackItems {
        let ex = this.routing.resolve(path);
        let component: any;
        let query: any = {};
        let id: string | undefined;
        if (!ex) {
            console.warn('Unable to resolve component for ' + path);
            component = <NotFound />;
        } else {
            let Component = ex.route.factory();
            query = ex.params;
            let keys = Object.keys(query);
            if (keys.length === 1) {
                let id2 = query[keys[0]];
                if (typeof id2 === 'string') {
                    id = id2;
                }
            }
            component = <Component />;
        }
        let key = uuid();

        return { key, component, path, query, id };
    }
}

export const StackRouterContext = React.createContext<StackRouter>(undefined as any);

export const useStackRouter = () => React.useContext(StackRouterContext);