import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ConferenceFull, ConferenceWatch } from 'openland-api/spacex.types';

export function useWatchCall(id?: string | null, onUpdate?: (update: ConferenceFull) => void) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        return reliableWatcher<ConferenceWatch>((handler) => getClient().subscribeConferenceWatch({ id: id }, handler), (update) => {
            if (onUpdate) {
                onUpdate(update.alphaConferenceWatch);
            }
        });
    }, [id]);
}