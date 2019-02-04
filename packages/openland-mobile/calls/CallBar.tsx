import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';
import gql from 'graphql-tag';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';
import { View } from 'react-native';

const ConferenceWatchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export const CallBarComponent = React.memo<{ id: string }>((props) => {
    let conference = getClient().useWithoutLoaderConference({ id: props.id })
    React.useEffect(() => {
        if (!conference) {
            return;
        }
        let s = getClient().client.subscribe(ConferenceWatchSubscription, { id: conference!.conference.id });
        return () => s.destroy()
    }, [conference && conference.conference.id])

    if (conference && conference.conference && conference.conference.peers.length > 0) {
        return (
            <View alignSelf="stretch" height={56} backgroundColor="green">
                {}
            </View>
        );
    }
    return null;
});