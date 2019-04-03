import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';

export const TalkWatchComponent = React.memo<{ id: string }>(props => {
    let client = useClient();
    React.useEffect(
        () => {
            let watch = client.subscribeConferenceWatch({ id: props.id });

            return () => watch.destroy();
        },
        [props.id],
    );
    return null;
});
