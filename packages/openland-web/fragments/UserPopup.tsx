import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-api/useClient';

export const UserPopup = XMemo<{ id: string }>(props => {
    let client = useClient();
    let profile = client.useUser({ userId: props.id }, { suspense: false });
    if (!profile) {
        return <XLoader />;
    }

    return <div>{profile.user.name}</div>;
});
