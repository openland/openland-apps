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

var headers: any = {};
var headersArray: string[][] = [];
if (Config.domain !== 'sandbox') {
    headers['x-statecraft-domain'] = Config.domain;
    headersArray = [['x-statecraft-domain', Config.domain]];
}

if (Auth.authorizationHeader() != null) {
    var h = Auth.authorizationHeader()!!;
    headers.authorization = h;
    headersArray = [['authorization', h], ...headersArray];
}

client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: endpoint,
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
        headers: [['Content-Type', 'application/json'], ...headersArray],
        body: JSON.stringify(args),
    }).then(response => response.json());
}