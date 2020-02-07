import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { reliableWatcher } from 'openland-api/reliableWatcher';

export const TalkWatchComponent = React.memo<{ id: string }>(props => {
    let client = useClient();
    React.useEffect(
        () => {
            let watch = reliableWatcher((handler) => client.subscribeConferenceWatch({ id: props.id }, handler), () => {
                // Nothing to do
            });

            return watch;
        },
        [props.id],
    );
    return null;
});
