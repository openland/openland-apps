import * as React from 'react';

import {
    ApolloClient,
    gql,
    graphql,
    ApolloProvider,
    createNetworkInterface,
    QueryProps,
    MutationFunc
} from 'react-apollo';

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

// Example Mutation

function AddChannel(props: { mutate: MutationFunc<{}> }) {
    function like() {
        props.mutate({
            variables: {
                id: 'MTIz'
            }
        });
    }

    return <button onClick={like}>Like</button>;
}

const AddChannelWithMutation = graphql(gql`
  mutation vote($id: ID!) {
    vote(id: $id) {
      id
      count
      own_set
    }
  }
`)(AddChannel);

// List

interface Vote {
    vote: {
        id: string;
        count: number;
    };
}

function ChannelsList(props: { data: QueryProps & Vote }) {
    if (props.data.loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    return (
        <div>
            Likes: {props.data.vote.count}
            <AddChannelWithMutation />
        </div>
    );
}

const ChannelsListWithData = graphql(gql`
   query Vote {
     vote(id: "MTIz") {
       id
       count
       own_set
     }
   }
 `)(ChannelsList);

export function TestComponent() {
    return (
        <ApolloProvider client={client}>

            <ChannelsListWithData />
        </ApolloProvider>
    );
}