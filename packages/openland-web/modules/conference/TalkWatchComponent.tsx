import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import gql from 'graphql-tag';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';

const  ConferenceWatchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export class TalkWatchComponent extends React.Component<{
    apollo: OpenApolloClient;
    id: string;
}> {
    private subs: any = null;

    componentDidMount() {
        this.subs = this.props.apollo.client
            .subscribe({
                query: ConferenceWatchSubscription,
                variables: { id: this.props.id },
            })
            .subscribe({});
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
    }

    render() {
        return null;
    }
}
