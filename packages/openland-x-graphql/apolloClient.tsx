import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let cachedClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

class ClientStatus {
    isConnected: boolean = false;
    listeners: ((isConnected: boolean) => void)[] = [];

    markDisconected = () => {
        if (this.isConnected) {
            console.warn('Connection Stopped');
            this.isConnected = false;
            console.warn(this.listeners);
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
            console.warn('Connection Started');
            this.isConnected = true;
            console.warn(this.listeners);
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
        console.warn('Status Subscribed');
        this.listeners.push(listener);
        return () => {
            console.warn('Status unsubscribed');
            let index = this.listeners.indexOf(listener);
            if (index >= 0) {
                this.listeners = this.listeners.splice(index, 1);
            }
        };
    }
}

export const ConnectionStatus = new ClientStatus();

const buildClient = (initialState?: any, token?: string, org?: string) => {
    let httpEndpoint = '/graphql';
    let wsEndpoint = undefined;
    if (canUseDOM) {
        wsEndpoint = loadConfig().webSocketEndpoint;
    } else {
        httpEndpoint = (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api');
    }

    var headers: any = {};
    if (token) {
        headers['x-openland-token'] = token;
    }
    if (org) {
        headers['x-openland-org'] = org;
    }
    var cache = new InMemoryCache();
    if (initialState) {
        cache = cache.restore(initialState);
    }

    // Basic Link
    const httpLink = new HttpLink({
        uri: httpEndpoint,
        headers: headers,
        fetch: require('isomorphic-unfetch'),
    });

    let link: any = httpLink;

    // // Use Web Socket if in browser
    if (canUseDOM && wsEndpoint) {
        let client = new SubscriptionClient(wsEndpoint, {
            reconnect: true,
            connectionParams: () => ({
                'x-openland-token': token,
                'x-openland-org': org
            })
        });
        client.onConnecting(() => {
            ConnectionStatus.markDisconected();
        });
        client.onConnected(() => {
            ConnectionStatus.markConnected();
        });
        client.onDisconnected(() => {
            ConnectionStatus.markDisconected();
        });
        client.onReconnected(() => {
            ConnectionStatus.markConnected();
        });
        client.onReconnecting(() => {
            ConnectionStatus.markDisconected();
        });
        link = new WebSocketLink(client);

        // {
        //     uri: wsEndpoint,
        //     options: {
        //         reconnect: true,
        //         connectionParams: () => ({
        //             'x-openland-token': token,
        //             'x-openland-org': org
        //         })
        //     }
        // }
    }

    return new ApolloClient({
        link: link,
        cache: cache,
        ssrMode: !canUseDOM,
        connectToDevTools: false
    });
};

export const apolloClient = (initialState?: any, token?: string, org?: string) => {
    if (canUseDOM) {
        if (!cachedClient) {
            cachedClient = buildClient(initialState, token, org);
        }
        return cachedClient!!;
    } else {
        return buildClient(initialState, token, org);
    }
};