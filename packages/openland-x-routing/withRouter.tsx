import * as React from 'react';
import { XRouter } from './XRouter';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';
import { XRouterContext } from './XRouterContext';

export type XWithRouter = { router: XRouter };

export function withRouter<P = {}>(ComposedComponent: React.ComponentType<P & XWithRouter>): React.ComponentClass<P> {
    return class WithRouter extends React.Component<P> {
        static displayName = `WithRouter(${getComponentDisplayName(ComposedComponent)})`;
        render() {
            return (
                <XRouterContext.Consumer>
                    {router => {
                        if (!router) {
                            throw Error('Router not configured!');
                        }
                        return <ComposedComponent router={router} {...this.props} />;
                    }}
                </XRouterContext.Consumer>
            );
        }
    };
}