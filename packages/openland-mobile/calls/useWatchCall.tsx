import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ConferenceWatchSubscription } from 'openland-api';

export function useWatchCall(id?: string | null) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        let s = getClient().client.subscribe(ConferenceWatchSubscription, { id: id });
        return () => s.destroy()
    }, [id])
}