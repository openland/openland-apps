import * as React from 'react';
import { getComponentDisplayName } from '../utils/utils';
import { XRouter, XRouterReceiver } from './routing/XRouter';

export type XRouter = XRouter;
export type XWithRouter = { router: XRouter };

export function withRouter<P = {}>(ComposedComponent: React.ComponentType<P & XWithRouter>): React.ComponentClass<P> {
    return class WithRouter extends XRouterReceiver<P> {
        static displayName = `WithRouter(${getComponentDisplayName(
            ComposedComponent
        )})`;
        render() {
            return <ComposedComponent router={this.router} {...this.props} />;
        }
    };
}