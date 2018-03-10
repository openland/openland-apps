import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import getDataFromTree from './getDataFromTree';
import { ApolloClient } from 'apollo-client';
import Head from 'next/head';
import { canUseDOM } from './environment';
import { apolloClient } from './apolloClient';
import { getToken } from './auth';
import { isPageChanged } from './routing';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HostNameProvider } from './HostNameProvider';
import { getComponentDisplayName } from './utils';
import { trackPage } from '../utils/analytics';
import { RootErrorBoundary } from '../components/RootErrorBoundary';
import { XRouterProvider } from '../components/routing/XRouter';

export const withData = (ComposedComponent: React.ComponentType) => {
    return class WithData extends React.Component<{
        serverState: { apollo: { data: any, token?: string } },
        host: string,
        protocol: string,
        domain: string
    }> {

        static displayName = `WithData(${getComponentDisplayName(
            ComposedComponent
        )})`;
        static propTypes = {
            serverState: PropTypes.object.isRequired,
            host: PropTypes.string.isRequired,
            protocol: PropTypes.string.isRequired,
        };
        private apollo: ApolloClient<NormalizedCacheObject>;

        static async getInitialProps(ctx: any) {
            let token = getToken(ctx.req);
            let serverState = { apollo: {} };
            let host: string;
            let protocol: string;
            if (ctx.req) {
                host = ctx.req.get('host');
                protocol = ctx.req.protocol;
            } else {
                host = window.location.host;
                protocol = window.location.protocol.replace(':', '');
            }
            // console.warn(ctx.req);

            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {};
            if ((ComposedComponent as any).getInitialProps) {
                composedInitialProps = await (ComposedComponent as any).getInitialProps(ctx);
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            if (!canUseDOM) {
                const apollo = apolloClient(serverState, token);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }

                let start = new Date().getTime();
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <ApolloProvider client={apollo}>
                            <HostNameProvider hostName={host} protocol={protocol}>
                                <XRouterProvider>
                                    <ComposedComponent />
                                </XRouterProvider>
                            </HostNameProvider>
                        </ApolloProvider>
                        ,
                        { router: { query: ctx.query, pathname: ctx.pathname, asPath: ctx.asPath } });
                } catch (error) {
                    console.warn('Error during prefetch!');
                    console.warn(error);
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                }

                // tslint:disable
                console.log(`data fetched in ${new Date().getTime() - start} ms`);
                // tslint:enable

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                if (!canUseDOM) {
                    Head.rewind();
                }

                // Extract query data from the Apollo store
                serverState = {
                    apollo: {
                        data: apollo.extract(),
                        token: token
                    }
                };
            } else if (isPageChanged()) {
                const apollo = apolloClient(serverState, token);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <ApolloProvider client={apollo}>
                            <HostNameProvider hostName={host} protocol={protocol}>
                                <XRouterProvider>
                                    <ComposedComponent />
                                </XRouterProvider>
                            </HostNameProvider>
                        </ApolloProvider>
                        ,
                        { router: { query: ctx.query, pathname: ctx.pathname, asPath: ctx.asPath } });
                } catch (error) {
                    console.warn('Error during prefetch!');
                    console.warn(error);
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                }
                serverState = {
                    apollo: {
                        token: token
                    }
                };
            }

            return {
                serverState,
                ...composedInitialProps,
                host,
                protocol
            };
        }

        constructor(props: { serverState: { apollo: { data: any, token?: string } }, host: string, protocol: string, domain: string }) {
            super(props);
            this.apollo = apolloClient(this.props.serverState.apollo.data, this.props.serverState.apollo.token);
        }

        componentDidMount() {
            // Hack to track initial page view
            trackPage();
        }

        render() {
            return (
                <RootErrorBoundary>
                    <ApolloProvider client={this.apollo}>
                        <HostNameProvider hostName={this.props.host} protocol={this.props.protocol}>
                            <XRouterProvider>
                                <ComposedComponent />
                            </XRouterProvider>
                        </HostNameProvider>
                    </ApolloProvider>
                </RootErrorBoundary>
            );
        }
    };
};