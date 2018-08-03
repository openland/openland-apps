import { buildClient } from 'openland-y-graphql/apolloClient';

export function buildApolloClient() {
    return buildClient({
        // Put your token here
        // token: '<token>',
        organization: '61gk9KRrl9ComJkvYnvdcddr4o',
        endpoint: 'https://api.openland.com/api',
        wsEndpoint: 'wss://api.openland.com/api'
    });
}