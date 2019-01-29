import * as React from 'react';
import { useQuery } from 'openland-web/components/useQuery';
import { UserQuery } from 'openland-api';
import { XLoader } from 'openland-x/XLoader';

export const UserPopup = React.memo<{ id: string }>(props => {
    let profile = useQuery(UserQuery, { userId: props.id });
    if (profile.loading) {
        return <XLoader />;
    }

    return <div>{profile.data.user.name}</div>;
});
