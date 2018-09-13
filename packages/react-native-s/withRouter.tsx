import * as React from 'react';
import { SRouter } from './SRouter';
import { SRouterContext } from './SRouterContext';

export interface SRouterInjectedProps {
    router: SRouter;
}

export function withRouter<T = {}>(Component: React.ComponentType<T & SRouterInjectedProps>): React.ComponentType<T> {
    return (props: T) => {
        return (
            <SRouterContext.Consumer>
                {router => (<Component {...props} router={router!!} />)}
            </SRouterContext.Consumer>
        );
    };
}