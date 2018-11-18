import * as React from 'react';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api/ConferenceQuery';
import { XLoader } from 'openland-x/XLoader';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';
import { backoff, delay } from 'openland-y-utils/timer';

let joinMutation = gql`
    mutation ConferenceJoin($id: ID!) {
        conferenceJoin(id: $id) {
            peerId
            conference {
                id
                peers {
                    id
                    user {
                        id
                        name
                        photo
                    }
                }
            }
        }
    }
`;

let leaveMutation = gql`
    mutation ConferenceLeave($id: ID!, $peerId: ID!) {
        conferenceLeave(id: $id, peerId: $peerId) {
            id
            peers {
                id
                user {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

let keepAliveMutation = gql`
    mutation ConferenceKeepAlive($id: ID!, $peerId: ID!) {
        conferenceKeepAlive(id: $id, peerId: $peerId) {
            id
            peers {
                id
                user {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

let watchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            id
            peers {
                id
                user {
                    id
                    name
                    photo
                }
            }
        }
    }
`;

class ConferenceManager extends React.Component<{ apollo: OpenApolloClient, id: string }> {
    private _mounted = true;
    private subs: any = null;

    componentDidMount() {
        this.subs = this.props.apollo.client.subscribe({ query: watchSubscription, variables: { id: this.props.id } })
            .subscribe({});
        backoff(async () => {
            let peerId = (await this.props.apollo.client.mutate({ mutation: joinMutation, variables: { id: this.props.id } })).data!.conferenceJoin.peerId as string;
            while (this._mounted) {
                await this.props.apollo.client.mutate({ mutation: keepAliveMutation, variables: { id: this.props.id, peerId } });
                await delay(2000);
            }
            this.props.apollo.client.mutate({ mutation: leaveMutation, variables: { id: this.props.id, peerId } });
        });
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
        this._mounted = false;
    }

    render() {
        return null;
    }
}

export const ConferenceComponent = (props: { conversationId: string }) => {
    return (
        <YApolloContext.Consumer>
            {apollo => (
                <YQuery query={ConferenceQuery} variables={{ id: props.conversationId }}>
                    {data => {
                        if (data.loading) {
                            return <XLoader />;
                        }
                        return (
                            <>
                                <ConferenceManager apollo={apollo!} id={data.data!.conference.id} />
                                <XVertical>
                                    {data.data!.conference.peers.map((v) => (
                                        <XHorizontal key={v.id}>{v.user.name}</XHorizontal>
                                    ))}
                                </XVertical>
                            </>
                        );
                    }}
                </YQuery>
            )}
        </YApolloContext.Consumer>
    );
};