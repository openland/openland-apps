import * as React from 'react';

export function usePreviousState<T>(value: T): T | undefined {
    const ref = React.useRef<T>();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current as T;
}