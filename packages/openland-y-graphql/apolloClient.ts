import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'openland-api/fragmentTypes.json';

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
}

export function buildClient(config: { endpoint: string, wsEndpoint?: string, token?: string, organization?: string, initialState?: any, ssrMode?: boolean }) {

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

    let link: ApolloLink;
    if (!config.wsEndpoint) {
        //
        // HTTP Link
        //
        var headers: any = {};
        if (config.token) {
            headers['x-openland-token'] = config.token;
        }
        if (config.organization) {
            headers['x-openland-org'] = config.organization;
        }
        link = new HttpLink({
            uri: config.endpoint,
            headers: headers,
            // fetch: config.ssrMode ? require('node-fetch') : undefined
        });
    } else {

        // 
        // Web Socket Link
        //

        let subscriptionClient = new SubscriptionClient(config.wsEndpoint, {
            reconnect: true,
            connectionParams: () => ({
                'x-openland-token': config.token,
                'x-openland-org': config.organization
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
        link = new WebSocketLink(subscriptionClient);
    }

    //
    // Client
    //

    let client = new ApolloClient({
        link: link,
        cache: cache,
        ssrMode: config.ssrMode,
        connectToDevTools: false
    });

    return new OpenApolloClient(client, status);
}