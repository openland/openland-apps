import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SingletonRouter } from 'next/router';
import * as qs from 'query-string';
import { Router } from '../../routes';

export interface XRouter {

    readonly href: string;
    readonly protocol: string;
    readonly hostName: string;
    readonly path: string;
    readonly query: { [key: string]: any };

    readonly route: string;
    readonly routeQuery: { [key: string]: any };

    push: (path: string) => void;
    pushQuery: (field: string, value?: string) => void;
    pushQueryParams: (params: {}) => void;
    replace: (path: string) => void;
    replaceQuery: (field: string, value?: string) => void;
}

export class XRouterReceiver<TProps = {}, TState = {}> extends React.Component<TProps, TState> {
    static contextTypes = {
        xrouter: PropTypes.object.isRequired
    };

    protected get router(): XRouter {
        return this.context.xrouter;
    }
}

export class XRouterProvider extends React.Component {
    static contextTypes = {
        hostName: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
        router: PropTypes.object.isRequired
    };
    static childContextTypes = {
        xrouter: PropTypes.object.isRequired
    };

    private xRouterState: XRouter;

    constructor(props: {}, context: any) {
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
            replaceQuery: this.replaceQuery
        };
        return res;
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
        document.body.focus();
    }

    push = (path: string) => {
        Router.pushRoute(path)
            .then(this.scrollToTop);
    }
    pushQuery = (field: string, value?: string) => {
        Router.pushRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, { [field]: value })));
    }

    pushQueryParams = (params?: {}) => {
        Router.pushRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, params)));

    }

    replace = (path: string) => {
        Router.replaceRoute(path)
            .then(this.scrollToTop);
    }
    replaceQuery = (field: string, value?: string) => {
        Router.replaceRoute(this.xRouterState.path + '?' + qs.stringify(Object.assign({}, this.xRouterState.query, { [field]: value })));
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