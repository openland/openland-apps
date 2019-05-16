import * as React from 'react';

function compare<T>(a: T, b: T) {
    return a === b;
}

export function createPoliteContext<T>(defaultValue: T) {
    class ContextState<K extends T> {
        private value = defaultValue;

        constructor(value: K) {
            this.value = value;
        }

        private listeners = new Set<(value: T) => void>();

        setIsActive = (value: K) => {
            if (compare(this.value, value)) {
                return;
            }
            this.value = value;
            for (let l of this.listeners) {
                l(this.value);
            }
        };

        listen = (lisener: (isActive: K) => void) => {
            this.listeners.add(lisener);
            return () => {
                this.listeners.delete(lisener);
            };
        };

        getValue = () => this.value;
        useIsActive = () => {
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
    const Context = React.createContext<ContextState<T>>(contextState);

    return {
        Context,
        ContextState,
        contextState,
    };
}
