import * as React from 'react';

export function withComponent<P>(wrappedComponent: React.ComponentType<P>) {
    return wrappedComponent;
}