import { ApolloClient, createNetworkInterface } from 'react-apollo';

import * as Auth from './auth';

var client = new ApolloClient({
    networkInterface: createNetworkInterface(
        'http://localhost:9000/graphql',
        {
            opts: {
                headers: Auth.headers()
            }
        })
});

export default client;