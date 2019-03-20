import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';

export function useWatchCall(id?: string | null) {
    React.useEffect(() => {
        if (!id) {
            return;
        }
        let s = getClient().subscribeConferenceWatch({ id: id });
        return () => s.destroy()
    }, [id])
}