import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as qs from 'query-string';
import { XRouter } from './XRouter';
import { SingletonRouter } from 'next/router';

interface NextRoutes {
    Router: {
        pushRoute(route: string): Promise<any>;
        replaceRoute(route: string): Promise<any>;
    };
    findAndGetUrls(nameOrUrl?: string, params?: any): { route: any, urls: { as: string, href: string } };
}

export class XRouterProvider extends React.Component<{ routes: NextRoutes }> {
    static contextTypes = {
        hostName: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
        router: PropTypes.object.isRequired
    };
    static childContextTypes = {
        xrouter: PropTypes.object.isRequired
    };

    private xRouterState: XRouter;

    constructor(props: { routes: NextRoutes }, context: any) {
        super(props, context);
        this.xRouterState = this.buildState(context);
    }

    buildState(context: any) {
        var nRouter = context.router as SingletonRouter;
        var hostName = context.hostName as string;
        var protocol = context.protocol as string;
        var href = protocol + '://' + hostName;
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
            protocol,
            hostName,
            path,
            query,

            route,
            routeQuery,

            push: this.push,
            pushQuery: this.pushQuery,
            pushQueryParams: this.pushQueryParams,
            replace: this.replace,
            replaceQuery: this.replaceQuery,
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
    pushQuery = (field: string, value?: string) => {
        this.props.routes.Router.pushRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, { [field]: value })));
    }

    pushQueryParams = (params?: {}) => {
        this.props.routes.Router.pushRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, params)));

    }

    replace = (path: string) => {
        this.props.routes.Router.replaceRoute(path)
            .then(this.scrollToTop);
    }
    replaceQuery = (field: string, value?: string) => {
        this.props.routes.Router.replaceRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, { [field]: value })));
    }

    componentWillReceiveProps(nextProps: {}, nextContext: any) {
        this.xRouterState = this.buildState(nextContext);
    }

    getChildContext() {
        return {
            xrouter: this.xRouterState
        };
    }

    render() {
        return <>{this.props.children}</>;
    }
}