import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';

export function useWatchCall(id?: string | null) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        let s = getClient().subscribeConferenceWatch({ id: id });
        // TODO: Merge data
        return () => s.destroy()
    }, [id])
}