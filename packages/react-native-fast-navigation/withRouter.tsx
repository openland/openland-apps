import * as React from 'react';
import { FastRouter, FastRouterContext } from './FastRouter';

export interface FastRouterInjectedProps {
    router: FastRouter;
}

export function withRouter<T = {}>(Component: React.ComponentType<T & FastRouterInjectedProps>): React.ComponentType<T> {
    return (props: T) => {
        return (
            <FastRouterContext.Consumer>
                {router => (<Component {...props} router={router!!} />)}
            </FastRouterContext.Consumer>
        );
    };
}