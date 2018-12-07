import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as qs from 'query-string';
import { XRouter } from './XRouter';
import { RouterProps } from 'next/router';
import { XRouterContext } from './XRouterContext';
import { XRouting } from './XRouting';
import { XRoutingContext } from './XRoutingContext';

interface NextRoutes {
    Router: {
        pushRoute(route: string): Promise<any>;
        replaceRoute(route: string): Promise<any>;
    };
    findAndGetUrls(nameOrUrl?: string, params?: any): { route: any, urls: { as: string, href: string } };
}

export class XRouterProvider extends React.Component<{ routes: NextRoutes, hostName: string, protocol: string }> {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    private xRouterState: XRouter;
    private xRouting: XRouting;

    constructor(props: { routes: NextRoutes, hostName: string, protocol: string }, context: any) {
        super(props, context);
        this.xRouterState = this.buildState(context);
        this.xRouting = {
            push: this.push,
            pushQuery: this.pushQuery,
            pushQueryParams: this.pushQueryParams,
            replace: this.replace,
            replaceQuery: this.replaceQuery,
            replaceQueryParams: this.replaceQueryParams,
            resolveLink: this.resolveLink
        }
    }

    buildState(context: any) {
        var nRouter = context.router as RouterProps;
        var href = this.props.protocol + '://' + this.props.hostName;
        if (nRouter.asPath) {
            href += nRouter.asPath;
        }
        let parts = nRouter.asPath!!.split('?');
        let path = parts[0];
        let query = (parts[1] ? qs.parse(parts[1]) : {});

        let route = nRouter.route;
        let routeQuery = nRouter.query || {};

        let res: XRouter = {
            href,
            protocol: this.props.protocol,
            hostName: this.props.hostName,
            path,
            query,
            route,
            routeQuery,
            push: this.push,
            pushQuery: this.pushQuery,
            pushQueryParams: this.pushQueryParams,
            replace: this.replace,
            replaceQuery: this.replaceQuery,
            replaceQueryParams: this.replaceQueryParams,
            resolveLink: this.resolveLink
        };
        return res;
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
        document.body.focus();
    }

    resolveLink = (path: string) => {
        return this.props.routes.findAndGetUrls(path).urls.as;
    }

    push = (path: string) => {
        this.props.routes.Router.pushRoute(path)
            .then(this.scrollToTop);
    }
    pushQuery = (field: string, value?: string, clear?: boolean) => {
        let q = qs.stringify(Object.assign({}, clear ? {} : this.xRouterState.query, { [field]: value }));
        if (q !== '') {
            q = '?' + q;
        }
        let pathParts = this.xRouterState.path.split('#');
        this.props.routes.Router.pushRoute(pathParts[0] + q);
    }

    pushQueryParams = (params?: {}) => {
        let q = qs.stringify(Object.assign({}, this.xRouterState.query, params));
        if (q !== '') {
            q = '?' + q;
        }
        let pathParts = this.xRouterState.path.split('#');
        this.props.routes.Router.pushRoute(pathParts[0] + q);
    }

    replace = (path: string) => {
        this.props.routes.Router.replaceRoute(path)
            .then(this.scrollToTop);
    }

    replaceQuery = (field: string, value?: string) => {
        let q = qs.stringify(Object.assign({}, this.xRouterState.query, { [field]: value }));
        if (q !== '') {
            q = '?' + q;
        }

        let pathParts = this.xRouterState.path.split('#');
        this.props.routes.Router.replaceRoute(pathParts[0] + q);
    }

    replaceQueryParams = (params?: {}) => {
        let q = qs.stringify(Object.assign({}, this.xRouterState.query, params));
        if (q !== '') {
            q = '?' + q;
        }
        let pathParts = this.xRouterState.path.split('#');
        this.props.routes.Router.replaceRoute(pathParts[0] + q);

    }

    componentWillReceiveProps(nextProps: {}, nextContext: any) {
        this.xRouterState = this.buildState(nextContext);
    }

    render() {
        return (
            <XRouterContext.Provider value={this.xRouterState}>
                <XRoutingContext.Provider value={this.xRouting}>
                    {this.props.children}
                </XRoutingContext.Provider>
            </XRouterContext.Provider>
        );
    }
}