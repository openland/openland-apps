import * as React from 'react';
import * as PropTypes from 'prop-types';
import Head from 'next/head';
import { isPageChanged } from 'openland-x-routing/NextRouting';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { trackPage } from 'openland-x-analytics';
import { apolloClient } from 'openland-x-graphql/apolloClient';
import { getToken } from 'openland-x-graphql/auth';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { RootErrorBoundary } from './RootErrorBoundary';
import getDataFromTree from 'openland-x-graphql/getDataFromTree';
import '../globals';
import { SharedStorage, getServerStorage, getClientStorage } from 'openland-x-utils/SharedStorage';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';
import moment from 'moment-timezone';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
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
        private apollo: OpenApolloClient;

        static async getInitialProps(ctx: any) {
            let token = getToken(ctx.req);
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

            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {};
            if ((ComposedComponent as any).getInitialProps) {
                composedInitialProps = await (ComposedComponent as any).getInitialProps(ctx);
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            if (!canUseDOM && ENABLE_PRELOADING) {
                const apollo = apolloClient(serverState, token);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }

                let start = new Date().getTime();
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <XStorageProvider storage={storage}>
                            <YApolloProvider client={apollo}>
                                <XRouterProvider routes={Routes} hostName={host} protocol={protocol}>
                                    <ComposedComponent {...composedInitialProps} />
                                </XRouterProvider>
                            </YApolloProvider>
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
                        data: apollo.client.extract(),
                        token: token
                    }
                };
            } else if (canUseDOM && isPageChanged({ query: ctx.query, pathname: ctx.pathname, asPath: ctx.asPath }) && ENABLE_PRELOADING) {
                const apollo = apolloClient(serverState, token);
                // Provide the `url` prop data in case a GraphQL query uses it
                // const url = { query: ctx.query, pathname: ctx.pathname }
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <XStorageProvider storage={storage}>
                            <YApolloProvider client={apollo}>
                                <XRouterProvider routes={Routes} hostName={host} protocol={protocol}>
                                    <ComposedComponent {...composedInitialProps} />
                                </XRouterProvider>
                            </YApolloProvider>
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
                        token: token
                    }
                };
            } else {
                serverState = {
                    apollo: {
                        token: token
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
            this.apollo = apolloClient(this.props.serverState.apollo.data, this.props.serverState.apollo.token);

            // Guess Timezone
            if (canUseDOM) {
                let tz = moment.tz.guess();
                let storage = getClientStorage();
                storage.writeValue('timezone', tz);
            }
        }

        componentDidMount() {
            // Hack to track initial page view
            trackPage();
        }

        render() {
            return (
                <XStorageProvider storage={canUseDOM ? getClientStorage() : this.props.storage}>
                    <YApolloProvider client={this.apollo}>
                        <XRouterProvider routes={Routes} hostName={this.props.host} protocol={this.props.protocol}>
                            <RootErrorBoundary>
                                <ComposedComponent {...this.props.composedInitialProps} />
                            </RootErrorBoundary>
                        </XRouterProvider>
                    </YApolloProvider>
                </XStorageProvider>
            );
        }
    };
};