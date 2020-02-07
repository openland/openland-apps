import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { reliableWatcher } from 'openland-api/reliableWatcher';

export function useWatchCall(id?: string | null) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        return reliableWatcher((handler) => getClient().subscribeConferenceWatch({ id: id }, handler), () => {
            // Nothing to do;
        });
    }, [id]);
}