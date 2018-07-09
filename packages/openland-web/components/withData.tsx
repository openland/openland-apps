import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import Head from 'next/head';
import { isPageChanged } from 'openland-x-routing/NextRouting';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { trackPage } from 'openland-x-analytics';
import { apolloClient } from 'openland-x-graphql/apolloClient';
import { getToken, getOrg } from 'openland-x-graphql/auth';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { RootErrorBoundary } from './RootErrorBoundary';
import getDataFromTree from 'openland-x-graphql/getDataFromTree';
import '../globals';
import { SharedStorage, getServerStorage, getClientStorage } from 'openland-x-utils/SharedStorage';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';

interface WithDataProps {
    serverState: { apollo: { data: any, token?: string, org?: string } };
    host: string;
    protocol: string;
    domain: string;
    composedInitialProps: any;
    storage: SharedStorage;
}

const ENABLE_PRELOADING = true;

export const withData = (name: String, ComposedComponent: React.ComponentType) => {
    let componentName = name.split(' ').map((v) => v.trim()).filter((v) => v !== '').join();
    return class WithData extends React.Component<WithDataProps> {
        static displayName = componentName;
        static propTypes = {
            serverState: PropTypes.object.isRequired,
            host: PropTypes.string.isRequired,
            protocol: PropTypes.string.isRequired,
        };
        private apollo: ApolloClient<NormalizedCacheObject>;

        static async getInitialProps(ctx: any) {
            let token = getToken(ctx.req);
            let org = getOrg(ctx.req);
            let serverState = { apollo: {} };
            let host: string;
            let protocol: string;
            let storage: SharedStorage;
            if (ctx.req) {
                host = ctx.req.get('host');
                protocol = ctx.req.protocol;
                storage = getServerStorage(ctx);
            } else {
                host = window.location.host;
                protocol = window.location.protocol.replace(':', '');
                storage = getClientStorage();
            }
            // console.warn(ctx.req);

            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {};
            if ((ComposedComponent as any).getInitialProps) {
                composedInitialProps = await (ComposedComponent as any).getInitialProps(ctx);
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            if (!canUseDOM && ENABLE_PRELOADING) {
                const apollo = apolloClient(serverState, token, org);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }

                let start = new Date().getTime();
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <XStorageProvider storage={storage}>
                            <ApolloProvider client={apollo}>
                                <XRouterProvider routes={Routes} hostName={host} protocol={protocol}>
                                    <ComposedComponent {...composedInitialProps} />
                                </XRouterProvider>
                            </ApolloProvider>
                        </XStorageProvider>
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
                        token: token,
                        org: org
                    }
                };
            } else if (canUseDOM && isPageChanged({ query: ctx.query, pathname: ctx.pathname, asPath: ctx.asPath }) && ENABLE_PRELOADING) {
                const apollo = apolloClient(serverState, token, org);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <XStorageProvider storage={storage}>
                            <ApolloProvider client={apollo}>
                                <XRouterProvider routes={Routes} hostName={host} protocol={protocol}>
                                    <ComposedComponent {...composedInitialProps} />
                                </XRouterProvider>
                            </ApolloProvider>
                        </XStorageProvider>
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
                        token: token,
                        org: org
                    }
                };
            } else {
                serverState = {
                    apollo: {
                        token: token,
                        org: org
                    }
                };
            }

            return {
                serverState,
                composedInitialProps,
                host,
                protocol,
                storage
            };
        }

        constructor(props: WithDataProps) {
            super(props);
            this.apollo = apolloClient(this.props.serverState.apollo.data, this.props.serverState.apollo.token, this.props.serverState.apollo.org);
        }

        componentDidMount() {
            // Hack to track initial page view
            trackPage();
        }

        render() {
            return (
                <XStorageProvider storage={this.props.storage}>
                    <ApolloProvider client={this.apollo}>
                        <XRouterProvider routes={Routes} hostName={this.props.host} protocol={this.props.protocol}>
                            <RootErrorBoundary>
                                <ComposedComponent {...this.props.composedInitialProps} />
                            </RootErrorBoundary>
                        </XRouterProvider>
                    </ApolloProvider>
                </XStorageProvider>
            );
        }
    };
};