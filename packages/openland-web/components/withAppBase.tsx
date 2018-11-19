import * as React from 'react';

export function withAppBase(name: string, WrappedComponent: React.ComponentType<{}>) {
    return (props: any) => {
        return <WrappedComponent />;
    };
}