import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';

export function withQueryLoader<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P> {
    return (props: P) => {
        if ((props as any).data as any) {
            if ((props as any).data.loading) {
                return <XLoader loading={true} />;
            }
            if ((props as any).data.error) {
                throw (props as any).data.error;
            }
        }
        return <WrappedComponent {...props} />;
    };
}