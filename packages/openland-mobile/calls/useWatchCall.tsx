import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';
import gql from 'graphql-tag';
import { ConferenceFull } from 'openland-api/fragments/ConferenceFull';
import { UserShort } from 'openland-api/fragments/UserShort';

const ConferenceWatchSubscription = gql`
    subscription ConferenceWatch($id: ID!) {
        alphaConferenceWatch(id: $id) {
            ...ConferenceFull
        }
    }
    ${ConferenceFull}
    ${UserShort}
`;

export function useWatchCall(id?: string | null) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        let s = getClient().client.subscribe(ConferenceWatchSubscription, { id: id });
        return () => s.destroy()
    }, [id])
}