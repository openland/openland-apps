import * as React from 'react';

import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo';

import * as Auth from './auth';

const channelsListQuery = gql`
   query Vote {
     vote(id: 123) {
       key
       count
     }
   }
 `;

function ChannelsList(props: {}) {
    console.warn(props);
    return (
        <div />
    );
    // if (props.data.loading) {
    //     return (
    //         <p>Loading ...</p>
    //     );
    // }
    //     if (loading) {

    //     }
    // if (error) {
    //     return (<p>{ error.message } < /p>);
    //     }
    // return (<ul>
    //     {
    //         channels.map(ch => <li key={ ch.id } > { ch.name } < /li> ) 
    //         }
    //     < /ul>);
}

var client = new ApolloClient({
    networkInterface: createNetworkInterface(
        'http://localhost:9000/graphql',
        {
            opts: {
                headers: Auth.headers()
            }
        })
});

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

export function TestComponent() {
    return (
        <ApolloProvider client={client}>
            <ChannelsListWithData />
        </ApolloProvider>
    );
}