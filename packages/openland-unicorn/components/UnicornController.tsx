import * as React from 'react';
import uuid from 'uuid';
import Router from 'next/router';

export interface UnicornPage {
    key: string;
    path: string;
    component: any;
}

export class UnicornController {
    readonly ref: React.RefObject<HTMLDivElement>;
    readonly pages: UnicornPage[] = [];
    readonly emptyPath: string;
    private readonly _listeners: ((action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void)[] = [];

    constructor(emptyPath: string, ref: React.RefObject<HTMLDivElement>) {
        this.ref = ref;
        this.emptyPath = emptyPath;
    }

    push = (path: string, component: any) => {
        if (!this.ref.current) {
            return;
        }
        let key = uuid();
        this.pages.push({ component, path, key });
        for (let l of this._listeners) {
            l({ type: 'push', key, component });
        }
        Router.push('/unicorn', path, { shallow: true, ['unicorn-transition']: 'push' });
    }

    pop = () => {
        if (!this.ref.current) {
            return;
        }
        if (this.pages.length > 0) {
            let r = this.pages.splice(this.pages.length - 1, 1);
            for (let l of this._listeners) {
                l({ type: 'pop', key: r[0].key });
            }
            if (this.pages.length > 0) {
                Router.push('/unicorn', this.pages[this.pages.length - 1].path, { shallow: true, ['unicorn-transition']: 'pop' });
            } else {
                Router.push('/unicorn', this.emptyPath, { shallow: true, ['unicorn-transition']: 'pop' });
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

export const UnicornContext = React.createContext<UnicornController>(undefined as any);

export const useController = () => React.useContext(UnicornContext);