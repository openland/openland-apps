import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getComponentDisplayName } from '../utils/utils';
import { SingletonRouter } from 'next/router';
import { Router } from '../routes';
import * as qs from 'query-string';

export interface RouterState {
    readonly pathname: string;
    readonly route: string;
    readonly asPath?: string;
    readonly query?: { [key: string]: any };
    readonly queryString?: { [key: string]: any };
    readonly hostName: string;
    readonly protocol: string;
    readonly href: string;

    push: (path: string) => void;
    pushQuery: (field: string, value?: string) => void;
    replace: (path: string) => void;
}

export function withRouter<P = {}>(ComposedComponent: React.ComponentType<P & { router: RouterState }>): React.ComponentClass<P> {
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
            let parts = nRouter.asPath!!.split('?');
            let queryString = (parts[1] ? qs.parse(parts[1]) : {});
            var router: RouterState = {
                pathname: parts[0],
                route: nRouter.route,
                asPath: nRouter.asPath,
                query: nRouter.query,
                queryString: queryString,
                hostName: hostName,
                protocol: protocol,
                href: href,
                push: (path) => {
                    Router.pushRoute(path);
                },
                pushQuery: (field: string, value?: string) => {
                    Router.pushRoute(parts[0] + '?' + qs.stringify(Object.assign({}, queryString, { [field]: value })));
                },
                replace: (path) => {
                    Router.replaceRoute(path);
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