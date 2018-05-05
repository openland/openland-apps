import * as React from 'react';
import { XRouter } from './XRouter';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';
import { XRouterReceiver } from './XRouterReceiver';

export type XWithRouter = { router: XRouter };

export function withRouter<P = {}>(ComposedComponent: React.ComponentType<P & XWithRouter>): React.ComponentClass<P> {
    return class WithRouter extends XRouterReceiver<P> {
        static displayName = `WithRouter(${getComponentDisplayName(ComposedComponent)})`;
        render() {
            return <ComposedComponent router={this.router} {...this.props} />;
        }
    };
}