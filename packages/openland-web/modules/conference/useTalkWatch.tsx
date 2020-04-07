import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { reliableWatcher } from 'openland-api/reliableWatcher';

export const useTalkWatch = (id?: string | null) => {
    let client = useClient();
    React.useEffect(
        () => {
            if (!id) {
                return;
            }
            let watch = reliableWatcher((handler) => client.subscribeConferenceWatch({ id }, handler), () => {
                // Nothing to do
            });

            return watch;
        },
        [id],
    );
};
