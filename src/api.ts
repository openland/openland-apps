import { ApolloClient, createNetworkInterface, toIdValue } from 'react-apollo';
import * as Auth from './auth';
import { Config } from './config';

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

var headers: string[][] = [];

if (Config.domain !== 'sandbox') {
    headers = [['x-statecraft-domain', Config.domain]];
}

if (Auth.authorizationHeader() != null) {
    (<any>headers).authorization = Auth.authorizationHeader();
}

client = new ApolloClient({
    networkInterface: createNetworkInterface(
        endpoint,
        {
            opts: {
                headers: headers
            }
        }),
    customResolvers: {
        City: {
            segment: (_, args: { id: string }) => buildId('Segment', args.id)
        }
    }
});

export const apolloClient = client;

export function sandboxResolver(args: any) {
    return fetch(endpoint, {
        method: 'post',
        headers: [['Content-Type', 'application/json'], ...headers],
        body: JSON.stringify(args),
    }).then(response => response.json());
}