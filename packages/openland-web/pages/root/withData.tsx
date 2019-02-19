import * as React from 'react';
import { NextAppContext } from 'next/app';
import { getToken } from 'openland-x-graphql/auth';
import Head from 'next/head';
import { apolloClient } from 'openland-x-graphql/apolloClient';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { getDataFromTree } from 'react-apollo';
import { SharedStorage, getServerStorage, getClientStorage } from 'openland-x-utils/SharedStorage';
import { isPageChanged } from 'openland-x-routing/NextRouting';

export function withData(App: React.ComponentType<any>) {
    return class WithData extends React.Component<{ apolloState: any }> {
        static async getInitialProps(ctx: NextAppContext) {
            let appProps = {};
            try {
                if ((App as any).getInitialProps) {
                    appProps = await (App as any).getInitialProps(ctx);
                }
            } catch (e) {
                console.warn(e);
                throw e;
            }

            let host: string;
            let protocol: string;
            let storage: SharedStorage;
            let isApp: boolean;
            if (ctx.ctx.req) {
                host = (ctx.ctx.req as any).get('host');
                protocol = (ctx.ctx.req as any).protocol;
                let useragent = (ctx.ctx.req as any).get('User-Agent') as string;
                isApp = useragent ? useragent.indexOf('Electron') >= 0 : false;
                storage = getServerStorage(ctx.ctx);
            } else {
                host = window.location.host;
                protocol = window.location.protocol.replace(':', '');
                isApp = !!(global as any).require;
                storage = getClientStorage();
            }

            let token = getToken(ctx.ctx.req);
            const apollo = apolloClient({}, token);

            if (
                !canUseDOM ||
                isPageChanged({
                    pathname: ctx.router.pathname,
                    query: ctx.router.query,
                    asPath: ctx.router.asPath,
                })
            ) {
                try {
                    let start = Date.now();
                    await getDataFromTree(
                        <App
                            {...appProps}
                            Component={ctx.Component}
                            router={ctx.router}
                            apollo={apollo}
                        />,
                    );
                    console.log('loaded in ' + (Date.now() - start) + ' ms');
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                    console.error('Error while running `getDataFromTree`', error);
                }

                // getDataFromTree Last names not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                if (!canUseDOM) {
                    Head.rewind();
                }
            }

            const apolloState = apollo.client.cache.extract();
            return {
                ...appProps,
                apolloState,
                token,
                host,
                protocol,
                storage,
                isApp,
            };
        }

        private apollo: OpenApolloClient;
        constructor(props: any) {
            super(props);
            this.apollo = apolloClient(props.apolloState, props.token);
        }

        render() {
            return <App {...this.props} apollo={this.apollo} />;
        }
    };
}
