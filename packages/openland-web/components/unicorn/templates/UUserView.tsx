import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { formatLastSeen } from 'openland-y-utils/formatTime';
import { ThemeDefault } from 'openland-y-utils/themes';
import { UserShort } from 'openland-api/Types';

export const UUserView = React.memo((props: { user: UserShort }) => {
    const { id, photo, name, online, lastSeen, shortname } = props.user;
    const path = shortname ? '/' + shortname : '/' + id;

    return (
        <UListItem
            text={name}
            description={online ? 'online' : formatLastSeen(lastSeen || 'never_online')}
            descriptionColor={online ? ThemeDefault.accentPrimary : undefined}
            avatar={{ photo, id, title: name, online }}
            useRadius={true}
            path={path}
        />
    );
});