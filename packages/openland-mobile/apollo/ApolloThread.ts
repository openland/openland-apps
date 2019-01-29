import { self } from 'react-native-threads';
import { Request, Response } from './api/Request';
import { OpenApolloClient, buildClient } from 'openland-y-graphql/apolloClient';

var client!: OpenApolloClient;

function postMessage(msg: Response) {
    self.postMessage(JSON.stringify(msg));
}

self.onmessage = (message: string) => {
    let msg = JSON.parse(message) as Request;
    if (msg.type === 'init') {
        if (!client) {
            client = buildClient({
                token: msg.token,
                endpoint: 'https://api.openland.com/api',
                wsEndpoint: 'wss://api.openland.com/api'
            });
        }
    } else if (msg.type === 'query' || msg.type === 'refetch') {
        client.client.query({ query: msg.body, variables: msg.variables, fetchPolicy: msg.type === 'refetch' ? 'network-only' : 'cache-first' })
            .then((v) => {
                if (v.errors && v.errors.length > 0) {
                    postMessage({ id: msg.id, type: 'error', data: v.errors });
                } else {
                    postMessage({ id: msg.id, type: 'result', data: v.data });
                }
            })
            .catch((v) => {
                postMessage({ id: msg.id, type: 'error', data: v.message });
            });
    } else if (msg.type === 'mutate') {
        client.client.mutate({ mutation: msg.body, variables: msg.variables })
            .then((v) => {
                if (v.errors && v.errors.length > 0) {
                    postMessage({ id: msg.id, type: 'error', data: v.errors });
                } else {
                    postMessage({ id: msg.id, type: 'result', data: v.data });
                }
            })
            .catch((v) => {
                postMessage({ id: msg.id, type: 'error', data: v.message });
            });
    }
};