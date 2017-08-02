import { ApolloClient, createNetworkInterface } from 'react-apollo';
import * as Auth from './auth';

declare global {
    interface Window { server: { server: string }; }
}

export const server = window.server.server;
export const endpoint = server + '/graphql';
var client = new ApolloClient({
    networkInterface: createNetworkInterface(
        endpoint,
        {
            opts: {
                headers: Auth.headers()
            }
        })
});

export default client;