import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { ConferenceWatchSubscription } from 'openland-api';

export class TalkWatchComponent extends React.Component<{ apollo: OpenApolloClient, id: string }> {
    private subs: any = null;

    componentDidMount() {
        this.subs = this.props.apollo.client.subscribe({ query: ConferenceWatchSubscription.document, variables: { id: this.props.id } })
            .subscribe({});
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
    }

    render() {
        return null;
    }
}