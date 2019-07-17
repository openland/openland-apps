import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UserShort } from 'openland-api/Types';
import { UPresence } from '../UPresence';

export const UUserView = React.memo((props: { user: UserShort }) => {
    const { id, photo, name, online, shortname, primaryOrganization } = props.user;
    const path = shortname ? '/' + shortname : '/' + id;

    return (
        <UListItem
            title={name}
            subtitle={primaryOrganization ? primaryOrganization.name : undefined}
            description={<UPresence user={props.user} />}
            avatar={{ photo, id, title: name, online }}
            useRadius={true}
            path={path}
        />
    );
});