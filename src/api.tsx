import { ApolloClient, createNetworkInterface, toIdValue } from 'react-apollo';
import * as Auth from './auth';

declare global {
    interface Window { server: { server: string }; }
}

export const server = window.server.server;
export const endpoint = server + '/graphql';
var client: ApolloClient = new ApolloClient();

function dataIdFromObject(typename: string, id: any): any {
    return `${typename}:${id}`;
}

function buildId(typename: string, id: any) {
    return toIdValue(dataIdFromObject(typename, id));
}

client = new ApolloClient({
    networkInterface: createNetworkInterface(
        endpoint,
        {
            opts: {
                headers: Auth.headers()
            }
        }),
    customResolvers: {
        City: {
            segment: (_, args: { id: string }) => buildId('Segment', args.id)
        }
    }
});

export default client;