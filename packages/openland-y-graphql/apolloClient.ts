import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'openland-api/fragmentTypes.json';
import { GraphqlTypedQuery } from './typed';
import { getMainDefinition } from 'apollo-utilities';
// import LogCache from 'apollo-cache-logger';

export class ApolloClientStatus {
    isConnected: boolean = false;
    listeners: ((isConnected: boolean) => void)[] = [];

    markDisconected = () => {
        if (this.isConnected) {
            console.info('Connection Stopped');
            this.isConnected = false;
            for (let l of this.listeners) {
                try {
                    l(this.isConnected);
                } catch (e) {
                    console.warn('Exception during connection change notification!');
                    console.warn(e);
                }
            }
        }
    }

    markConnected = () => {
        if (!this.isConnected) {
            console.info('Connection Started');
            this.isConnected = true;
            for (let l of this.listeners) {
                try {
                    l(this.isConnected);
                } catch (e) {
                    console.warn('Exception during connection change notification!');
                    console.warn(e);
                }
            }
        }
    }

    subscribe = (listener: (isConnected: boolean) => void) => {
        this.listeners.push(listener);
        console.info('Status Subscribed');
        return () => {
            let index = this.listeners.findIndex((v) => v === listener);
            if (index >= 0) {
                console.info('Status unsubscribed');
                this.listeners.splice(index, 1);
            } else {
                console.warn('Trying to unsubscribe unknown listener');
            }
        };
    }
}

export class OpenApolloClient {
    readonly client: ApolloClient<{}>;
    readonly status: ApolloClientStatus;

    constructor(client: ApolloClient<{}>, status: ApolloClientStatus) {
        this.client = client;
        this.status = status;
    }

    async query<TQuery, TVars>(query: GraphqlTypedQuery<TQuery, TVars>, vars?: TVars) {
        return await this.client.query<TQuery>({ query: query.document, variables: vars });
    }
}

export function buildClient(config: { endpoint: string, wsEndpoint?: string, token?: string, initialState?: any, ssrMode?: boolean, fetch?: any }) {

    //
    // Status
    //

    let status = new ApolloClientStatus();

    //
    // Cache
    //

    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData
    });

    var cache = new InMemoryCache({ fragmentMatcher });
    if (config.initialState) {
        cache = cache.restore(config.initialState);
    }

    //
    // Link
    //

    var headers: any = {};
    if (config.token) {
        headers['x-openland-token'] = config.token;
    }

    let link: ApolloLink;
    if (!config.wsEndpoint) {
        //
        // HTTP Link
        //
        link = new HttpLink({
            uri: config.endpoint,
            headers: headers,
            fetch: config.fetch
        });
    } else {

        // 
        // Web Socket Link
        //

        let subscriptionClient = new SubscriptionClient(config.wsEndpoint, {
            reconnect: true,
            connectionParams: () => ({
                'x-openland-token': config.token
            })
        });
        subscriptionClient.onConnecting(() => {
            status.markDisconected();
        });
        subscriptionClient.onConnected(() => {
            status.markConnected();
        });
        subscriptionClient.onDisconnected(() => {
            status.markDisconected();
        });
        subscriptionClient.onReconnected(() => {
            status.markConnected();
        });
        subscriptionClient.onReconnecting(() => {
            status.markDisconected();
        });
        let wsLink = new WebSocketLink(subscriptionClient);

        //
        // HTTP Link
        //

        let httpLink = new HttpLink({
            uri: config.endpoint,
            headers: headers,
            fetch: config.fetch
        });

        // Hybrid link
        link = split(
            // split based on operation type
            (args) => {
                let def = getMainDefinition(args.query as any);
                return def.kind === 'OperationDefinition' && def.operation === 'subscription';
            },
            wsLink,
            httpLink,
        );
    }

    //
    // Client
    //

    let client = new ApolloClient({
        link: link,
        // cache: new LogCache(cache, { logger: msg => console.log(msg) }),
        cache,
        ssrMode: config.ssrMode,
        connectToDevTools: false
    });

    return new OpenApolloClient(client, status);
}