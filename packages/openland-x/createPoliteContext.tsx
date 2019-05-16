import * as React from 'react';

export function compareByReference<T>(a: T, b: T) {
    return a === b;
}

export interface ContextStateInterface<T> {
    setValue: (value: T) => void;
    listen: (listener: (value: T) => void) => () => void;
    getValue: () => T;
    useValue: () => T;
}

export function createPoliteContext<T>({
    defaultValue,
    comparator = compareByReference,
}: {
    defaultValue: T;
    comparator?: (a: T, b: T) => boolean;
}) {
    class ContextState<K extends T> {
        private value = defaultValue;

        constructor(value: K) {
            this.value = value;
        }

        private listeners = new Set<(value: T) => void>();

        setValue = (value: K) => {
            if (comparator(this.value, value)) {
                return;
            }
            this.value = value;
            for (let l of this.listeners) {
                l(this.value);
            }
        };

        listen = (lisener: (isActive: K) => void) => {
            this.listeners.add(lisener);
            lisener(this.value as any);
            return () => {
                this.listeners.delete(lisener);
            };
        };

        getValue = () => this.value;
        useValue = () => {
            let [value, setValue] = React.useState(this.value);
            React.useEffect(() => {
                return this.listen(s => {
                    setValue(s);
                });
            });
            return value;
        };
    }
    const contextState = new ContextState(defaultValue);
    const Context = React.createContext<ContextStateInterface<T>>(contextState);

    return {
        Context,
        ContextState,
        contextState,
    };
}
