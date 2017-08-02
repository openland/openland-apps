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

const channelsListQuery = gql`
   query Vote {
     vote(id: "MTIz") {
       id
       count
       own_set
     }
   }
 `;

const addChannelMutation = gql`
  mutation vote($id: ID!) {
    vote(id: $id) {
      id
      count
      own_set
    }
  }
`;

interface QueryVoteProps extends QueryProps {
    vote: {
        id: string;
        count: number;
    };
}

function AddChannel(props: { mutate: MutationFunc<{}> } ) {

    console.warn(props);

    function like() {
        props.mutate({
            variables: {
                id: 'MTIz'
            }
        });
    }

    return <button onClick={like}>Like</button>;
}

const AddChannelWithMutation = graphql(
    addChannelMutation
)(AddChannel);

function ChannelsList(props: { data: QueryVoteProps }) {
    if (props.data.loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    // function like() {

    // }

    console.warn(props.data.vote);
    // var data = (props.data as {vote:any}).vote;
    // console.warn((props.data as {vote:any}).vote);
    return (
        <div>
            Likes: {props.data.vote.count}
            <AddChannelWithMutation />
        </div>
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