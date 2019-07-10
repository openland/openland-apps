import * as React from 'react';
import uuid from 'uuid';

export interface UnicornPage {
    key: string;
    component: any;
}

export class UnicornController {
    readonly ref: React.RefObject<HTMLDivElement>;
    readonly pages: UnicornPage[] = [];
    private readonly _listeners: ((action: { type: 'push', key: string, component: any } | { type: 'pop', key: string }) => void)[] = [];

    constructor(ref: React.RefObject<HTMLDivElement>) {
        this.ref = ref;
    }

    push = (component: any) => {
        if (!this.ref.current) {
            return;
        }
        let key = uuid();
        this.pages.push({ component, key });
        for (let l of this._listeners) {
            l({ type: 'push', key, component });
        }
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