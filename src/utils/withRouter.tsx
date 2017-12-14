import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getComponentDisplayName } from '../utils/utils';
import { SingletonRouter } from 'next/router';
import { Router } from '../routes';

export interface RouterState {
    readonly pathname: string;
    readonly route: string;
    readonly asPath?: string;
    readonly query?: { [key: string]: any };
    readonly hostName: string;
    readonly protocol: string;
    readonly href: string;

    push: (path: string) => void;
}

export function withRouter<P = {}>(ComposedComponent: React.ComponentType<P & { router: RouterState }>) {
    return class WithRouter extends React.Component<P> {
        static displayName = `WithRouter(${getComponentDisplayName(
            ComposedComponent
        )})`;
        static contextTypes = {
            hostName: PropTypes.string.isRequired,
            protocol: PropTypes.string.isRequired,
            router: PropTypes.object.isRequired
        };

        render() {
            var hostName = this.context.hostName as string;
            var protocol = this.context.protocol as string;
            var nRouter = this.context.router as SingletonRouter;
            var href = protocol + '://' + hostName;
            if (nRouter.asPath) {
                href += nRouter.asPath;
            }
            var router: RouterState = {
                pathname: nRouter.pathname,
                route: nRouter.route,
                asPath: nRouter.asPath,
                query: nRouter.query,
                hostName: hostName,
                protocol: protocol,
                href: href,
                push: (path) => {
                    Router.pushRoute(path);
                }
            };
            return (
                <ComposedComponent
                    router={router}
                    {...this.props}
                />
            );
        }
    };
}